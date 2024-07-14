import { supabase } from "./supabase";

export async function getStudyMaterials() {
  const { data, error } = await supabase.from("study_materials").select("*");
  if (error) {
    console.log(error.message);
    throw new Error("Error getting study materials");
  }
  return data;
}
