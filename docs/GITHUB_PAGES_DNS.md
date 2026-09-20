# GitHub Pages + cubichi.ru (reg.ru)

Сайт публикуется из репозитория `Masterofowls/cubichi` через GitHub Actions
(`Deploy to GitHub Pages`). Кастомный домен: **cubichi.ru**.

## 1. GitHub (уже в репозитории)

1. **Settings → Pages**
2. Source: **GitHub Actions**
3. Custom domain: `cubichi.ru` → Save
4. Дождаться DNS check (зелёная галочка)
5. Включить **Enforce HTTPS** (после выдачи сертификата, до 24 ч)

Альтернативный URL до пропагации DNS: `https://masterofowls.github.io/cubichi/`

## 2. NS-серверы для .ru (reg.ru)

DNS должен обслуживаться хостингом reg.ru (не «парковкой» и не чужими NS).

В панели **домена** cubichi.ru → **DNS-серверы / Делегирование**:

| NS | Значение |
| --- | --- |
| NS1 | `ns1.hosting.reg.ru` |
| NS2 | `ns2.hosting.reg.ru` |

Сохранить. Для зоны `.ru` смена NS обычно занимает **от нескольких часов до 24–72 ч**.

Проверка (PowerShell):

```powershell
Resolve-DnsName cubichi.ru -Type NS
```

Ожидаемо: `ns1.hosting.reg.ru` и `ns2.hosting.reg.ru`.

## 3. DNS-записи в зоне hosting.reg.ru

После делегирования на `ns*.hosting.reg.ru` откройте
**Хостинг / DNS-зона** для `cubichi.ru` и добавьте записи ниже.

Удалите старые A/AAAA/CNAME на apex (`@`) и `www`, которые указывают на
хостинг Vercel/Netlify/парковку reg.ru — они конфликтуют с GitHub Pages.

### Apex `cubichi.ru` (обязательно все 4 A + желательно 4 AAAA)

| Тип | Имя / Хост | Значение | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | 300–3600 |
| A | `@` | `185.199.109.153` | 300–3600 |
| A | `@` | `185.199.110.153` | 300–3600 |
| A | `@` | `185.199.111.153` | 300–3600 |
| AAAA | `@` | `2606:50c0:8000::153` | 300–3600 |
| AAAA | `@` | `2606:50c0:8001::153` | 300–3600 |
| AAAA | `@` | `2606:50c0:8002::153` | 300–3600 |
| AAAA | `@` | `2606:50c0:8003::153` | 300–3600 |

### `www.cubichi.ru`

| Тип | Имя / Хост | Значение | TTL |
| --- | --- | --- | --- |
| CNAME | `www` | `masterofowls.github.io` | 300–3600 |

Важно: CNAME указывает на `masterofowls.github.io` **без** `/cubichi`.
Не указывайте CNAME apex (`@`) на GitHub — для корня только A/AAAA.

### Редирект www ↔ apex

Если в GitHub Pages primary domain = `cubichi.ru`, GitHub сам сделает
редирект `www.cubichi.ru` → `cubichi.ru` (при корректных DNS для обоих).

## 4. Особенности .ru / reg.ru

- После смены NS подождите, пока Whois/DNS покажет новые NS, и только
  потом правьте зону на hosting.reg.ru.
- Не оставляйте «парковочную» A-запись reg.ru на `@`.
- Если нужна почта на домене — **не трогайте** существующие MX/TXT
  (SPF/DKIM/DMARC), меняйте только web-записи (A/AAAA/CNAME для `@` и `www`).
- Wildcard `*.cubichi.ru` не используйте (риск domain takeover).
- TTL на время отладки лучше `300`, потом можно поднять до `3600`.
- HTTPS-сертификат GitHub (Let’s Encrypt) выдаётся после успешной проверки DNS;
  Enforce HTTPS станет доступен позже.

## 5. Проверка

```powershell
Resolve-DnsName cubichi.ru -Type A
Resolve-DnsName cubichi.ru -Type AAAA
Resolve-DnsName www.cubichi.ru -Type CNAME
```

A должны совпасть с IP GitHub выше; www — CNAME на `masterofowls.github.io`.

Сайт:

- https://cubichi.ru/
- https://www.cubichi.ru/ (редирект на apex)

## 6. Деплой

Каждый push в `main` запускает workflow **Deploy to GitHub Pages**:
`npm ci` → `npm run build` (static export в `out/`) → публикация.

Ручной запуск: Actions → Deploy to GitHub Pages → Run workflow.

Admin-панель (`npm run admin`) на GitHub Pages **не** хостится — это
отдельный Node-сервер для локальной/отдельной инфраструктуры.
