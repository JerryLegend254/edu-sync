import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ProfileSettingsCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  onPress: () => void;
};

export default function ProfileSettingsCard({
  icon,
  title,
  subtitle,
  onPress,
}: ProfileSettingsCardProps) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 12,
        elevation: 20,
        shadowColor: "black",
      }}
      onPress={onPress}
    >
      <View
        style={{
          backgroundColor: "#B2C3E4",
          height: 44,
          width: 44,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
        }}
      >
        <Ionicons name={icon} size={24} />
      </View>
      <View style={{ flexGrow: 1 }}>
        <Text style={{ fontSize: 16, fontWeight: "700" }}>{title}</Text>
        <Text style={{ fontSize: 14, color: "#8094BC" }}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="black" />
    </TouchableOpacity>
  );
}
