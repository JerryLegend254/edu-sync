import SafeArea from "@/components/safearea/safearea";
import SectionBar, { Section } from "@/components/sectionBar/section-bar";
import Spacer from "@/components/spacer/spacer";
import COLORS from "@/constants/colors";
import { FONT_SIZE, FONT_WEIGHT } from "@/constants/fonts";
import { getTasks } from "@/lib/apiTasks";
import { profilePicUrl, truncateString } from "@/lib/utils-functions";
import { useAuth } from "@/providers/AuthProvider";
import { Task } from "@/type-declarations";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProgressBar } from "react-native-paper";

export default function Home() {
  const { session } = useAuth();
  const { data, error } = useQuery({
    queryKey: ["myTasks"],
    queryFn: async () => {
      if (!session?.user.email) {
        return;
      }
      return await getTasks(session?.user.email);
    },
  });
  if (error) {
    console.log(error);
  }
  const router = useRouter();

  return (
    <SafeArea>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Image
            style={{ width: 56, height: 56, borderRadius: 56 }}
            source={{
              uri: profilePicUrl,
            }}
          />
          <View>
            <Text style={{ fontSize: 24, fontWeight: "700" }}>
              Welcome Back!
            </Text>
          </View>
        </View>
      </View>
      <Spacer position="vertical" size={40} />
      <View>
        <SectionBar
          leftText="Recent Activity"
          rightText="See More"
          onPress={() => {}}
        />
        <Spacer position="vertical" size={16} />
        <View style={{ columnGap: 6, flexDirection: "row" }}>
          <View style={{ flex: 0.5, rowGap: 6 }}>
            <View
              style={{
                flexDirection: "row",
                padding: 16,
                borderRadius: 24,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: COLORS.gray,
              }}
            >
              <View>
                <Text style={[styles.whiteBoldText, styles.largeText]}>
                  Task Project
                </Text>
                <Text style={{ color: "white", fontSize: 12 }}>20/17</Text>
              </View>
              <View
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderColor: "white",
                }}
              >
                <Text style={styles.whiteBoldText}>75%</Text>
              </View>
            </View>

            <View
              style={{
                padding: 16,
                gap: 8,
                backgroundColor: COLORS.blue,
                borderRadius: 24,
              }}
            >
              <Text style={[{ color: "white" }, styles.smallText]}>
                Design Sprint
              </Text>
              <Text style={styles.whiteBoldText}>MONEEQ</Text>
              <Text style={[styles.whiteBoldText, styles.largeText]}>
                Web Design
              </Text>
              <Text style={styles.whiteBoldText}>One more week</Text>
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
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
          </View>

          <View style={{ flex: 0.5, rowGap: 6 }}>
            <View
              style={{
                flex: 0.5,
                padding: 16,
                gap: 8,
                backgroundColor: COLORS.orange,
                borderRadius: 24,
              }}
            >
              <Text style={styles.whiteBoldText}>MONEEQ</Text>
              <Text style={[styles.whiteBoldText, styles.largeText]}>
                Web Design
              </Text>
              <Text style={styles.whiteBoldText}>One more week</Text>
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

            <View
              style={{
                flex: 0.5,
                padding: 16,
                gap: 8,
                backgroundColor: COLORS.purple,
                borderRadius: 24,
              }}
            >
              <Text style={styles.whiteBoldText}>MONEEQ</Text>
              <Text style={[styles.whiteBoldText, styles.largeText]}>
                Web Design
              </Text>
              <Text style={styles.whiteBoldText}>One more week</Text>

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
          </View>
        </View>
        <Spacer position="vertical" size={40} />
        <View>
          <SectionBar
            leftText="Top Adventure Missions!"
            rightText="See More"
            onPress={() => router.push("(tasks)")}
          />
          <Spacer position="vertical" size={16} />
          <View style={{ gap: 6 }}>
            {data
              ?.sort((a, b) => b.task_id - a.task_id)
              .slice(0, 3)
              .map((task: Task) => (
                <TouchableOpacity
                  key={task.task_id}
                  style={{
                    padding: 12,
                    backgroundColor: COLORS.light_blue,
                    borderRadius: 16,
                  }}
                  onPress={() =>
                    router.push({
                      pathname: `/(tasks)/${task.task_id}`,
                      params: task,
                    })
                  }
                >
                  <Text
                    style={{
                      textTransform: "capitalize",
                      fontSize: 16,
                      fontWeight: "700",
                      color: COLORS.white,
                    }}
                  >
                    {truncateString(task.title, 42)}
                  </Text>
                  <Spacer position="vertical" size={4} />
                  <View
                    style={{
                      justifyContent: "flex-start",
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: FONT_SIZE.small,
                        textTransform: "capitalize",
                        padding: 4,
                        fontWeight: FONT_WEIGHT.medium,
                        borderRadius: 8,
                        backgroundColor: `${task.status === "pending" ? COLORS.light_red : task.status === "in-progress" ? COLORS.yellow : COLORS.green}`,
                      }}
                    >
                      {task.status}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </View>
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
