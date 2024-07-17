import SafeArea from "@/components/safearea/safearea";
import { useRouter } from "expo-router";
import BarContainer from "@/components/bar-container/bar-container";
import { View, StyleSheet, TextInput } from "react-native";
import COLORS from "@/constants/colors";
import Spacer from "@/components/spacer/spacer";
import { Button } from "react-native-paper";
export default function ProfileSettings() {
  const router = useRouter();
  return (
    <SafeArea>
      <BarContainer
        title="Change Password"
        icon="chevron-back"
        onPress={() => router.back()}
      />
      <Spacer size={40} position="vertical" />
      <View style={styles.inputContainer}>
        <TextInput placeholder="Old Password" style={styles.textInput} />
        <TextInput placeholder="New Password" style={styles.textInput} />
        <TextInput
          placeholder="Confirm New Password"
          style={styles.textInput}
        />
        <Button
          textColor={COLORS.white}
          style={styles.button}
          onPress={() => {}}
        >
          Change Password
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
  button: {
    backgroundColor: COLORS.purple,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
});