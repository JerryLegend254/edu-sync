import BarContainer from "@/components/bar-container/bar-container";
import SafeArea from "@/components/safearea/safearea";
import { useRouter } from "expo-router";

export default function ProfileSettings() {
  const router = useRouter();
  return (
    <SafeArea>
      <BarContainer
        title="Profile Settings"
        icon="chevron-back"
        onPress={() => router.back()}
      />
    </SafeArea>
  );
}
