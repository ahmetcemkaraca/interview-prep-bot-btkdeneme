# Cloudflare Worker Relay

Bu relay Telegram webhook isteklerini Appwrite Function execution endpoint'ine iletir ve gerekli Appwrite header'larini ekler.

## Dosya
- `relay/cloudflare-worker.js`

## Cloudflare Worker Secrets/Vars
Worker dashboard uzerinden su degerleri ekle:

- `APPWRITE_ENDPOINT` = `https://duaapp.ackaraca.me/v1`
- `APPWRITE_PROJECT_ID` = `btk`
- `APPWRITE_API_KEY` = `<appwrite api key>`
- `APPWRITE_FUNCTION_ID` = `telegram_webhook`
- `TELEGRAM_WEBHOOK_SECRET` = `btk-telegram-webhook-secret`
- `ENFORCE_TELEGRAM_SECRET` = `true` (demo icin gecici `false` yapilabilir)

## Route
Worker'i su sekilde expose et:
- `https://<senin-worker-domainin>/telegram-webhook`

## CLI ile deploy

Bu repoda `wrangler.toml` hazir:
- `relay/wrangler.toml`

Gerekenler:
- `wrangler` CLI
- `CLOUDFLARE_API_TOKEN`

Deploy:

```bash
cd relay
wrangler deploy --config wrangler.toml
```

Secret/vars:

```bash
export APPWRITE_API_KEY="..."
export TELEGRAM_WEBHOOK_SECRET="btk-telegram-webhook-secret"
./scripts/set-secrets.sh
```

## Telegram setWebhook

```bash
curl -X POST "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://<senin-worker-domainin>/telegram-webhook",
    "secret_token": "btk-telegram-webhook-secret",
    "allowed_updates": ["message"],
    "drop_pending_updates": true
  }'
```

## Kontrol

```bash
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getWebhookInfo"
```
