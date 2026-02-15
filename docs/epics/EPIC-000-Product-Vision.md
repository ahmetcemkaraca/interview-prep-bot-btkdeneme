# EPIC-000: Product Vision (Mulakat Hazirlik Botu)

## Goal
Build a Telegram-based bot that takes `position + experience` input and returns:
- 10 interview questions tailored to the role and seniority
- An ideal answer skeleton for each question
- Red flags to avoid
- A daily plan: "Today, practice 3 questions"

## Target Users
- Job seekers preparing for technical and non-technical interviews
- Bootcamp participants needing a fast, demo-friendly workflow

## End-to-End Workflow
Telegram -> Webhook -> Table -> AI processing -> Telegram response

1) User sends a message (role + experience + optional constraints)
2) Webhook receives payload
3) Request is stored in a table (raw input + metadata)
4) AI generates structured outputs (questions, skeletons, red flags, plan)
5) Outputs are written to a table
6) Bot replies in Telegram with formatted results

## Scope (MVP)
- Single Telegram chat flow (1:1)
- One-shot generation per request
- Table-backed persistence (requests + generated items)
- Turkish output by default

## Non-Goals (MVP)
- Voice transcription / file uploads
- Multi-user team collaboration
- External job posting ingestion
- Full spaced-repetition system

## Success Criteria
- User can get a role-specific 10-question set in < 30 seconds
- Output is structured, consistent, and easy to practice
- A single demo run shows the full automation chain

## Risks / Considerations
- Prompt injection via user text -> must sanitize instructions and constrain model behavior
- Data privacy: avoid storing unnecessary personal identifiers
- Hallucination: require the model to admit uncertainty and avoid fabricating company-specific info
