import IconContainer from "@/components/iconContainer/icon-container";
import SafeArea from "@/components/safearea/safearea";
import COLORS from "@/constants/colors";
import { FONT_SIZE, FONT_WEIGHT } from "@/constants/fonts";
import { getCategories } from "@/lib/apiCategories";
import { getCategoryTitle, rankTaskPriority } from "@/lib/utils-functions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, Checkbox, Divider, Modal, Portal } from "react-native-paper";
import { addEventToCalendar } from "./add";
import moment from "moment";
import { getSubTasks } from "@/lib/apiTasks";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function TaskDetail() {
  const router = useRouter();
  const task = useLocalSearchParams();
  const queryClient = useQueryClient();
  const { data: subTasks, error: FetchingSubTaskError } = useQuery({
    queryKey: ["subtasks"],
    queryFn: async () => {
      return await getSubTasks(parseInt(task.id));
    },
  });
  if (FetchingSubTaskError) {
    console.log(FetchingSubTaskError);
  }
  const { data: categories, error: categoryErr } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  if (categoryErr) {
    console.log(categoryErr);
  }
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20, margin: 24 };
  return (
    <SafeArea>
      <View style={{ gap: 16 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <TouchableOpacity onPress={() => router.push("(tasks)")}>
            <IconContainer icon="chevron-back" />
          </TouchableOpacity>
          <Text
            style={{ fontSize: FONT_SIZE.large, fontWeight: FONT_WEIGHT.bold }}
          >
            Task Details
          </Text>
        </View>
        <View>
          <Text
            style={{ fontSize: FONT_SIZE.large, fontWeight: FONT_WEIGHT.bold }}
          >
            {task.title}
          </Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FONT_SIZE.large,
              fontWeight: FONT_WEIGHT.semiBold,
            }}
          >
            Category
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZE.medium,
              fontWeight: FONT_WEIGHT.semiBold,
            }}
          >
            {getCategoryTitle(categories, parseInt(task.category))}
          </Text>
        </View>
        <Divider />
        <View>
          <Text
            style={{
              fontSize: FONT_SIZE.large,
              fontWeight: FONT_WEIGHT.semiBold,
            }}
          >
            Description
          </Text>
          <Text style={{ fontSize: FONT_SIZE.medium }}>{task.description}</Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FONT_SIZE.large,
              fontWeight: FONT_WEIGHT.semiBold,
            }}
          >
            Due Date
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZE.medium,
              fontWeight: FONT_WEIGHT.semiBold,
            }}
          >
            {new Date(task.due_date?.toString() || "").toDateString()}
          </Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FONT_SIZE.large,
              fontWeight: FONT_WEIGHT.semiBold,
            }}
          >
            Status
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZE.medium,
              fontWeight: FONT_WEIGHT.semiBold,
              color: COLORS.white,
              backgroundColor: `${task.status === "pending" ? COLORS.light_red : task.status === "in-progress" ? COLORS.yellow : COLORS.green}`,
              paddingHorizontal: 8,
              paddingVertical: 6,
              textTransform: "capitalize",
              borderRadius: 12,
            }}
          >
            {task.status}
          </Text>
        </View>
        <Divider />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FONT_SIZE.large,
              fontWeight: FONT_WEIGHT.semiBold,
            }}
          >
            Priority
          </Text>
          <Text
            style={{
              fontSize: FONT_SIZE.medium,
              fontWeight: FONT_WEIGHT.semiBold,
              color: `${task.priority <= 3 ? COLORS.green : task.priority <= 5 ? COLORS.yellow : task.priority <= 7 ? COLORS.orange : COLORS.red}`,
            }}
          >
            {rankTaskPriority(task.priority)}
          </Text>
        </View>
        <Divider />
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}
          >
            <Text>Example Modal. Click outside this area to dismiss.</Text>
          </Modal>
        </Portal>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: FONT_SIZE.large,
              fontWeight: FONT_WEIGHT.semiBold,
            }}
          >
            Sub tasks
          </Text>
          <Button onPress={showModal} mode="contained-tonal" icon={"plus"}>
            Add subtasks
          </Button>
        </View>
        <View style={{ gap: 16 }}>
          {subTasks?.map((subTask: any) => {
            return (
              <View
                key={subTask.id}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Text
                  style={{
                    fontWeight: FONT_WEIGHT.semiBold,
                    fontSize: FONT_SIZE.medium,
                  }}
                >
                  {subTask.title}
                </Text>
                <Checkbox
                  status={subTask.completed ? "checked" : "unchecked"}
                  onPress={() => {
                    supabase
                      .from("sub_tasks")
                      .update({ completed: !subTask.completed })
                      .eq("id", subTask.id);
                    queryClient.invalidateQueries({ queryKey: ["subTasks"] });
                  }}
                />
              </View>
            );
          })}
        </View>
        <Button
          onPress={() => router.push(`(tasks)/${task.id}/edit`)}
          style={{ borderRadius: 12 }}
          buttonColor={COLORS.purple}
          textColor={COLORS.white}
        >
          Edit Task
        </Button>
        <Button
          style={{ borderRadius: 12 }}
          buttonColor={COLORS.blue}
          textColor={COLORS.white}
          icon={"calendar-plus"}
          onPress={() =>
            addEventToCalendar(
              task.title,
              moment.utc(new Date()),
              task.due_date,
              task.description,
            )
          }
        >
          Add to Google Calendar
        </Button>
      </View>
    </SafeArea>
  );
}
