import { Text, View } from "react-native";
import SafeArea from "@/components/safearea/safearea";
import { Ionicons } from "@expo/vector-icons";
import ProfileSettingsCard from "@/components/profile/profile-settings-card";
import Spacer from "@/components/spacer/spacer";
import { Button } from "react-native-paper";
import { useAuth } from "@/providers/AuthProvider";

export default function SettingsScreen() {
  const { signOut, user } = useAuth();
  return (
    <SafeArea>
      <View style={{ alignItems: "center", gap: 16 }}>
        <View
          style={{
            height: 124,
            width: 124,
            backgroundColor: "gray",
            borderRadius: 124,
            alignSelf: "center",
          }}
        ></View>
        <View
          style={{
            alignItems: "center",
            gap: 16,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "700" }}>{user?.email}</Text>
          <Ionicons name="checkmark-circle-outline" size={24} color="black" />
        </View>
      </View>
      <Spacer position="vertical" size={56} />
      <View style={{ gap: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Account Settings
        </Text>
        <ProfileSettingsCard
          icon="person-outline"
          title="Profile Settings"
          subtitle="Update and modify your profile"
          onPress={() => {}}
        />
        <ProfileSettingsCard
          icon="notifications-outline"
          title="Notification Settings"
          subtitle="Change your notification settings"
          onPress={() => {}}
        />
        <ProfileSettingsCard
          icon="key-outline"
          title="Change Password"
          subtitle="Update your account password"
          onPress={() => {}}
        />
      </View>
      <Spacer position="vertical" size={40} />
      <View style={{ gap: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          Customization Settings
        </Text>
        <ProfileSettingsCard
          icon="folder-open-outline"
          title="My Categories"
          subtitle="Personalize your categories"
          onPress={() => {}}
        />
        <Button onPress={signOut}>Sign Out</Button>
      </View>
    </SafeArea>
  );
}
