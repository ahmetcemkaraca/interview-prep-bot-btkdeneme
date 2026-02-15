import test from "node:test";
import assert from "node:assert/strict";

import { chunkMessage, normalizeAiOutput, parseInput } from "../src/index.js";

test("parseInput extracts role and experience", () => {
  const parsed = parseInput("Backend Developer, 3 years Node.js");
  assert.equal(parsed.role, "Backend Developer");
  assert.equal(parsed.experience, "3 years");
});

test("normalizeAiOutput enforces question count and plan", () => {
  const raw = {
    questions: Array.from({ length: 10 }).map((_, i) => ({
      idx: i + 1,
      category: "technical",
      difficulty: "medium",
      question_text: `Question ${i + 1}`,
      ideal_answer_skeleton: ["a", "b"],
      red_flags: ["x", "y"]
    })),
    daily_plan: {
      today_question_idxs: [2, 5, 8],
      practice_instructions: "Plan"
    }
  };

  const out = normalizeAiOutput(raw);
  assert.equal(out.questions.length, 10);
  assert.deepEqual(out.daily_plan.today_question_idxs, [2, 5, 8]);
});

test("chunkMessage splits long text", () => {
  const chunks = chunkMessage("x".repeat(8001), 3900);
  assert.equal(chunks.length, 3);
  assert.equal(chunks[0].length, 3900);
});
