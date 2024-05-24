import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Text, View } from "react-native";
export default function CustomDrawerComponent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 16,
          marginHorizontal: 20,
          marginVertical: 10,
        }}
      >
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: 56,
            backgroundColor: "gray",
          }}
        ></View>
        <View>
          <Text style={{ color: "white" }}>Jeremy Okuto</Text>
          <Text style={{ color: "#d1d3d4" }}>jeremy@gmail.com</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}
