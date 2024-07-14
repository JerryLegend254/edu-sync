import { View, Text, TouchableOpacity } from "react-native";
import IconContainer from "../iconContainer/icon-container";
import { FONT_SIZE, FONT_WEIGHT } from "@/constants/fonts";
import { Ionicons } from "@expo/vector-icons";

type BarContainerProps = {
  onPress: () => void;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function BarContainer({
  onPress,
  title,
  icon,
}: BarContainerProps) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
      <TouchableOpacity onPress={onPress}>
        <IconContainer icon={icon} />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: FONT_SIZE.extraLarge,
          fontWeight: FONT_WEIGHT.bold,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
