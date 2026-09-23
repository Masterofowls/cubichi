# Хостинг reg.ru (ISPmanager) — cubichi.ru

Статический сайт (Next.js `output: "export"`) выкладывается в публичную
директорию сайта на **server279.hosting.reg.ru**.

| Параметр | Значение |
| --- | --- |
| Панель | https://server279.hosting.reg.ru:1500/ispmgr |
| Домен | `cubichi.ru` (+ alias `www.cubichi.ru`) |
| IPv4 | `31.31.197.15` |
| IPv6 | `2a00:f940:2:2:1:1:0:279` |
| NS1 | `ns1.hosting.reg.ru` |
| NS2 | `ns2.hosting.reg.ru` |

## 1. Сайт в ISPmanager

**Сайты → cubichi.ru → Изменить** (как на скриншоте):

- Имя: `cubichi.ru`
- Псевдонимы: `www.cubichi.ru`
- Защищённое соединение (SSL): включено
- Перенаправлять HTTP → HTTPS: **включить**
- Индексная страница: `index.html`
- Кодировка: `UTF-8`

Сохранить. SSL-сертификат: **SSL-сертификаты** → Let’s Encrypt для
`cubichi.ru` + `www.cubichi.ru` (если ещё не выпущен).

## 2. DNS (зона на hosting.reg.ru)

NS уже должны быть `ns1.hosting.reg.ru` / `ns2.hosting.reg.ru`.

В **Управление DNS** для `cubichi.ru` оставьте (или создайте):

| Тип | Хост | Значение |
| --- | --- | --- |
| A | `@` | `31.31.197.15` |
| AAAA | `@` | `2a00:f940:2:2:1:1:0:279` |
| A | `www` | `31.31.197.15` |
| AAAA | `www` | `2a00:f940:2:2:1:1:0:279` |

Удалите записи, указывающие на GitHub Pages (`185.199.*`, CNAME на
`*.github.io`) или Vercel/Netlify.

MX/TXT для почты не трогайте.

## 3. Куда заливать файлы

Публичная директория сайта в ISPmanager (обычно):

`www/cubichi.ru/`

или полный путь вида:

`/var/www/uXXXXXX/data/www/cubichi.ru/`

Содержимое локальной папки `out/` (результат `npm run build`) должно
лежать **в корне** этой директории: `index.html`, `_next/`, `games/`, …
и файл `.htaccess`.

## 4. Деплой с машины разработчика

1. Скопируйте `.env.example` → `.env.local` и заполните FTP:

```env
FTP_HOST=server279.hosting.reg.ru
FTP_USER=ваш_ftp_логин
FTP_PASS=ваш_ftp_пароль
FTP_REMOTE_DIR=/www/cubichi.ru
```

Логин/пароль FTP: ISPmanager → **FTP-пользователи** (или письмо от reg.ru).

2. Сборка и выгрузка:

```powershell
npm ci
npm run build
npm run deploy:regru
```

Скрипт `scripts/deploy-regru.ps1` заливает `out/` по FTP на хостинг.

Альтернатива без скрипта: **Файловый менеджер** в ISPmanager → открыть
`www/cubichi.ru` → загрузить архив `out.zip` и распаковать, либо
загрузить файлы вручную.

## 5. GitHub Pages

Кастомный домен `cubichi.ru` с GitHub Pages нужно **снять**
(Settings → Pages → Custom domain → Remove), чтобы не было конфликта
сертификатов/DNS. Workflow Pages можно оставить как запасной зеркальный
деплой на `*.github.io`, но прод — только reg.ru.

## 6. Проверка

```powershell
Resolve-DnsName cubichi.ru -Type A
Resolve-DnsName cubichi.ru -Type AAAA
```

Ожидаемо: `31.31.197.15` и `2a00:f940:2:2:1:1:0:279`.

Открыть https://cubichi.ru/ и https://www.cubichi.ru/.
