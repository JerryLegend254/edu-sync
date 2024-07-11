import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native";
export default function SafeArea({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaView
      style={{
        paddingTop: StatusBar.currentHeight,
        backgroundColor: "#fff",
        flex: 1,
      }}
    >
      <View style={{ padding: 24, flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
}
