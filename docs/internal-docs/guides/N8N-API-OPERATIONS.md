# n8n API Operations

Bu dokuman n8n relay workflow'unu API ile yonetmek icin kullanilir.

## Current Workflow
- Name: `BTK Telegram -> Appwrite Relay`
- Workflow ID: `V2e4BMpNDM6sjduV`
- Webhook path: `/webhook/telegram-webhook`

## Features Implemented
- Telegram webhook intake
- Appwrite relay forwarding
- Retry: `3` deneme, `2000ms` bekleme
- Error branch: Appwrite `responseBody` doluysa hata kabul edilir
- Admin alert: Telegram'a uyarı mesaji gonderir

## API Calls

List workflows:

```bash
curl -H "X-N8N-API-KEY: <N8N_API_KEY>" \
  "https://<N8N_DOMAIN>/api/v1/workflows"
```

Get workflow:

```bash
curl -H "X-N8N-API-KEY: <N8N_API_KEY>" \
  "https://<N8N_DOMAIN>/api/v1/workflows/<WORKFLOW_ID>"
```

Update workflow (PUT full body):

```bash
curl -X PUT -H "X-N8N-API-KEY: <N8N_API_KEY>" \
  -H "Content-Type: application/json" \
  -d @workflow.json \
  "https://<N8N_DOMAIN>/api/v1/workflows/<WORKFLOW_ID>"
```

Activate workflow:

```bash
curl -X POST -H "X-N8N-API-KEY: <N8N_API_KEY>" \
  "https://<N8N_DOMAIN>/api/v1/workflows/<WORKFLOW_ID>/activate"
```

List recent executions:

```bash
curl -H "X-N8N-API-KEY: <N8N_API_KEY>" \
  "https://<N8N_DOMAIN>/api/v1/executions?workflowId=<WORKFLOW_ID>&limit=10"
```

## Template
- Sanitized template: `docs/internal-docs/n8n/telegram-relay.workflow.template.json`

## Security Notes
- API key, Appwrite key, Telegram bot token gibi secret degerler template'e yazilmaz.
- Production workflow'da secretleri n8n credentials veya server env ile yonet.
- Bu repository'e gercek key/token commit edilmemelidir.
