import { useAuth } from "@/providers/AuthProvider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { user } = useAuth();
  if (user?.user) {
    return <Redirect href="(home)" />;
  } else {
    return <Stack screenOptions={{ headerShown: false }} />;
  }
}
