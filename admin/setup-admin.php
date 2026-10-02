<?php
declare(strict_types=1);
require_once __DIR__ . '/../api/config.php';
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
$message = '';
try {
    $db = contact_db();
    $exists = (int)$db->query('SELECT COUNT(*) FROM contact_admins')->fetchColumn() > 0;
} catch (Throwable $e) {
    http_response_code(500);
    exit('Database is not ready. Import setup.sql and check api/config.php.');
}
if ($exists) {
    http_response_code(410);
    exit('Admin setup is already complete. Remove this setup-admin.php file now.');
}
$token = (string)($_GET['token'] ?? $_POST['token'] ?? '');
if (!hash_equals(ADMIN_SETUP_TOKEN, $token) || ADMIN_SETUP_TOKEN === 'REPLACE_WITH_A_LONG_RANDOM_SETUP_TOKEN') {
    http_response_code(403);
    exit('Invalid setup token. Check the private token in api/config.php.');
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim((string)($_POST['username'] ?? ''));
    $password = (string)($_POST['password'] ?? '');
    if (!preg_match('/^[A-Za-z0-9_.-]{4,40}$/', $username)) {
        $message = 'Use a username of 4 to 40 letters, numbers, dots, dashes, or underscores.';
    } elseif (strlen($password) < 14) {
        $message = 'Choose a password of at least 14 characters.';
    } else {
        $stmt = $db->prepare('INSERT INTO contact_admins (username, password_hash) VALUES (?, ?)');
        $stmt->execute([$username, password_hash($password, PASSWORD_DEFAULT)]);
        if (@unlink(__FILE__)) {
            header('Location: /admin/');
            exit;
        }
        http_response_code(410);
        $message = 'Admin account created. Setup is locked; delete setup-admin.php in Hostinger File Manager.';
        $exists = true;
    }
}
?><!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Set up contact inbox</title><style>body{font:16px system-ui;max-width:520px;margin:8vh auto;padding:24px;color:#222}label{display:block;margin:16px 0 6px}input{box-sizing:border-box;width:100%;padding:12px;font:inherit}button{margin-top:18px;padding:12px 18px}p{line-height:1.5}</style><h1>Set up your private inbox</h1><?php if ($message): ?><p><?= htmlspecialchars($message, ENT_QUOTES, 'UTF-8') ?></p><?php endif; ?><?php if (!$exists): ?><p>Create the owner login for the contact inbox. This page works only before an admin account exists.</p><form method="post"><input type="hidden" name="token" value="<?= htmlspecialchars($token, ENT_QUOTES, 'UTF-8') ?>"><label>Username</label><input name="username" required minlength="4" maxlength="40" autocomplete="username"><label>Password (14+ characters)</label><input type="password" name="password" required minlength="14" autocomplete="new-password"><button type="submit">Create inbox login</button></form><?php endif; ?></html>
