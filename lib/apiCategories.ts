import { supabase } from "./supabase";

export async function getCategories() {
  const { data, error } = await supabase.from("task_categories").select("*");
  if (error) {
    console.log(error.message);
    throw new Error("Error getting categories");
  }
  return data;
}
