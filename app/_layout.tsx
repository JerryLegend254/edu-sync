import { ToastProvider } from "react-native-toast-notifications";
import { Stack } from "expo-router";
import AuthProvider from "@/providers/AuthProvider";
import ProtectedScreensContextProvider from "@/providers/ProtectedRoutes";
export default function Layout() {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProtectedScreensContextProvider>
          <Stack
            initialRouteName="index"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="index" />
          </Stack>
        </ProtectedScreensContextProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
