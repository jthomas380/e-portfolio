<?php
declare(strict_types=1);
require_once __DIR__ . '/../api/config.php';
ini_set('session.use_strict_mode', '1');
ini_set('session.cookie_httponly', '1');
ini_set('session.cookie_samesite', 'Strict');
$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
session_set_cookie_params(['lifetime' => 0, 'path' => '/admin/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Strict']);
session_start();
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');
header('Cache-Control: no-store');
$db = contact_db();
if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(32));
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!hash_equals($_SESSION['csrf'], (string)($_POST['csrf'] ?? ''))) { http_response_code(400); exit('Invalid request. Refresh and try again.'); }
    if (isset($_POST['logout'])) { $_SESSION = []; session_destroy(); header('Location: /admin/'); exit; }
    if (isset($_POST['login'])) {
        $loginIp = client_ip_hash();
        $count = $db->prepare('SELECT COUNT(*) FROM admin_login_attempts WHERE ip_hash = ? AND attempted_at >= (NOW() - INTERVAL 15 MINUTE)');
        $count->execute([$loginIp]);
        if ((int)$count->fetchColumn() >= 10) {
            $error = 'Too many sign-in attempts. Wait 15 minutes and try again.';
        } else {
            $stmt = $db->prepare('SELECT id, username, password_hash FROM contact_admins WHERE username = ? LIMIT 1');
            $stmt->execute([trim((string)($_POST['username'] ?? ''))]);
            $admin = $stmt->fetch();
            if ($admin && password_verify((string)($_POST['password'] ?? ''), $admin['password_hash'])) {
                $clear = $db->prepare('DELETE FROM admin_login_attempts WHERE ip_hash = ?');
                $clear->execute([$loginIp]);
                session_regenerate_id(true);
                $_SESSION['admin_id'] = (int)$admin['id'];
                $_SESSION['admin_name'] = $admin['username'];
                $_SESSION['csrf'] = bin2hex(random_bytes(32));
                header('Location: /admin/'); exit;
            }
            $fail = $db->prepare('INSERT INTO admin_login_attempts (ip_hash) VALUES (?)');
            $fail->execute([$loginIp]);
            usleep(400000);
            $error = 'Sign-in failed. Check your username and password.';
        }
    }
    if (isset($_SESSION['admin_id']) && isset($_POST['mark_read'])) {
        $stmt = $db->prepare("UPDATE contact_messages SET status = 'read' WHERE id = ?");
        $stmt->execute([(int)$_POST['mark_read']]);
        header('Location: /admin/'); exit;
    }
}
function h(string $s): string { return htmlspecialchars($s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
?><!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Portfolio Message Inbox</title><style>:root{color-scheme:light}body{font:16px/1.5 system-ui,sans-serif;max-width:900px;margin:5vh auto;padding:0 20px;color:#242424}header{display:flex;justify-content:space-between;align-items:center;gap:12px;border-bottom:1px solid #ddd;padding-bottom:16px}h1{font-size:26px}form.inline{display:inline}button{cursor:pointer;padding:8px 12px}input{box-sizing:border-box;width:100%;padding:12px;font:inherit;margin:4px 0 14px}article{border:1px solid #ddd;border-radius:10px;padding:18px;margin:16px 0;overflow-wrap:anywhere}article.new{border-left:5px solid #4169e1}.meta{color:#666;font-size:14px}.message{white-space:pre-wrap}.error{color:#b42318}</style><body><?php if (empty($_SESSION['admin_id'])): ?><h1>Portfolio message inbox</h1><?php if ($error): ?><p class="error"><?= h($error) ?></p><?php endif; ?><form method="post"><input type="hidden" name="csrf" value="<?= h($_SESSION['csrf']) ?>"><label>Username</label><input name="username" required autocomplete="username"><label>Password</label><input type="password" name="password" required autocomplete="current-password"><button name="login" value="1">Sign in</button></form><?php else: ?><header><div><h1>Portfolio messages</h1><div class="meta">Signed in as <?= h((string)$_SESSION['admin_name']) ?></div></div><form method="post" class="inline"><input type="hidden" name="csrf" value="<?= h($_SESSION['csrf']) ?>"><button name="logout" value="1">Sign out</button></form></header><?php $rows = $db->query('SELECT id, name, email, message, created_at, status FROM contact_messages ORDER BY created_at DESC LIMIT 200')->fetchAll(); if (!$rows): ?><p>No messages yet.</p><?php endif; ?><?php foreach ($rows as $row): ?><article class="<?= $row['status'] === 'new' ? 'new' : '' ?>"><strong><?= h($row['name']) ?></strong> · <a href="mailto:<?= h($row['email']) ?>"><?= h($row['email']) ?></a><div class="meta"><?= h($row['created_at']) ?> · <?= h($row['status']) ?></div><p class="message"><?= h($row['message']) ?></p><?php if ($row['status'] === 'new'): ?><form method="post"><input type="hidden" name="csrf" value="<?= h($_SESSION['csrf']) ?>"><button name="mark_read" value="<?= (int)$row['id'] ?>">Mark as read</button></form><?php endif; ?></article><?php endforeach; ?><?php endif; ?></body></html>
