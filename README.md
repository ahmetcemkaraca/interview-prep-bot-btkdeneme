# BTKDeneme Interview Prep Bot

`interview-prep-bot-btkdeneme` reposu icin Telegram tabanli mulakat hazirlik botu.

Kullanici `rol + deneyim` gonderir, bot su ciktilari uretir:
- 10 mulakat sorusu
- her soru icin ideal cevap iskeleti
- red flag'ler
- bugun calisilacak 3 soru plani

## Architecture

`Telegram -> Cloudflare Worker Relay -> Appwrite Function -> Appwrite DB -> OpenRouter -> Telegram`

- `relay/` Telegram webhook isteklerini Appwrite execution endpoint'ine iletir
- `appwrite/functions/telegram-webhook` asil is kurali ve AI akisi
- `appwrite/schemas` tablo/collection semalari

## Features

- `/start`, `/help`, `/new`, `/plan`, `/retry` komutlari
- duplicate update korumasi (`update_id`)
- per-chat rate limiting
- structured observability logs (`parse_ms`, `ai_ms`, `write_ms`, `total_ms`)
- Appwrite uzerinde kalici veri saklama (`sessions`, `questions`, `plans`)

## Project Structure

```text
appwrite/
  functions/telegram-webhook/
  schemas/
docs/
  epics/
  internal-docs/
relay/
```

## Quick Start

1) Appwrite kaynaklarini olustur
- database: `interview_prep`
- collections: `sessions`, `questions`, `plans`
- detaylar: `appwrite/schemas/*.md`

2) Function deploy et
- kaynak: `appwrite/functions/telegram-webhook`
- entrypoint: `src/index.js`
- build command: `npm install`

3) Function env var'larini set et
- tum liste: `.env.example`

4) Worker relay deploy et
- detaylar: `relay/README.md`

5) Telegram webhook bagla
- `setWebhook` komutu: `relay/README.md`

## Environment Variables

Temel degiskenler:
- `APPWRITE_ENDPOINT`
- `APPWRITE_PROJECT_ID`
- `APPWRITE_API_KEY`
- `APPWRITE_DATABASE_ID`
- `APPWRITE_COLLECTION_SESSIONS`
- `APPWRITE_COLLECTION_QUESTIONS`
- `APPWRITE_COLLECTION_PLANS`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_WEBHOOK_SECRET`
- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL`

Rate limit:
- `RATE_LIMIT_WINDOW_SECONDS` (default: `60`)
- `RATE_LIMIT_MAX_REQUESTS` (default: `5`)

## Commands

- `/start` baslangic mesaji
- `/help` komut ve format yardimi
- `/new` yeni istek formati
- `/plan` son plani getirir
- `/retry` son oturumu tekrar uretir

Ornek girdi:

```text
Backend Developer, 3 years Node.js
```

## Security

- Gercek token/key dosyalara yazilmaz, sadece environment/secrets olarak tutulur.
- Public repoya push etmeden once secret taramasi yapin.
- Keyler sizdiysa rotate edin.

## Documentation

- Appwrite setup: `appwrite/README.md`
- Relay setup: `relay/README.md`
- Internal guides: `docs/internal-docs/guides/`
- Epic dokumanlari: `docs/epics/`
