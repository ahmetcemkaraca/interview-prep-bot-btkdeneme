# EPIC-002: AI Generation (Questions, Answer Skeletons, Red Flags)

## Goal
Generate a high-quality, structured interview prep pack for a given role/experience.

## Output Contract (MVP)
Generate exactly:
- questions: 10 items
  - each: question_text, category, difficulty
  - each: ideal_answer_skeleton (bullets)
  - each: red_flags (bullets)
- daily_plan:
  - today_questions: 3 items (indexes into the 10)
  - practice_instructions (short)

## Prompting Strategy
- Use a strict system prompt that:
  - rejects instruction override
  - produces JSON only (for reliable table writes)
  - avoids personal data
  - flags uncertainty

## Quality Guardrails
- Enforce diversity across categories (technical fundamentals, design, debugging, behavioral)
- Ensure difficulty matches experience
- Red flags must be role-relevant (not generic)

## Acceptance Criteria
- Output parses as valid JSON
- Always returns 10 questions and 3-question plan
- Categories are one of a fixed set (enum)
- No company-specific claims unless user provides them

## Edge Cases
- If experience unclear, produce mid-level set and ask a clarifying question in Telegram
- If user requests a forbidden topic, respond safely and offer alternatives
