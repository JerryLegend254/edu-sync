import { SafeAreaView } from "react-native";
export default function SafeArea({ children }: { children: React.ReactNode }) {
  return <SafeAreaView>{children}</SafeAreaView>;
}
