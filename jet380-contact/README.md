# JET380 contact form and private inbox

This package supplies a PHP endpoint that stores portfolio messages in MariaDB/MySQL and sends notifications through Hostinger SMTP. The integrated portfolio keeps its existing `index.html`, styling, projects, and assets; do not replace the page with this package's sample `index.html`.

## Installed files

The integrated files live at the repository root and map to the matching paths in Hostinger `public_html`:

```text
public_html/
├── .htaccess
├── index.html
├── contact-card.js
├── contact-card.css
├── api/
│   ├── .htaccess
│   ├── config.php              (private; never commit)
│   ├── config.php.example      (placeholders only)
│   └── contact.php
└── admin/
	├── .htaccess
	├── index.php
	└── setup-admin.php         (self-removes after account creation)
```

Import `jet380-contact/setup.sql` using phpMyAdmin only; do not upload the SQL file. The package source folder is blocked from web access by its `.htaccess` file.

## Hostinger setup

1. In hPanel, create a MySQL database and database user, and grant that user access to the database.
2. In phpMyAdmin, select that database and import `jet380-contact/setup.sql`.
3. In File Manager, copy `api/config.php.example` to `api/config.php`. Enter the exact DB name, user, and password from hPanel. Keep the configured `api/config.php` private; it is ignored by Git and blocked from direct web access.
4. Choose a Hostinger mailbox for sending alerts. Set `SMTP_USER` and `SMTP_FROM` to that full mailbox address and `SMTP_PASS` to its mailbox password. Keep `SMTP_HOST` as `smtp.hostinger.com` and `SMTP_PORT` as `465`. Set `NOTIFY_TO` to the address that should receive alerts. The SMTP password is not your Hostinger account password.
5. Replace `ADMIN_SETUP_TOKEN` and `IP_HASH_SECRET` with private random values in the server's `api/config.php`. Never put database or SMTP credentials into JavaScript or HTML.
6. Upload the integrated root files over HTTPS. Do not deploy the placeholder `config.php.example` as `config.php`; the private server config must be filled first.
7. Open `https://jet380.com/admin/setup-admin.php?token=YOUR_ADMIN_SETUP_TOKEN`, using the configured token, and create a username plus a unique password of at least 14 characters. The setup page deletes itself when account creation succeeds. If the server cannot delete it, it locks itself with HTTP 410; remove `admin/setup-admin.php` in File Manager as a fallback.
8. Sign in at `https://jet380.com/admin/`, submit a test contact message, and confirm it appears in the inbox and the notification arrives.

Hostinger's SMTP settings are `smtp.hostinger.com`, SSL, port `465`; port `587` with TLS/STARTTLS is the alternative if needed. See [Hostinger email configuration](https://www.hostinger.com/support/1575756-how-to-get-email-account-configuration-details-for-hostinger-email).

## Security and behavior

- The browser posts JSON to `/api/contact.php`; it never connects directly to the database.
- PHP validates input, uses prepared statements, stores a keyed IP hash, limits each IP to five messages per hour, and uses a hidden spam field.
- The inbox uses password hashing, CSRF tokens, secure session settings, login-attempt limiting, and HTML-escaped message content. It lists the latest 200 messages.
- `api/.htaccess` blocks direct access to config files. Keep Apache `.htaccess` support enabled.
- If SMTP is unavailable, accepted messages remain in the database and can still be read in `/admin/`.

## Troubleshooting

- **The message could not be saved:** verify the database values, user grants, imported tables, and PHP PDO MySQL support.
- **Saved, but no email alert:** verify the mailbox credentials, SMTP settings, and spam folder. The message remains available in the inbox.
- **EmailJS still appears:** confirm the updated root `contact-card.js` and `index.html` are deployed, then hard-refresh the page.
