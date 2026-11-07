// Renders the list and wires the form. State lives in the page (one list per visit).
let tasks = [];
const list = document.getElementById("tasks");
const form = document.getElementById("add-form");
const input = document.getElementById("new-task");

function render() {
  list.replaceChildren(
    ...tasks.map((t) => {
      const li = document.createElement("li");
      const label = document.createElement("label");
      const box = document.createElement("input");
      box.type = "checkbox";
      box.checked = t.done;
      box.addEventListener("change", () => {
        tasks = window.Tasks.toggleTask(tasks, t.id);
        render();
      });
      const text = document.createElement("span");
      text.textContent = t.title;
      if (t.done) text.className = "done";
      label.append(box, " ", text);
      li.append(label);
      return li;
    }),
  );
  document.getElementById("empty").hidden = tasks.length > 0;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  tasks = window.Tasks.addTask(tasks, input.value);
  input.value = "";
  render();
});
render();
