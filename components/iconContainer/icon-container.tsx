import COLORS from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
type IconContainerProps = {
  icon: keyof typeof Ionicons.glyphMap;
};
export default function IconContainer({ icon }: IconContainerProps) {
  return (
    <View
      style={{
        backgroundColor: COLORS.ocean,
        height: 44,
        width: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
      }}
    >
      <Ionicons name={icon} size={24} />
    </View>
  );
}
