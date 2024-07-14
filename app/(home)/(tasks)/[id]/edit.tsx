import BarContainer from "@/components/bar-container/bar-container";
import SafeArea from "@/components/safearea/safearea";
import { useRouter } from "expo-router";
export default function EditTask() {
  const router = useRouter();
  return (
    <SafeArea>
      <BarContainer
        title="Edit Task"
        onPress={() => router.back()}
        icon="chevron-back"
      />
    </SafeArea>
  );
}
