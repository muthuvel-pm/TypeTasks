// model.ts

// A status can only ever be one of these three exact strings.
export type TaskStatus = "todo" | "in-progress" | "done";

// Every Task must have this exact shape.
export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
}

// Add a new task, always starting as "todo". The id is max id + 1, so it stays unique even after deletions.
export function addTask(tasks: Task[], title: string): Task[] {
  let maxId = -Infinity;
  for (const task of tasks) {
    maxId = Math.max(maxId, task.id);
  }
  const nextId = tasks.length > 0 ? maxId + 1 : 1;
  const newTask: Task = { id: nextId, title, status: "todo" };
  return [...tasks, newTask];
}

// Mark the task with the matching id as done.
export function completeTask(tasks: Task[], id: number): Task[] {
  return tasks.map((t): Task => (t.id === id ? { ...t, status: "done" } : t));
}

// Return only the tasks matching a given status.
export function filterByStatus(tasks: Task[], status: TaskStatus): Task[] {
  return tasks.filter((t) => t.status === status);
}

// ---------- Extra operations (your own additions) ----------

// Remove the task with the matching id.
export function deleteTask(tasks: Task[], id: number): Task[] {
  return tasks.filter((t) => t.id !== id);
}

// Move a task one step forward: todo -> in-progress -> done.
export function advanceTask(tasks: Task[], id: number): Task[] {
  const nextStatus: Record<TaskStatus, TaskStatus> = {
    "todo": "in-progress",
    "in-progress": "done",
    "done": "done",
  };
  return tasks.map((t): Task =>
    t.id === id ? { ...t, status: nextStatus[t.status] } : t
  );
}

// Count how many tasks have a given status.
export function countByStatus(tasks: Task[], status: TaskStatus): number {
  return filterByStatus(tasks, status).length;
}