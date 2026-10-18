# Render API for the reg.ru website

The website remains a static Vite build on reg.ru. The browser sends form
submissions and content requests to the Express API running as a Render Web
Service. AdminJS is available on that same service.

## Deploy the service

Create a **Node Web Service** connected to this repository. Leave **Root
Directory** empty and configure:

| Setting           | Value                  |
| ----------------- | ---------------------- |
| Build Command     | `npm ci --include=dev` |
| Start Command     | `npm start`            |
| Health Check Path | `/api/health`          |

Render supplies `PORT`; the server listens on it. Set these environment
variables in the Render Dashboard (never in the public website build):

```env
NODE_ENV=production
FRONTEND_ORIGINS=https://cubichi.ru,https://www.cubichi.ru
ADMIN_USER=your-admin-login
ADMIN_PASS=a-long-unique-password
ADMIN_COOKIE_SECRET=a-random-secret-at-least-32-characters-long
SMTP_HOST=smtp.mail.ru
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=gurevich_lena@mail.ru
SMTP_PASS=mail-ru-application-password
DATA_DIR=/var/data
```

Use a **paid Render Web Service** for production email. Render's free web
services block outbound SMTP on ports 465 and 587, and port 25 is blocked for
all services. Mail.ru SMTP on port 465 therefore will not send from a free
instance. Free services also use ephemeral filesystems and cannot attach a
persistent disk.

Attach a **Persistent Disk** to the paid service, with mount path `/var/data`.
The application reads initial JSON templates from the repository's `data/`
directory when the disk is empty, then writes AdminJS changes under the disk
mount. Back up this disk independently.

After deployment, Render provides a URL such as
`https://cubichi-api.onrender.com`. Confirm
`https://cubichi-api.onrender.com/api/health` returns `{"status":"ok"}` and
open `https://cubichi-api.onrender.com/admin` to sign in.

## Connect the reg.ru frontend

In the repository's local `.env.local`, set the public API URL before building:

```env
VITE_API_BASE_URL=https://cubichi-api.onrender.com
```

Build and upload the contents of `out/` to the reg.ru web root:

```powershell
npm run build
npm run deploy:regru
```

Vite embeds `VITE_API_BASE_URL` into the generated JavaScript. Rebuild and
re-upload `out/` whenever the API URL changes. Set `FRONTEND_ORIGINS` in Render
to the exact HTTPS origins that serve the frontend; do not add trailing
slashes. If using `api.cubichi.ru`, add it to Render as a custom domain, set up
the DNS record Render provides, and use `https://api.cubichi.ru` in
`.env.local`.

The browser makes requests directly from the reg.ru origin to the Render API.
The Express app already handles CORS using `FRONTEND_ORIGINS`; no proxy or
server-side code on reg.ru is required. An `Origin is not allowed` response
means the environment variable does not exactly match the website's origin.

Official Render references:

- [Web Services](https://render.com/docs/web-services)
- [Persistent Disks](https://render.com/docs/disks)
- [Free instance limitations](https://render.com/docs/free)
