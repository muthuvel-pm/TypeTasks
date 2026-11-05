// app.ts – wires the typed model to the page
import { addTask, advanceTask, deleteTask, filterByStatus, countByStatus, } from "./model.js";
let tasks = [];
let filter = "all";
const FILTERS = ["all", "todo", "in-progress", "done"];
// Typed DOM access
const titleInput = document.getElementById("title");
const addBtn = document.getElementById("add");
const chipsEl = document.getElementById("chips");
const listEl = document.getElementById("list");
const emptyEl = document.getElementById("empty");
function handleAdd() {
    const title = titleInput.value.trim();
    if (!title)
        return;
    tasks = addTask(tasks, title);
    titleInput.value = "";
    titleInput.focus();
    render();
}
function renderChips() {
    chipsEl.replaceChildren();
    for (const f of FILTERS) {
        const count = f === "all" ? tasks.length : countByStatus(tasks, f);
        const chip = document.createElement("button");
        chip.className = f === filter ? "chip active" : "chip";
        chip.textContent = `${f} (${count})`;
        chip.onclick = () => {
            filter = f;
            render();
        };
        chipsEl.appendChild(chip);
    }
}
function renderList() {
    const visible = filter === "all" ? tasks : filterByStatus(tasks, filter);
    listEl.replaceChildren();
    emptyEl.hidden = visible.length > 0;
    for (const task of visible) {
        const li = document.createElement("li");
        li.className = `task ${task.status}`;
        const name = document.createElement("span");
        name.className = "name";
        name.textContent = task.title;
        const badge = document.createElement("span");
        badge.className = "badge";
        badge.textContent = task.status;
        li.append(name, badge);
        if (task.status !== "done") {
            const advance = document.createElement("button");
            advance.className = "btn";
            advance.textContent = task.status === "todo" ? "Start" : "Finish";
            advance.onclick = () => {
                tasks = advanceTask(tasks, task.id);
                render();
            };
            li.appendChild(advance);
        }
        const del = document.createElement("button");
        del.className = "btn del";
        del.textContent = "Delete";
        del.setAttribute("aria-label", `Delete ${task.title}`);
        del.onclick = () => {
            tasks = deleteTask(tasks, task.id);
            render();
        };
        li.appendChild(del);
        listEl.appendChild(li);
    }
}
function render() {
    renderChips();
    renderList();
}
addBtn.onclick = handleAdd;
titleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        handleAdd();
});
render();
//# sourceMappingURL=app.js.map