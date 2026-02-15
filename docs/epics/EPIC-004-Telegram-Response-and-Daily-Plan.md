# EPIC-004: Telegram Response and Daily Plan

## Goal
Send a readable Telegram reply and support quick retrieval of the daily plan.

## Response Format (MVP)
- Header: role + experience
- 10 questions as a numbered list
  - each includes: category + difficulty
  - brief answer skeleton (3-5 bullets)
  - red flags (2-4 bullets)
- Footer: "Bugun 3 soru" plan

## /plan Behavior
- Fetch latest session for chat_id
- Return the 3 selected questions + practice instructions

## Acceptance Criteria
- Messages are under Telegram limits (split into multiple messages if needed)
- Output is stable and scannable on mobile
- /plan works even after bot restarts (table-backed)

## Risks
- Long messages: implement chunking
- Markdown escaping: sanitize special characters
