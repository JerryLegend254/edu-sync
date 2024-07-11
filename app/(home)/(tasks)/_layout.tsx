import { Stack } from "expo-router";
export default function TasksLayout() {
  return (
    <Stack initialRouteName="(tasks)" screenOptions={{ headerShown: false }} />
  );
}
