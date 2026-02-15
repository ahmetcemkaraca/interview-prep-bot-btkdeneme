# Appwrite CLI Setup

This folder contains Appwrite deployment notes and collection schemas for the Interview Prep Bot.

## Prerequisites
- Appwrite endpoint: `https://duaapp.ackaraca.me/v1`
- Project ID: `btk`
- Appwrite CLI installed

## 1) Login and project selection

```bash
appwrite client --endpoint https://duaapp.ackaraca.me/v1 --project-id btk
appwrite login
```

## 2) Create database and collections

Create these resources in Appwrite Console or via CLI/API:

- Database: `interview_prep`
- Collections: `sessions`, `questions`, `plans`

Schema details are in:
- `appwrite/schemas/sessions.md`
- `appwrite/schemas/questions.md`
- `appwrite/schemas/plans.md`

## 3) Function deployment

Function source path:
- `appwrite/functions/telegram-webhook`

Runtime suggestion:
- Node.js 20+

Entrypoint:
- `src/index.js`

Build command:
- `npm install`

## 4) Required environment variables

Set all values from `.env.example` in the Appwrite Function settings.

## 5) Telegram webhook

After function is deployed, set Telegram webhook:

```bash
curl -X POST "https://api.telegram.org/bot<TELEGRAM_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "<APPWRITE_FUNCTION_URL>",
    "secret_token": "<TELEGRAM_WEBHOOK_SECRET>"
  }'
```
