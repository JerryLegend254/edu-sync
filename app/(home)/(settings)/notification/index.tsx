import BarContainer from "@/components/bar-container/bar-container";
import SafeArea from "@/components/safearea/safearea";
import Spacer from "@/components/spacer/spacer";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from "react-native-paper";

export default function NotificationSettings() {
  const [recieveNotifications, setRecieveNotifications] = useState(true);
  const router = useRouter();
  return (
   
    <SafeArea>
    <BarContainer
      title="Notification Settings"
      icon="chevron-back"
      onPress={() => router.back()}
    />
    <Spacer size={40} position="vertical" />
    <View style={styles.container}>
      <Text style={styles.text}>Recieve Notifications</Text>
      <Switch
        value={recieveNotifications}
        onValueChange={() => setRecieveNotifications(!recieveNotifications)}
      />
    </View>
  </SafeArea>
);
}

const styles = StyleSheet.create({
container: { flexDirection: "row", justifyContent: "space-between" },
text: { fontSize: 16, fontWeight: "600" },
});