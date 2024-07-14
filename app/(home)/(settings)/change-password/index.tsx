import SafeArea from "@/components/safearea/safearea";
import { useRouter } from "expo-router";
import BarContainer from "@/components/bar-container/bar-container";
export default function ProfileSettings() {
  const router = useRouter();
  return (
    <SafeArea>
      <BarContainer
        title="Change Password"
        icon="chevron-back"
        onPress={() => router.back()}
      />
    </SafeArea>
  );
}
