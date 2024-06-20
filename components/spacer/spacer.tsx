import { View } from "react-native";

function getVariant(position: "horizontal" | "vertical", size: number) {
  if (position === "horizontal") {
    return { width: size };
  } else {
    return { height: size };
  }
}

export default function Spacer({
  position,
  size,
}: {
  position: "horizontal" | "vertical";
  size: number;
}) {
  return <View style={getVariant(position, size)}></View>;
}
