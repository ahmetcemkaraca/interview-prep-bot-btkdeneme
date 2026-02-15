import test from "node:test";
import assert from "node:assert/strict";

import handler from "../src/index.js";

test("handler responds to /start", async () => {
  process.env.APPWRITE_ENDPOINT = "https://example.test/v1";
  process.env.APPWRITE_PROJECT_ID = "btk";
  process.env.APPWRITE_API_KEY = "test";
  process.env.APPWRITE_DATABASE_ID = "db";
  process.env.APPWRITE_COLLECTION_SESSIONS = "sessions";
  process.env.APPWRITE_COLLECTION_QUESTIONS = "questions";
  process.env.APPWRITE_COLLECTION_PLANS = "plans";
  process.env.TELEGRAM_BOT_TOKEN = "123:abc";

  const sent = [];
  global.fetch = async (url, options) => {
    sent.push({ url, options });
    return {
      ok: true,
      text: async () => "ok"
    };
  };

  let statusCode = 200;
  let payload = null;

  const res = {
    json: (body, status = 200) => {
      payload = body;
      statusCode = status;
      return { body, status };
    }
  };

  await handler({
    req: {
      headers: {},
      body: {
        update_id: 1,
        message: {
          message_id: 1,
          chat: { id: 99 },
          text: "/start"
        }
      }
    },
    res,
    log: () => {},
    error: () => {}
  });

  assert.equal(statusCode, 200);
  assert.equal(payload.ok, true);
  assert.equal(sent.length, 1);
  assert.match(sent[0].url, /api\.telegram\.org/);
});

test("handler responds to /help", async () => {
  process.env.APPWRITE_ENDPOINT = "https://example.test/v1";
  process.env.APPWRITE_PROJECT_ID = "btk";
  process.env.APPWRITE_API_KEY = "test";
  process.env.APPWRITE_DATABASE_ID = "db";
  process.env.APPWRITE_COLLECTION_SESSIONS = "sessions";
  process.env.APPWRITE_COLLECTION_QUESTIONS = "questions";
  process.env.APPWRITE_COLLECTION_PLANS = "plans";
  process.env.TELEGRAM_BOT_TOKEN = "123:abc";

  const sent = [];
  global.fetch = async (url, options) => {
    sent.push({ url, options });
    return {
      ok: true,
      text: async () => "ok"
    };
  };

  const res = {
    json: (body, status = 200) => ({ body, status })
  };

  await handler({
    req: {
      headers: {},
      body: {
        update_id: 2,
        message: {
          message_id: 2,
          chat: { id: 99 },
          text: "/help"
        }
      }
    },
    res,
    log: () => {},
    error: () => {}
  });

  assert.equal(sent.length, 1);
  const payload = JSON.parse(sent[0].options.body);
  assert.match(payload.text, /Komutlar/);
  assert.match(payload.text, /\/plan/);
});
