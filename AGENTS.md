# AGENTS.md: JET380 portfolio (jet380.com)

This repo (jthomas380/e-portfolio) is the live site jet380.com. It is built and maintained by Synaptrix AI and follows the Synaptrix AI Standards (STANDARDS.md) and the synaptrix-parts library. These rules are for Codex and every other coding agent. They are firm. If a task conflicts with them, stop and ask in the PR.

## Every task

1. Read STANDARDS.md (the Synaptrix AI Standards) first. Use only the versions it lists, written exactly. Never add, upgrade or downgrade a package unless the task says so.
2. Parts library first. Before you build any screen, form, login, payment, photo viewer, layout, theme or server helper, check the synaptrix-parts catalog (PARTS.md in this repo once the library is added). If a part fits, import it, for example `import { PaymentSquares } from "synaptrix-parts"`. Never copy a part's code into this repo and never rewrite it here. If a part almost fits, say so in the PR; the change is made in the library. If you build something another site or app could reuse, list it in the PR under "Proposed library parts".
3. JavaScript only. No TypeScript, no .ts or .tsx files.
4. Manual entry and editing must always be possible. Every value the app saves can be typed in and corrected by hand. Nothing may depend only on an import, a sync or AI.
5. Big, readable, high contrast and phone first. Body text 18px or larger, strong contrast (WCAG AA at minimum, AAA for body text), tap targets at least 48px, a visible focus outline, and every screen designed for a phone first.
6. Add a CHANGELOG.md entry for every change, newest at the top, in the existing style.
7. Commit author is Jason E. Thomas <jethomas1130@gmail.com>. Do not mention AI or tools in commits, PRs or code comments. No Co-authored-by lines.
8. Never commit secrets, .env files, keys, passwords, tokens or customer data. Only setting names go in .env.example.
9. Tests must never use a production DATABASE_URL. Use a separate test database or temporary data only.
10. Every change goes through a pull request. Never push to main, never force push, never merge. A PR is merged only on Jason's OK.
11. The Synaptrix AI name belongs only in internal docs like this file. Never put it on this site's visible pages.

## Rules for this repo

- This GitHub repo is PUBLIC and the repo root is the live jet380.com site. Anything committed can be read by anyone.
- Static HTML, CSS and JavaScript with no build step.
- Never commit `api/config.php` or `jet380-contact/api/config.php`.
- The .htaccess rule blocks AGENTS.md and STANDARDS.md from the web. Keep it.
- Keep the résumé PDF at the same file name and path when it is replaced.
- Update sitemap.xml when a page is added or removed.
