# EPIC-003: Table Design and Persistence

## Goal
Persist requests and generated outputs in a simple table structure that supports retrieval for /plan.

## Minimal Data Model (MVP)

### Table: sessions
- id (uuid)
- created_at (timestamp)
- chat_id (string)
- user_message (text)
- role (text)
- experience (text)
- language (text)
- status (text: received | generated | failed)

### Table: questions
- id (uuid)
- session_id (uuid)
- idx (int 1-10)
- category (text)
- difficulty (text)
- question_text (text)
- ideal_answer_skeleton (text)
- red_flags (text)

### Table: plans
- id (uuid)
- session_id (uuid)
- today_question_idxs (text)  
- practice_instructions (text)

## Acceptance Criteria
- Can write a session record before AI call
- Can write 10 question rows + 1 plan row after AI call
- Can query latest session by chat_id

## Notes
- Store lists as newline-separated text if the table tech is simple (e.g., Google Sheets).
- If using a DB, use JSON columns for skeleton/red_flags.
