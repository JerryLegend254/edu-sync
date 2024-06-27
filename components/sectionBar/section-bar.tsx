import { Text, TouchableOpacity, View } from "react-native";

type SectionBarProps = {
  leftText: string;
  rightText: string;
  onPress: () => void;
};
export default function SectionBar({
  leftText,
  rightText,
  onPress,
}: SectionBarProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "700" }}>{leftText}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={{ fontWeight: "700" }}>{rightText}</Text>
      </TouchableOpacity>
    </View>
  );
}

export function Section({ children }: { children: React.ReactNode }) {
  return <View style={{ gap: 16 }}>{children}</View>;
}
