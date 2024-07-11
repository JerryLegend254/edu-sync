import SafeArea from "@/components/safearea/safearea";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import * as AddCalendarEvent from "react-native-add-calendar-event";
import moment, { Moment } from "moment";
import { FONT_SIZE, FONT_WEIGHT } from "@/constants/fonts";
import Spacer from "@/components/spacer/spacer";
import DatePicker from "react-native-date-picker";
import { useState } from "react";
import { Button } from "react-native-paper";
import COLORS from "@/constants/colors";
import SelectDropdown from "react-native-select-dropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCategories } from "@/lib/apiCategories";
import { Slider } from "@react-native-assets/slider";
import { TaskCategory } from "@/type-declarations";
import { useToast } from "react-native-toast-notifications";
import { supabase } from "@/lib/supabase";
import momentTZ from "moment-timezone";
import { addTask } from "@/lib/apiTasks";
import { useRouter } from "expo-router";
const eventTitle = "Lunch";
const time_now_in_utc = moment.utc();
const timeZone = "Etc/GMT-3";

function convertToTimeZone(date: Date, timeZone: string): string {
  return momentTZ(date).tz(timeZone).format("YYYY-MM-DD HH:mm:ss Z");
}
const utcDateToString = (momentInUTC: string | Moment) => {
  let formattedDate = moment
    .utc(momentInUTC)
    .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]");
  return formattedDate;
};

const addEventToCalendar = (title: string, startDate: string | Moment) => {
  const eventConfig = {
    title: "Lunch",
    startDate: utcDateToString(startDate),
    endDate: utcDateToString(moment.utc(startDate).add(1, "hours")),
    location: "The Boat House",
    notes: "Order the salmon",
    navigationBarIOS: {
      tintColor: "orange",
      backgroundColor: "green",
      titleColor: "blue",
    },
  };

  AddCalendarEvent.presentEventCreatingDialog(eventConfig)
    .then((eventInfo) => {
      Alert.alert("eventInfo", JSON.stringify(eventInfo));
    })
    .catch((error) => {
      Alert.alert("Error", JSON.stringify(error));
    });
};
//<Text>Event Title : {eventTitle}</Text>
//<Text>
//  Event Date Time: {moment.utc(time_now_in_utc).local().format("lll")}
//</Text>
//<TouchableOpacity
//  onPress={() => addEventToCalendar(eventTitle, time_now_in_utc)}
//>
//  <Text>Add Event</Text>
//</TouchableOpacity>
export default function TaskScreen() {
  const [dueDate, setDueDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(0);
  const [priority, setPriority] = useState(5);
  const [status, setStatus] = useState<"pending" | "in-progress" | "completed">(
    "pending",
  );
  const toast = useToast();
  const queryClient = useQueryClient();
  const { data: categories, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  if (error) {
    console.log(error);
  }
  const { mutate } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myTasks"] });
      toast.show("Task added successfully", {
        type: "success",
        placement: "top",
      });
      setTitle("");
      setDescription("");
      setCategory(0);
      setPriority(5);
      setStatus("pending");
      setDueDate(new Date());
      router.push("(home)");
    },
    onError: (error) => toast.show(error.message, { type: "danger" }),
  });
  const router = useRouter();

  function handleAddTask() {
    if (
      !title ||
      !description ||
      !category ||
      !priority ||
      !status ||
      !dueDate ||
      category === 0
    ) {
      toast.show("Please fill all the fields", {
        type: "danger",
        placement: "top",
      });
      return;
    }
    console.log("Add Task");
    console.log("Title: ", title);
    console.log("Description: ", description);
    console.log("Category: ", category);
    console.log("Priority: ", priority);
    console.log("Status: ", status);
    console.log("Due Date: ", dueDate);
    const newTask = {
      title,
      description,
      category,
      priority,
      status,
      due_date: convertToTimeZone(dueDate, timeZone),
      user_id: 5,
    };
    mutate(newTask);
  }
  return (
    <SafeArea>
      <Text
        style={{ fontSize: FONT_SIZE.extraLarge, fontWeight: FONT_WEIGHT.bold }}
      >
        Create Commitment
      </Text>
      <Spacer position="vertical" size={16} />
      <View style={{ gap: 16 }}>
        <TextInput
          placeholder="Add Title"
          value={title}
          onChangeText={setTitle}
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
          }}
        />
        <TextInput
          placeholder="Add Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={{
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderColor: "gray",
            borderWidth: 1,
            borderRadius: 8,
          }}
        />
        <SelectDropdown
          data={categories || []}
          onSelect={(selectedItem: TaskCategory) =>
            setCategory(selectedItem.tc_id)
          }
          renderButton={(selectedItem: TaskCategory) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {(selectedItem && selectedItem.title) || "Select Category"}
                </Text>
              </View>
            );
          }}
          renderItem={(item: TaskCategory, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        <View style={{ gap: 4 }}>
          <Text
            style={{ fontSize: FONT_SIZE.medium, fontWeight: FONT_WEIGHT.bold }}
          >
            Set Commitment Priority
          </Text>
          <Slider
            value={5} // set the current slider's value
            minimumValue={0} // Minimum value
            maximumValue={10} // Maximum value
            step={1} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
            minimumTrackTintColor={COLORS.red} // The track color before the current value
            maximumTrackTintColor={COLORS.green} // The track color after the current value
            thumbTintColor={COLORS.purple} // The color of the slider's thumb
            onValueChange={(value) => setPriority(value)}
          />
        </View>
        <SelectDropdown
          data={["pending", "in-progress", "completed"]}
          onSelect={(selectedItem: "pending" | "in-progress" | "completed") =>
            setStatus(selectedItem)
          }
          renderButton={(selectedItem) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem || "Select Status"}
                </Text>
              </View>
            );
          }}
          renderItem={(item, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        <Text
          style={{ fontSize: FONT_SIZE.medium, fontWeight: FONT_WEIGHT.bold }}
        >
          {dueDate.toString()}
        </Text>

        <Button
          mode="contained"
          buttonColor={COLORS.light_blue}
          style={{ borderRadius: 8 }}
          onPress={() => setOpen(true)}
        >
          Set Due Date
        </Button>
        <DatePicker
          modal
          open={open}
          date={dueDate}
          onConfirm={(date) => {
            setOpen(false);
            setDueDate(date);
          }}
          onCancel={() => {
            setOpen(false);
          }}
          minimumDate={new Date()}
        />
      </View>
      <View style={{ position: "absolute", bottom: 16, width: "100%" }}>
        <Button
          mode="contained"
          buttonColor={COLORS.purple}
          style={{ borderRadius: 8, marginHorizontal: 24, width: "100%" }}
          onPress={handleAddTask}
        >
          Save Commitment
        </Button>
      </View>
    </SafeArea>
  );
}
const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: "100%",
    height: 50,
    backgroundColor: "#E9ECEF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
});
