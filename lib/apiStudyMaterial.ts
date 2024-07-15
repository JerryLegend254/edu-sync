import { NewStudyMaterial } from "@/type-declarations";
import { supabase } from "./supabase";

export async function getStudyMaterials() {
  const { data, error } = await supabase.from("study_materials").select("*");
  if (error) {
    console.log(error.message);
    throw new Error("Error getting study materials");
  }
  return data;
}

export async function addStudyMaterial(studyMaterial: NewStudyMaterial) {
  const { data, error } = await supabase
    .from("study_materials")
    .insert([studyMaterial]);

  if (error) {
    console.log(error.message);
    throw new Error("Error adding study material");
  }
  return data;
}
