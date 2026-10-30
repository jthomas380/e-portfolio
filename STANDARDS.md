# Synaptrix AI Standards

Version 1.0, October 29, 2026.

Every project built and maintained by Synaptrix AI uses exactly these versions.
This file is copied into every repo and every copy is kept identical. Change it
only in a set of PRs that update every copy at once, after Jason's OK.

## Runtime

| Tool | Exact version | Why |
| --- | --- | --- |
| Node.js | 24.20.0 | Node 24 is the long term support line. The invoicing and GovCon deploys already build on Node 24. |
| npm | 11.19.0 | The npm that ships with Node 24.20.0. Install with `npm ci` from the committed lockfile. |
| PostgreSQL | 18 | The invoicing deploy tests already run on Postgres 18. Patch updates (18.x) come from the server's normal security updates. |

## Front end

| Package | Exact version | Why |
| --- | --- | --- |
| react | 18.3.1 | What the live invoicing app runs. React 18 is the Synaptrix AI standard. |
| react-dom | 18.3.1 | Always the same version as react. |
| react-router-dom | 6.30.6 | What invoicing runs. Page routing (which screen shows for which address). |
| vite | 5.4.21 | What invoicing builds with. Fast build and local preview. |
| @vitejs/plugin-react | 4.7.0 | The Vite helper that matches Vite 5 and React 18. |

## Server

| Package | Exact version | Why |
| --- | --- | --- |
| express | 5.3.0 | The web server both live apps run. |
| pg | 8.23.1 | Postgres connection used by both live apps. |
| bcryptjs | 3.0.3 | Password hashing, used by both live apps. |
| jsonwebtoken | 9.0.3 | Signed sign in tokens, as in invoicing. |
| cookie-parser | 1.4.7 | Reads the sign in cookie, as in invoicing. |
| helmet | 8.3.0 | Safe web headers, as in invoicing. |
| express-rate-limit | 8.7.1 | Slows down password guessing, as in GovCon. |
| dotenv | 18.0.8 | Reads settings from .env on the server, as in invoicing. |
| multer | 2.5.0 | File uploads, as in invoicing. |
| nodemailer | 7.0.13 | Sending email, as in invoicing. |
| pdfkit | 0.20.2 | Making new PDFs (invoices, estimates), as in invoicing. |
| pdf-lib | 1.17.1 | Only for filling or joining PDFs that already exist, as in GovCon. New PDFs use pdfkit. |
| stripe | 23.0.1 | Card payments, as in invoicing. |

## Tests

| Tool | Exact version | Why |
| --- | --- | --- |
| node:test | built into Node | Unit and API tests with no extra package. |
| playwright | 1.64.1 | Real browser checks, phone and desktop screenshots, as in invoicing. |

## Languages and style

- JavaScript only (ES modules). No TypeScript, no .ts or .tsx files.
- Plain CSS with named colors and sizes (CSS variables). No other styling system.
- PHP sites (That Doggone Cart, the demos gate) use the PHP version their Hostinger site is set to. No new Composer packages without Jason's OK.

## Version rules

1. Write exact versions in package.json. No `^`, no `~`, never `latest`.
2. Commit package-lock.json and install with `npm ci`.
3. A tool that is not on this list needs Jason's OK in a PR, and is then added here.
4. Major upgrade rule: no project changes a major version on its own (for example React 18 to 19, Vite 5 to 6, Express 5 to 6, Node 24 to 26). Major upgrades happen only as one planned upgrade across every project at once, after Jason's OK, with this file updated in every repo in the same round.
5. Existing projects that differ from this list move to it only in their planned rebuild with the synaptrix-parts library. Never upgrade or downgrade a live app as a side task.

## Known differences today (October 29, 2026)

- GovCon Desk (govcon.nfprullc.com): react and vite are set to `latest`, so it runs React 19.3.0, Vite 8.3.4, @vitejs/plugin-react 6.1.2 and nodemailer 10.0.16.
- Demos hub (demos.jet380.com): the hub runs React 18.3.1; the demos run React 19.3.1 and react-router-dom 7.18.4; Hostinger builds it on Node 22.
- NFPRU React redesign (no live site): React 19.1.1, mixed Express 4 and 5.
- Milestone Tracker (milestones.jet380.com): Express 4.21.2 and Node 20 (.nvmrc).
- NFPRU Invoicing (invoices.nfprullc.com): the ci.yml check still uses Node 20 and Postgres 17; the deploy check uses Node 24 and Postgres 18.
