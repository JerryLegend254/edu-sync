import SafeArea from "@/components/safearea/safearea";
import { Alert, Text, TouchableOpacity } from "react-native";
import * as AddCalendarEvent from "react-native-add-calendar-event";
import moment, { Moment } from "moment";

const eventTitle = "Lunch";
const time_now_in_utc = moment.utc();

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
export default function TaskScreen() {
  return (
    <SafeArea>
      <Text>TaskScreen</Text>
      <Text>Event Title : {eventTitle}</Text>
      <Text>
        Event Date Time: {moment.utc(time_now_in_utc).local().format("lll")}
      </Text>
      <TouchableOpacity
        onPress={() => addEventToCalendar(eventTitle, time_now_in_utc)}
      >
        <Text>Add Event</Text>
      </TouchableOpacity>
    </SafeArea>
  );
}
