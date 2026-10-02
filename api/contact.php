<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_response(405, ['ok' => false, 'error' => 'Method not allowed.']);
if (stripos($_SERVER['CONTENT_TYPE'] ?? '', 'application/json') === false) json_response(415, ['ok' => false, 'error' => 'Expected JSON.']);
$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) json_response(400, ['ok' => false, 'error' => 'Please check your message and try again.']);
// Silently accept bot submissions that fill the hidden field.
if (!empty($data['website'])) json_response(200, ['ok' => true, 'notification_sent' => true]);
$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$message = trim((string)($data['message'] ?? ''));
if ($name === '' || mb_strlen($name) > 120 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254 || $message === '' || mb_strlen($message) > 5000) {
    json_response(422, ['ok' => false, 'error' => 'Please enter a valid name, email address, and message (up to 5,000 characters).']);
}
try {
    $db = contact_db();
    $ipHash = client_ip_hash();
    $limit = $db->prepare('SELECT COUNT(*) FROM contact_messages WHERE ip_hash = ? AND created_at >= (NOW() - INTERVAL 1 HOUR)');
    $limit->execute([$ipHash]);
    if ((int)$limit->fetchColumn() >= MAX_MESSAGES_PER_HOUR) json_response(429, ['ok' => false, 'error' => 'Please wait before sending another message.']);
    $insert = $db->prepare('INSERT INTO contact_messages (name, email, message, ip_hash, status) VALUES (?, ?, ?, ?, \'new\')');
    $insert->execute([$name, $email, $message, $ipHash]);
    $sent = send_contact_notification($name, $email, $message);
    json_response(201, ['ok' => true, 'notification_sent' => $sent]);
} catch (Throwable $e) {
    error_log('Portfolio contact submission failed: ' . get_class($e));
    json_response(500, ['ok' => false, 'error' => 'The message could not be saved. Please try again later or email me directly.']);
}
