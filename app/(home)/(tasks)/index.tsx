import SafeArea from "@/components/safearea/safearea";
import { useQuery } from "@tanstack/react-query";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Spacer from "@/components/spacer/spacer";
import { FAB, ProgressBar } from "react-native-paper";
import COLORS from "@/constants/colors";
import {
  getCategoryTitle,
  humanizeDateDiff,
  rankTaskPriority,
  truncateString,
} from "@/lib/utils-functions";
import { FONT_SIZE, FONT_WEIGHT } from "@/constants/fonts";
import { useRouter } from "expo-router";
import { Task, TaskCategory } from "@/type-declarations";
import { getCategories } from "@/lib/apiCategories";

export default function Tasks() {
  const router = useRouter();
  const { data: tasks, error: TaskError } = useQuery({
    queryKey: ["myTasks"],
  });
  if (TaskError) {
    console.log(TaskError);
  }
  const { data: categories, error: categoryError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  if (categoryError) {
    console.log(categoryError);
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
          data={(tasks as Task[]) || []}
          keyExtractor={(item) => item.task_id.toString()}
          ItemSeparatorComponent={() => <Spacer position="vertical" size={8} />}
          numColumns={2}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: `(tasks)/${item.task_id}`,
                    params: item,
                  })
                }
                style={{
                  padding: 16,
                  gap: 8,
                  backgroundColor: COLORS.blue,
                  flex: 0.5,
                  borderRadius: 24,
                }}
              >
                <Text
                  style={[
                    {
                      color: "white",
                      alignSelf: "flex-start",
                      padding: 6,
                      borderRadius: 12,
                      fontWeight: FONT_WEIGHT.bold,
                      backgroundColor: `${item.status === "pending" ? COLORS.orange : item.status === "in-progress" ? COLORS.yellow : COLORS.green}`,
                    },
                    styles.smallText,
                  ]}
                >
                  {item.status}
                </Text>
                <Text style={styles.whiteBoldText}>
                  {truncateString(item.title, 20)}
                </Text>
                <Text style={[styles.whiteBoldText, styles.largeText]}>
                  {getCategoryTitle(categories, item.category)}
                </Text>
                <Text style={styles.whiteBoldText}>
                  {humanizeDateDiff(item.due_date)}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 6,
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: 8,
                      width: 8,
                      borderRadius: 8,
                      backgroundColor: `${item.priority <= 3 ? COLORS.green : item.priority <= 5 ? COLORS.yellow : item.priority <= 7 ? COLORS.orange : COLORS.red}`,
                    }}
                  ></View>
                  <Text style={{ color: "white" }}>
                    {rankTaskPriority(item.priority)}
                  </Text>
                </View>
                <Spacer position="vertical" size={8} />
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <FAB
        onPress={() => router.push("(tasks)/add")}
        color={COLORS.white}
        icon="plus"
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          backgroundColor: COLORS.purple,
        }}
      />
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
