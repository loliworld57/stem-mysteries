import assert from "node:assert/strict";
import test from "node:test";
import { gradeQuiz } from "../lib/quiz.ts";

const questions = [
  { topic: "A", question: "A", options: ["A", "B"], correct: 0 },
  { topic: "B", question: "B", options: ["A", "B"], correct: 1 },
  { topic: "C", question: "C", options: ["A", "B"], correct: 0 },
];

test("chấm cả bài và liệt kê đúng các câu sai", () => {
  const result = gradeQuiz(questions, [0, 0, 1]);
  assert.equal(result.correctCount, 1);
  assert.deepEqual(result.incorrect, [1, 2]);
  assert.ok(Math.abs(result.score - 10 / 3) < 1e-10);
});

test("điểm đầy đủ và điểm không có câu đúng", () => {
  assert.equal(gradeQuiz(questions, [0, 1, 0]).score, 10);
  assert.equal(gradeQuiz(questions, [1, 0, 1]).score, 0);
});

test("kết quả không chứa đáp án đúng hay lời giải", () => {
  assert.deepEqual(Object.keys(gradeQuiz(questions, [1, 0, 1])).sort(), [
    "correctCount",
    "incorrect",
    "score",
  ]);
});
