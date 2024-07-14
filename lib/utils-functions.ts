import { Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import * as FileSystem from "expo-file-system";
import { shareAsync } from "expo-sharing";

export const fileImageUrl =
  "https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png";
export const profilePicUrl =
  "https://aexdpglqmaqjmvwiqahg.supabase.co/storage/v1/object/public/photo_dps/d1586058-eed3-4e4e-8a23-4c2da2da1ca0/profile-picd1586058-eed3-4e4e-8a23-4c2da2da1ca0.jpg";
export async function getCurrUserProfile(session: Session | null) {
  if (!session) {
    return { error: "No session found", data: null };
  }
  const { email } = session?.user;
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", email)
    .single();
  if (error) {
    return { error: error.message, data: null };
  }
  return { data, error: null };
}

export function truncateString(str: string, num: number) {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + "...";
}

export function rankTaskPriority(priority: number) {
  if (priority <= 3) {
    return "Low Priority";
  } else if (priority <= 5) {
    return "Medium Priority";
  } else if (priority <= 7) {
    return "High Priority";
  }
  return "Critical";
}

export function getCategoryTitle(categories: any, id: number) {
  return categories?.find((category: any) => category.tc_id === id)?.title;
}

export async function downloadStudyMaterial(url: string) {
  const { data, error } = await supabase.storage
    .from("study_material")
    .download(url);
  if (error) {
    console.error("Error downloading material:", error);
  } else if (data) {
    try {
      return new Promise<string>((resolve, reject) => {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = function () {
          resolve(fr.result as string);
        };
        fr.onerror = function () {
          reject("error");
        };
      });
    } catch (error) {
      console.error("Error reading image:", error);
    }
  } else {
    console.error("No data or error returned");
  }
}

export async function downloadFromUrl(url: string, fileName: string) {
  const result = await FileSystem.downloadAsync(
    url,
    FileSystem.documentDirectory + `${fileName}.pdf`,
  );
  save(result.uri);
}

function save(uri: string) {
  shareAsync(uri);
}
