import { SCREEN_HEIGHT, WRAPPER_MARGIN } from "@/constants/Layout";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import TemplateText from "../TemplateText";
import Box from "../Box";
import { Colors } from "@/constants/Colors";
import ModalBase from "./ModalBase";
import DynamicIcon from "../icons/DynamicIcon";
import { Agenda, AgendaEntry } from "react-native-calendars";

export interface Day {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface Item {
  id: string;
  time: string;
  title: string;
  note: string;
  height: number;
}

interface RenderItemProps {
  item: Item;
}

interface TimeLineModalProps {
  visible: boolean;
  onClose: () => void;
}

const TimeLineModal = ({ visible, onClose }: TimeLineModalProps) => {
  const INITIAL_ITEMS = {
    "2025-10-06": [
      {
        id: "a1",
        time: "09:00",
        title: "Letter received: Finanzamt",
        note: "Open summary",
        height: 76,
        name: "Letter received: Finanzamt",
        day: "2025-10-06",
      },
      {
        id: "a2",
        time: "16:00",
        title: "Clarify reference number",
        note: "Check page 2",
        height: 76,
        name: "Clarify reference number",
        day: "2025-10-06",
      },
    ],
    "2025-10-07": [
      {
        id: "b1",
        time: "10:30",
        title: "Translate key paragraph",
        note: "Line-by-line view",
        height: 76,
        name: "Translate key paragraph",
        day: "2025-10-07",
      },
    ],
    "2025-10-08": [
      {
        id: "c1",
        time: "All day",
        title: "Draft reply email",
        note: "Polite German + English",
        height: 76,
        name: "Draft reply email",
        day: "2025-10-08",
      },
    ],
  };

  const [items, setItems] = useState(INITIAL_ITEMS);
  const marked = useMemo(
    () =>
      Object.keys(items).reduce((acc, d) => {
        acc[d] = { marked: true, dotColor: "#4CAF50" };
        return acc;
      }, {}),
    [items]
  );

  const renderItem = (reservation: AgendaEntry, _isFirst: boolean) => {
    const item = reservation as unknown as Item;
    return (
      <View style={modalStyles.card}>
        {!!item.time && (
          <TemplateText style={modalStyles.time}>{item.time}</TemplateText>
        )}
        <View style={{ flex: 1 }}>
          <TemplateText style={modalStyles.title}>{item.title}</TemplateText>
          {!!item.note && (
            <TemplateText style={modalStyles.note}>{item.note}</TemplateText>
          )}
        </View>
      </View>
    );
  };

  const renderEmptyDate = () => (
    <Box center selfCenter>
      <TemplateText medium color={Colors.WHITE_60} size={14} mt={20}>
        No items for this day
      </TemplateText>
    </Box>
  );

  const onDayPress = (_day: Day): void => {
    // Keep it simple: no fetch, no generation—Agenda will show what's in `items`
  };

  const calendarTheme = {
    backgroundColor: "#141416",
    calendarBackground: "#141416",
    monthTextColor: "#FFFFFF",
    textSectionTitleColor: "#C0C4CF", // Mon/Tue header
    textDisabledColor: "#6A6E79",
    dayTextColor: "#FFFFFF", // day numbers
    todayTextColor: "#4CAF50",
    selectedDayBackgroundColor: "#2A2A2E",
    selectedDayTextColor: "#FFFFFF",
  };

  return (
    <ModalBase isVisible={visible} onClose={onClose}>
      <Box
        pv={WRAPPER_MARGIN}
        backgroundColor={Colors.BLACK}
        flex
        alignItems="center"
      >
        <Box
          onPress={onClose}
          mb={16}
          alignSelf="flex-start"
          row
          vCenter
          ph={WRAPPER_MARGIN}
          justifyContent="space-between"
        >
          <TemplateText color={Colors.WHITE} size={18} semiBold mr={8}>
            Schedule and Deadline
          </TemplateText>
          <Box flex />
          <DynamicIcon name={"Close"} size={24} color={Colors.WHITE} />
        </Box>

        <View style={modalStyles.shell}>
          <Agenda
            items={items}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            onDayPress={onDayPress}
            selected={"2025-10-06"}
            markedDates={marked}
            showClosingKnob
            theme={{
              ...calendarTheme, // Calendar keys (docs)
              agendaDayTextColor: "#C0C4CF", // left column “Mon/Tue”
              agendaDayNumColor: "#C0C4CF", // left column numbers
              agendaTodayColor: "#4CAF50",
              agendaKnobColor: "#444",
              reservationsBackgroundColor: "#141416", // agenda list bg
            }}
          />
        </View>
      </Box>
    </ModalBase>
  );
};

const modalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  shell: {
    flex: 1,
    width: "100%",
    height: SCREEN_HEIGHT,
    overflow: "hidden",
    backgroundColor: "#141416",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1C1D22",
    borderRadius: 14,
    padding: 14,
    marginRight: 10,
    marginTop: 10,
  },
  time: { color: "#C7CAD1", fontSize: 12, marginRight: 10, width: 56 },
  title: { color: "#fff", fontSize: 14, fontWeight: "600" },
  note: { color: "#A7ABB5", fontSize: 12, marginTop: 2 },
  empty: {
    backgroundColor: "#141416",
    borderRadius: 12,
    padding: 16,
    marginRight: 10,
    marginTop: 10,
  },
  emptyText: { color: "#9EA3AE", fontSize: 12 },
});

export default TimeLineModal;
