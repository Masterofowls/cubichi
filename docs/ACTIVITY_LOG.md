# Activity Log

## 2026-09-23

- Switched production target to reg.ru ISPmanager (`server279`, IPs
  `31.31.197.15` / `2a00:f940:2:2:1:1:0:279`).
- Added `docs/REG_RU_HOSTING.md`, `scripts/deploy-regru.ps1`,
  `public/.htaccess`, `npm run deploy:regru`.
- Removed `public/CNAME`; GitHub Pages workflow is manual-only
  (`workflow_dispatch`); custom domain cleared from Pages.

## 2026-09-20

- Added GitHub Actions workflow `.github/workflows/deploy-pages.yml` for
  Next.js static export (`out/`) → GitHub Pages.
- Added `public/CNAME` with `cubichi.ru`.
- Documented NS (`ns1.hosting.reg.ru` / `ns2.hosting.reg.ru`) and DNS
  A/AAAA/CNAME records for `.ru` domain in `docs/GITHUB_PAGES_DNS.md`.
