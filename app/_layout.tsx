import { ToastProvider } from "react-native-toast-notifications";
import { Stack } from "expo-router";
import AuthProvider from "@/providers/AuthProvider";
import ProtectedScreensContextProvider from "@/providers/ProtectedRoutes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
