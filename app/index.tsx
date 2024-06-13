import { useRouter } from "expo-router";
import { View } from "react-native";
import { OnboardFlow } from "react-native-onboard";
export default function OnboardingScreen() {
  const router = useRouter();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <OnboardFlow
        onDone={() => router.push("(auth)/sign-in")}
        pages={[
          {
            title: "Form effective study groups",
            imageUri:
              "https://cdni.iconscout.com/illustration/premium/thumb/online-group-study-4373387-3626456.png",
            subtitle:
              "Join forces with classmates to enhance understanding and retention of course material. Share insights and tackle challenging concepts together.",
          },
          {
            title: "Organize your tasks and get productive",
            imageUri:
              "https://img.freepik.com/free-vector/organizing-projects-concept-illustration_114360-632.jpg",
            subtitle:
              "Manage assignments, projects, and daily tasks with ease. Prioritize your workload and track your progress for increased productivity.",
          },
          {
            title: "Get deadline reminders for tasks",
            imageUri:
              "https://cdni.iconscout.com/illustration/premium/thumb/businessman-is-meeting-deadline-10186303-8243444.png?f=webp",

            subtitle:
              "Keep track of important deadlines with automatic notifications. Focus on completing tasks without the stress of forgetting due dates.",
          },
        ]}
        type={"fullscreen"}
      />
    </View>
  );
}
