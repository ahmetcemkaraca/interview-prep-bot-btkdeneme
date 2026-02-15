# EPIC-005: Observability and Feedback Loop

## Goal
Make the demo reliable and support lightweight iteration.

## Logging (MVP)
- request_id/session_id
- chat_id (hashed or truncated if needed)
- timings: parse_ms, ai_ms, write_ms
- failure reasons

## Feedback Capture (Optional)
- After response, bot asks: "Faydali miydi? 1-5"
- Store rating + free-text note

## Acceptance Criteria
- Failures are visible with a single log view
- Retry path exists for AI failures (manual /retry)
