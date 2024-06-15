import { ToastProvider } from "react-native-toast-notifications";
import { Stack } from "expo-router";
import AuthProvider from "@/providers/AuthProvider";
export default function Layout() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </AuthProvider>
    </ToastProvider>
  );
}
