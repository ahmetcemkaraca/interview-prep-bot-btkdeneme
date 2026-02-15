# plans collection schema

Collection ID: `plans`

Attributes:
- `session_id` -> string, required, size 64
- `chat_id` -> string, required, size 64
- `today_question_idxs` -> string, required, size 64 (example: `1,4,7`)
- `practice_instructions` -> string, required, size 2000

Indexes (recommended):
- `idx_chat_created` -> key(`chat_id`, `$createdAt` desc)
