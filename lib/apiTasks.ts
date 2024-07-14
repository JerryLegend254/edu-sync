import { NewTask } from "@/type-declarations";
import { supabase } from "./supabase";

export async function getTasks(email: string) {
  const { data: profile, error: profileError } = await supabase
    .from("user_profiles")
    .select("user_id")
    .eq("email", email);
  if (profileError) {
    console.log(profileError.message);
    throw new Error("Error getting profile");
  }
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", profile[0].user_id);
  if (error) {
    console.log(error.message);
    throw new Error("Error getting tasks");
  }
  return data;
}

export async function addTask(task: NewTask) {
  const { data, error } = await supabase.from("tasks").insert([task]);

  if (error) {
    console.log(error.message);
    throw new Error("Error adding task");
  }
  return data;
}

export async function getSubTasks(taskId: number) {
  const { data, error } = await supabase
    .from("sub_tasks")
    .select("*")
    .eq("task_id", taskId);
  if (error) {
    console.log(error.message);
    throw new Error("Error getting subtasks");
  }
  return data;
}
