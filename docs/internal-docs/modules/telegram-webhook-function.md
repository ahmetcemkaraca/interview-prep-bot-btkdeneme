# Module: telegram-webhook function

Path: `appwrite/functions/telegram-webhook/src/index.js`

## Responsibilities
- Handle Telegram webhook updates
- Parse user input for role and experience
- Persist session state in Appwrite
- Call OpenRouter for structured JSON output
- Persist generated questions and plan
- Reply to Telegram with formatted messages

## Supported commands
- `/start`
- `/help`
- `/new`
- `/plan`
- `/retry`
- free text generation input

## Error behavior
- On parse failure: sends input format hint
- On provider or DB failure: returns 500 to webhook caller and logs error

## Reliability features
- Duplicate Telegram update protection via `update_id`
- Session status lifecycle: `received -> generated|failed`
- Message chunking for Telegram limits
- Per-chat rate limiting for generation flow

## Observability
- Structured logs for success and errors:
  - `session`, `update`, `message`, `chat`
  - `parse_ms`, `ai_ms`, `write_ms`, `total_ms`
  - failure reason on error path

## Data flow
1. Telegram update received
2. Optional webhook secret validation
3. Input parse and session create
4. OpenRouter generation
5. `questions` and `plans` writes
6. Session status update to `generated`
7. Telegram response
