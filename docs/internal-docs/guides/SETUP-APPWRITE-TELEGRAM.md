# Setup Guide: Appwrite + Telegram + OpenRouter

## 1. Appwrite project
- Endpoint: `https://duaapp.ackaraca.me/v1`
- Project ID: `btk`

Create database and collections using the schema docs:
- `appwrite/schemas/sessions.md`
- `appwrite/schemas/questions.md`
- `appwrite/schemas/plans.md`

## 2. Function deployment
- Source: `appwrite/functions/telegram-webhook`
- Runtime: Node.js 20+
- Entrypoint: `src/index.js`
- Install command: `npm install`

## 3. Function environment variables
Copy values from `.env.example` and set them in Function settings.

Minimum required:
- `APPWRITE_ENDPOINT`
- `APPWRITE_PROJECT_ID`
- `APPWRITE_API_KEY`
- `APPWRITE_DATABASE_ID`
- `APPWRITE_COLLECTION_SESSIONS`
- `APPWRITE_COLLECTION_QUESTIONS`
- `APPWRITE_COLLECTION_PLANS`
- `TELEGRAM_BOT_TOKEN`
- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`

Optional but recommended:
- `TELEGRAM_WEBHOOK_SECRET`

## 4. Telegram webhook setup

Use your deployed Appwrite function URL as webhook target.

```bash
curl -X POST "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "<APPWRITE_FUNCTION_URL>",
    "secret_token": "<TELEGRAM_WEBHOOK_SECRET>"
  }'
```

Verify webhook:

```bash
curl "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/getWebhookInfo"
```

## 5. Smoke test
1. Send `/start` to bot.
2. Send: `Backend Developer, 3 years Node.js`.
3. Confirm records in `sessions`, `questions`, `plans`.
4. Send `/plan` and confirm latest plan is returned.

## 6. Security notes
- Keep API keys only in env vars.
- Rotate exposed bot/API keys immediately.
- Use `TELEGRAM_WEBHOOK_SECRET` for webhook validation.
