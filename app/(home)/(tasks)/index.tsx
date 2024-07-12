import SafeArea from "@/components/safearea/safearea";
import { useQuery } from "@tanstack/react-query";
import { Text, View, StyleSheet, FlatList } from "react-native";
import Spacer from "@/components/spacer/spacer";
import { ProgressBar } from "react-native-paper";
import COLORS from "@/constants/colors";
import { truncateString } from "@/lib/utils-functions";
import { FONT_SIZE, FONT_WEIGHT } from "@/constants/fonts";

export default function Tasks() {
  const { data: tasks, error } = useQuery({
    queryKey: ["myTasks"],
  });
  if (error) {
    console.log(error);
  }
  return (
    <SafeArea>
      <Text
        style={{ fontSize: FONT_SIZE.extraLarge, fontWeight: FONT_WEIGHT.bold }}
      >
        Tasks
      </Text>
      <Spacer position="vertical" size={16} />
      <View>
        <FlatList
          contentContainerStyle={{ justifyContent: "space-between" }}
          columnWrapperStyle={{ gap: 8 }}
          data={tasks || []}
          keyExtractor={(item, index) => item.task_id.toString()}
          ItemSeparatorComponent={() => <Spacer position="vertical" size={8} />}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  padding: 16,
                  gap: 8,
                  backgroundColor: COLORS.blue,
                  flex: 0.5,
                  borderRadius: 24,
                }}
              >
                <Text style={[{ color: "white" }, styles.smallText]}>
                  {item.status}
                </Text>
                <Text style={styles.whiteBoldText}>
                  {truncateString(item.title, 20)}
                </Text>
                <Text style={[styles.whiteBoldText, styles.largeText]}>
                  Web Design
                </Text>
                <Text style={styles.whiteBoldText}>One more week</Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 8,
                      backgroundColor: "red",
                    }}
                  ></View>
                  <Text style={{ color: "white" }}>High Priority</Text>
                </View>
                <Spacer position="vertical" size={8} />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ width: "75%" }}>
                    <ProgressBar progress={0.5} color="blue" />
                  </View>
                  <Text style={styles.whiteBoldText}>50%</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeArea>
  );
}
const styles = StyleSheet.create({
  whiteBoldText: {
    fontWeight: "700",
    color: "white",
  },
  smallText: {
    fontSize: 12,
  },
  largeText: {
    fontSize: 16,
  },
});