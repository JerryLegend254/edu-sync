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

export type StudyMaterial = {
  sm_id: number;
  title: string;
  created_by: number;
  description: string;
  url: string;
  keywords: string;
};

export type NewStudyMaterial = Omit<StudyMaterial, "sm_id">;

export type SubTask = {
  id: number;
  task_id: number;
  title: string;
  completed: boolean;
};

export type NewSubTask = Omit<SubTask, "id">;
