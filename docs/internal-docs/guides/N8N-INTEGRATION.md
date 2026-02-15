# n8n Integration (Recommended Path)

Bu proje icin onerilen inbound akis:

`Telegram -> n8n Webhook -> Appwrite Function -> Appwrite DB -> OpenRouter -> Telegram`

## Neden n8n?
- webhook orchestration
- retry/fallback adimlari ekleme kolayligi
- hata yakalama ve alert akislari
- kodu bozmadan yeni adimlar ekleme

## Workflow Ozeti

Workflow name:
- `BTK Telegram -> Appwrite Relay`

Node 1:
- `Telegram Webhook` (`POST /webhook/telegram-webhook`)
- response mode: `onReceived`

Node 2:
- `Forward To Appwrite` (HTTP Request)
- endpoint: `https://<appwrite-endpoint>/v1/functions/telegram_webhook/executions`
- method: `POST`
- headers:
  - `X-Appwrite-Project: <project-id>`
  - `X-Appwrite-Key: <appwrite-api-key>`

Body mapping:
- `path`: `/`
- `method`: `POST`
- `headers.x-telegram-bot-api-secret-token`: Telegram'dan gelen header
- `body`: Telegram update payload (stringify)

## Telegram Webhook Ayari

```bash
curl -X POST "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://<n8n-domain>/webhook/telegram-webhook",
    "secret_token": "<TELEGRAM_WEBHOOK_SECRET>",
    "allowed_updates": ["message"],
    "drop_pending_updates": true
  }'
```

Kontrol:

```bash
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getWebhookInfo"
```

## Notlar
- Appwrite function tarafinda secret dogrulamasi zaten yapiliyor.
- n8n tarafinda da ek IF kontrolu koyarak `x-telegram-bot-api-secret-token` kontrolu yapabilirsin.
- Workflow aktif degilse Telegram 200 donse bile ileri isleme calismaz.
