// Pure task-list logic, shared by the page (window.Tasks) and the tests (require).
(function (root) {
  function addTask(tasks, title) {
    const t = String(title).trim();
    if (!t) return tasks;
    return [...tasks, { id: tasks.length ? Math.max(...tasks.map((x) => x.id)) + 1 : 1, title: t, done: false }];
  }
  function toggleTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
  }
  const api = { addTask, toggleTask };
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Tasks = api;
})(typeof window !== "undefined" ? window : globalThis);
