# Appwrite CLI Commands

## Configure CLI

```bash
appwrite client --endpoint "https://duaapp.ackaraca.me/v1" --project-id "btk"
appwrite login
```

## Link local project

Run in `interview-prep-bot/`:

```bash
appwrite init project
```

If prompted, choose existing project: `btk`.

## Deploy function

```bash
appwrite push functions
```

If your CLI version does not support this directly, deploy from Appwrite Console using zip upload from:
- `appwrite/functions/telegram-webhook`

## Verify deployment
- Function logs should show webhook requests.
- `/start` and `/plan` commands should respond in Telegram.
