import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native";
export default function SafeArea({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView style={{ marginTop: StatusBar.currentHeight }}>
      <View style={{ padding: 24 }}>{children}</View>
    </SafeAreaView>
  );
}
