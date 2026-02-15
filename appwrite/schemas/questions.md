# questions collection schema

Collection ID: `questions`

Attributes:
- `session_id` -> string, required, size 64
- `idx` -> integer, required, min 1, max 10
- `category` -> string, required, size 32
- `difficulty` -> string, required, size 16
- `question_text` -> string, required, size 2000
- `ideal_answer_skeleton` -> string, required, size 4000
- `red_flags` -> string, required, size 2000

Indexes (recommended):
- `idx_session_idx` -> key(`session_id`, `idx` asc)
