import BarContainer from "@/components/bar-container/bar-container";
import SafeArea from "@/components/safearea/safearea";
import Spacer from "@/components/spacer/spacer";
import COLORS from "@/constants/colors";
import { profilePicUrl } from "@/lib/utils-functions";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, TextInput, View } from "react-native";
import { Button } from "react-native-paper";

export default function ProfileSettings() {
  const { session } = useAuth();
  const router = useRouter();
  const [newEmail, setNewEmail] = useState(session?.user.email);
  const [newUsername, setNewUsername] = useState(
    session?.user.user_metadata.username,
  );

  return (
    <SafeArea>
      <BarContainer
        title="Profile Settings"
        icon="chevron-back"
        onPress={() => router.back()}
      />
      <Image style={styles.imageContainer} source={{ uri: profilePicUrl }} />
      <Spacer size={40} position="vertical" />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          style={styles.textInput}
          value={newEmail}
          onChangeText={setNewEmail}
        />
        <TextInput
          placeholder="Username"
          style={styles.textInput}
          value={newUsername}
          onChangeText={setNewUsername}
        />
        <Button
          textColor={COLORS.white}
          style={styles.button}
          onPress={() => {}}
        >
          Update Profile
        </Button>
      </View>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 12,
    padding: 12,
  },
  inputContainer: {
    gap: 16,
  },
  imageContainer: {
    alignSelf: "center",
    width: 156,
    height: 156,
    borderRadius: 78,
  },
  button: {
    backgroundColor: COLORS.purple,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});
