// model.ts
// Add a new task, always starting as "todo". The id is max id + 1, so it stays unique even after deletions.
export function addTask(tasks, title) {
    let maxId = -Infinity;
    for (const task of tasks) {
        maxId = Math.max(maxId, task.id);
    }
    const nextId = tasks.length > 0 ? maxId + 1 : 1;
    const newTask = { id: nextId, title, status: "todo" };
    return [...tasks, newTask];
}
// Mark the task with the matching id as done.
export function completeTask(tasks, id) {
    return tasks.map((t) => (t.id === id ? { ...t, status: "done" } : t));
}
// Return only the tasks matching a given status.
export function filterByStatus(tasks, status) {
    return tasks.filter((t) => t.status === status);
}
// ---------- Extra operations (your own additions) ----------
// Remove the task with the matching id.
export function deleteTask(tasks, id) {
    return tasks.filter((t) => t.id !== id);
}
// Move a task one step forward: todo -> in-progress -> done.
export function advanceTask(tasks, id) {
    const nextStatus = {
        "todo": "in-progress",
        "in-progress": "done",
        "done": "done",
    };
    return tasks.map((t) => t.id === id ? { ...t, status: nextStatus[t.status] } : t);
}
// Count how many tasks have a given status.
export function countByStatus(tasks, status) {
    return filterByStatus(tasks, status).length;
}
//# sourceMappingURL=model.js.map