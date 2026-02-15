# EPIC-001: Telegram Intake and Webhook

## Goal
Receive Telegram messages, validate inputs, and route to processing pipeline.

## User Stories
- As a user, I can send: "Backend Developer, 3 years Node.js" and get tailored questions.
- As a user, I can optionally specify constraints: language, focus areas, interview type.

## Input Contract (MVP)
Free-form text, but the bot extracts fields:
- role (required)
- experience_years or experience_level (required-ish; infer if missing)
- focus_areas (optional)
- interview_type: HR, technical, system design, behavioral (optional)
- language: tr/en (optional; default tr)

## Telegram Commands (Suggested)
- /start: brief help + example
- /new: start a new request
- /plan: show today's 3-question plan (from latest session)

## Acceptance Criteria
- Webhook endpoint receives and logs update_id, chat_id, message_id
- Basic deduplication: ignore repeated update_id
- If role is missing, bot asks a single clarifying question
- Stores raw input and parsed fields to table

## Implementation Notes
- Keep parsing deterministic (regex + simple heuristics) before AI call
- Never execute user-provided URLs or code
