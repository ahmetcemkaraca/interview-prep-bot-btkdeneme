# sessions collection schema

Collection ID: `sessions`

Attributes:
- `update_id` -> string, required, size 64
- `message_id` -> string, required, size 64
- `chat_id` -> string, required, size 64
- `user_message` -> string, required, size 4000
- `role` -> string, required, size 200
- `experience` -> string, required, size 120
- `language` -> string, required, size 8, default `tr`
- `status` -> string, required, size 16 (`received|generated|failed`)

Indexes (recommended):
- `idx_chat_created` -> key(`chat_id`, `$createdAt` desc)
- `idx_update_id` -> key(`update_id`)
