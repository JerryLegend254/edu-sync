import { StyleSheet, View } from "react-native";
import SafeArea from "@/components/safearea/safearea";
import BarContainer from "@/components/bar-container/bar-container";
import { useRouter } from "expo-router";
import Spacer from "@/components/spacer/spacer";
import { Chip, FAB } from "react-native-paper";
import COLORS from "@/constants/colors";

const myCategories = [
  "Automata Theory and Computability",
  "Operations Research",
  "Maisha Gents 5",
  "Advanced Database Management Systems",
  "ICS Project",
  "Microprocessors",
  "French 3",
  "Human Computer Interaction",
];

export default function MyCategories() {
  const router = useRouter();
  return (
    <SafeArea>
      <BarContainer
        title="My Categories"
        icon="chevron-back"
        onPress={() => router.back()}
      />
      <Spacer size={40} position="vertical" />
      <View style={styles.chipContainer}>
        {myCategories.map((c) => (
          <Chip style={styles.chip} key={c}>
            {c}
          </Chip>
        ))}
      </View>
      <FAB style={styles.fab} icon="plus" onPress={() => {}} />
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.purple,
  },
  chipContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  text: { fontSize: 16, fontWeight: "600" },
  chip: {
    padding: 8,
    backgroundColor: COLORS.purple,
  },
});
