import assert from "node:assert/strict";
import test from "node:test";
import { brakingQuestions, rampQuestions } from "../lib/investigation-questions.ts";
import { gradeQuiz } from "../lib/quiz.ts";

test("hai bài chấm độc lập và đánh số câu sai trong bộ câu hỏi riêng", () => {
  const braking = gradeQuiz(
    brakingQuestions,
    brakingQuestions.map((q) => q.correct),
  );
  const rampAnswers = rampQuestions.map((q) => q.correct);
  rampAnswers[0] = (rampAnswers[0] + 1) % rampQuestions[0].options.length;
  const ramp = gradeQuiz(rampQuestions, rampAnswers);
  assert.equal(braking.score, 10);
  assert.deepEqual(braking.incorrect, []);
  assert.deepEqual(ramp.incorrect, [0]);
  assert.equal(ramp.correctCount, 2);
  assert.ok(brakingQuestions.every((q) => !rampQuestions.includes(q)));
});
