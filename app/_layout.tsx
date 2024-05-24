import { Drawer } from "expo-router/drawer";
import { Ionicons } from "@expo/vector-icons";
import CustomDrawerComponent from "@/components/CustomDrawerComponent";
export default function App() {
  return (
    <Drawer
      screenOptions={{
        drawerStyle: { backgroundColor: "#6759FF" },
        drawerLabelStyle: { marginLeft: -20 },
        drawerActiveBackgroundColor: "#fff",
        drawerActiveTintColor: "#6759FF",
        drawerInactiveTintColor: "#fff",
        drawerItemStyle: { marginHorizontal: 20 },
        headerShown: false,
      }}
      drawerContent={CustomDrawerComponent}
    >
      <Drawer.Screen
        name="(home)"
        options={{
          drawerLabel: "Home",
          title: "Home",
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer>
  );
}
