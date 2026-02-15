# memories collection schema

Collection ID: `memories`

Attributes:
- `chat_id` -> string, required, size 64
- `summary` -> string, required, size 2000
- `tokens` -> integer, required, min 1, max 10000
- `keywords` -> string, required, size 512

Indexes (recommended):
- `idx_memory_chat` -> key(`chat_id`)

Notes:
- Her basarili cevaptan sonra 1-2 cumlelik hafiza ozeti kaydedilir.
- Kullanici bazinda toplam hafiza `MEMORY_MAX_TOKENS` (default 3000) ustune cikarsa en eski kayitlar silinir.
