export type Task = {
  task_id: number;
  title: string;
  category: number;
  description: string;
  priority: number;
  status: "completed" | "pending" | "in-progress";
  user_id: number;
  due_date: string;
};

export type NewTask = Omit<Task, "task_id">;

export type TaskCategory = {
  tc_id: number;
  title: string;
};
