import { SafeAreaView, Text, StatusBar } from "react-native";

export default function Home() {
  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      <Text>Home</Text>
    </SafeAreaView>
  );
}
