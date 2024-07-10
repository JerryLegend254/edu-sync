import { Session } from "@supabase/supabase-js";
import axios from "axios";
export async function getCurrentUser(authDetails: any) {
  return await axios
    .post(`${process.env.EXPO_PUBLIC_API_URL}/user`, authDetails)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: error.message, success: false };
    });
}

export async function getUserTasks(session: Session) {
  axios
    .get(`${process.env.EXPO_PUBLIC_API_URL}/tasks`, {
      headers: { AT: session?.access_token },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return { error: error.message, success: false };
    });
}
