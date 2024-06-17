import SafeArea from "@/components/safearea/safearea";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";
import { Text } from "react-native";
import { Button } from "react-native-paper";
import { useToast } from "react-native-toast-notifications";

export default function SettingsScreen() {
  const toast = useToast();
  return (
    <SafeArea>
      <Text>SettingsScreen</Text>
      <Button
        onPress={() => {
          supabase.auth.signOut();
          toast.show("Logged out successfully", {
            type: "success",
            placement: "top",
          });
        }}
      >
        Logout
      </Button>
    </SafeArea>
  );
}
