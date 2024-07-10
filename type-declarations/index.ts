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
