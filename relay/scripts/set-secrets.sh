#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${CLOUDFLARE_API_TOKEN:-}" ]]; then
  echo "CLOUDFLARE_API_TOKEN is required"
  exit 1
fi

if [[ -z "${APPWRITE_API_KEY:-}" ]]; then
  echo "APPWRITE_API_KEY is required"
  exit 1
fi

if [[ -z "${TELEGRAM_WEBHOOK_SECRET:-}" ]]; then
  echo "TELEGRAM_WEBHOOK_SECRET is required"
  exit 1
fi

echo "${APPWRITE_API_KEY}" | wrangler secret put APPWRITE_API_KEY --config wrangler.toml
echo "${TELEGRAM_WEBHOOK_SECRET}" | wrangler secret put TELEGRAM_WEBHOOK_SECRET --config wrangler.toml

wrangler secret put APPWRITE_ENDPOINT --config wrangler.toml <<<"https://duaapp.ackaraca.me/v1"
wrangler secret put APPWRITE_PROJECT_ID --config wrangler.toml <<<"btk"
wrangler secret put APPWRITE_FUNCTION_ID --config wrangler.toml <<<"telegram_webhook"
wrangler secret put ENFORCE_TELEGRAM_SECRET --config wrangler.toml <<<"true"

echo "Secrets configured successfully."
