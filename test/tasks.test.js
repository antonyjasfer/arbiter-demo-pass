const test = require("node:test");
const assert = require("node:assert/strict");
const { addTask, toggleTask } = require("../public/tasks.js");

test("adding a task appends it, not done", () => {
  const t = addTask([], "Buy milk");
  assert.deepEqual(t, [{ id: 1, title: "Buy milk", done: false }]);
});

test("a blank title adds nothing", () => {
  assert.deepEqual(addTask([], "   "), []);
});

test("toggling a task marks it done", () => {
  const t = toggleTask(addTask([], "Buy milk"), 1);
  assert.equal(t[0].done, true);
});
