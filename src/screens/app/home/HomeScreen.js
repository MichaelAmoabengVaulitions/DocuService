import React, { useMemo, useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import {
  BLACK,
  DEFAULT_GRADIENT,
  PRIMARY,
  WHITE,
  WHITE_10,
  WHITE_20,
  WHITE_60,
  WHITE_70,
} from "../../../theme/Colors";
import {
  SCREEN_HEIGHT,
  WRAPPED_SCREEN_WIDTH,
  WRAPPER_MARGIN,
} from "../../../theme/Layout";
import useAuthContext from "../../../hooks/auth/useAuthContext";
import TemplateBox from "../../../components/TemplateBox";
import TemplateText from "../../../components/TemplateText";
import DynamicIcon from "../../../components/icons/DynamicIcon";
import {
  ALL_DOCUMENT_SUMMARIES,
  NOTIFICATIONS,
  PROFILE_SETTINGS,
  SCAN_DOCUMENT,
  SUMMARY,
} from "../../../navigation/ScreenNames";
import dummyRecentLetters from "../../../consts/dummyRecentLetters.json";
import dummyActionItems from "../../../consts/dummyActions.json";
import ModalBase from "../../../components/modals/ModalBase";
import { Agenda } from "react-native-calendars";
const TimeLineModal = ({ visible, onClose }) => {
  const INITIAL_ITEMS = {
    // Use YYYY-MM-DD keys. Replace with your data.
    "2025-10-06": [
      {
        id: "a1",
        time: "09:00",
        title: "Letter received: Finanzamt",
        note: "Open summary",
        height: 76,
      },
      {
        id: "a2",
        time: "16:00",
        title: "Clarify reference number",
        note: "Check page 2",
        height: 76,
      },
    ],
    "2025-10-07": [
      {
        id: "b1",
        time: "10:30",
        title: "Translate key paragraph",
        note: "Line-by-line view",
        height: 76,
      },
    ],
    "2025-10-08": [
      {
        id: "c1",
        time: "All day",
        title: "Draft reply email",
        note: "Polite German + English",
        height: 76,
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

  const renderItem = (item) => (
    <View style={modalStyles.card}>
      {!!item.time && <Text style={modalStyles.time}>{item.time}</Text>}
      <View style={{ flex: 1 }}>
        <Text style={modalStyles.title}>{item.title}</Text>
        {!!item.note && <Text style={modalStyles.note}>{item.note}</Text>}
      </View>
    </View>
  );

  const renderEmptyDate = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No items for this day</Text>
    </View>
  );

  const onDayPress = (_day) => {
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
      <TemplateBox
        pv={WRAPPER_MARGIN}
        backgroundColor={PRIMARY}
        flex
        alignItems="center"
      >
        <TemplateBox
          onPress={onClose}
          mb={16}
          alignSelf="flex-start"
          row
          vCenter
          ph={WRAPPER_MARGIN}
          justifyContent="space-between"
        >
          <TemplateText color={WHITE} size={16} semiBold mr={8}>
            Schedule and Deadline
          </TemplateText>
          <TemplateBox flex />
          <DynamicIcon name={"Close"} size={24} color={WHITE} />
        </TemplateBox>

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
      </TemplateBox>
    </ModalBase>
  );
};

const TILE_GUTTER = 12;

const HomeScreen = ({ navigation }) => {
  const { auth } = useAuthContext();
  const [dummyDocs, setDummyDocs] = useState(dummyRecentLetters?.docs);
  const [dummyActions, setDummyActions] = useState(dummyActionItems?.actions);
  const [isTimeLineModalVisible, setTimeLineModalVisible] = useState(false);

  const TOOLS = [
    {
      buttonCta: "Scan Document",
      title: "Document Analyzer",
      description:
        "Scan or upload an official document. Get the summary, detailed explanation, and key insights.",
      icon: "Scan",
      onPress: () => navigation.navigate(SCAN_DOCUMENT),
    },
    {
      buttonCta: "View TimeLine",
      title: "Timeline Viewer",
      description:
        "Check your timeline for important dates, events. Never miss a deadline.",
      icon: "Calendar",
      onPress: () => {
        setTimeLineModalVisible(true);
      },
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TemplateBox pt={10}>
        <TemplateBox
          alignItems="center"
          row
          justifyContent="space-between"
          mt={60}
          ph={WRAPPER_MARGIN}
          vCenter
          gradientColors={DEFAULT_GRADIENT}
        >
          <TemplateBox>
            <TemplateText color={WHITE} size={14}>
              Hello
            </TemplateText>
            <TemplateText color={WHITE} size={24} medium>
              Michael Amoabeng
            </TemplateText>
          </TemplateBox>
          <TemplateBox flex />
          <TemplateBox row alignItems="center" justifyContent="space-between">
            <TemplateBox
              mr={12}
              onPress={() => navigation.navigate(NOTIFICATIONS)}
            >
              <DynamicIcon name={"Bell"} color={WHITE_70} size={24} />
            </TemplateBox>
            <TemplateBox onPress={() => navigation.navigate(PROFILE_SETTINGS)}>
              <DynamicIcon name={"Profile"} color={WHITE_70} size={30} />
            </TemplateBox>
          </TemplateBox>
        </TemplateBox>
      </TemplateBox>

      <TemplateBox justifyContent="center" mt={34}>
        {TOOLS.map((tool, index) => (
          <TemplateBox
            key={index}
            backgroundColor={WHITE_10}
            mb={16}
            pAll={16}
            mx={WRAPPER_MARGIN}
            borderRadius={16}
            onPress={tool.onPress}
            selfCenter
            width={WRAPPED_SCREEN_WIDTH}
          >
            <TemplateText semiBold size={18} color={WHITE}>
              {tool.title}
            </TemplateText>
            <TemplateText size={14} color={WHITE_60}>
              {tool.description}
            </TemplateText>
            <TemplateBox
              row
              mt={16}
              alignItems="center"
              justifyContent="center"
              pAll={16}
              borderRadius={16}
              borderWidth={1}
              borderColor={WHITE_20}
              width={"100%"}
            >
              <DynamicIcon name={tool.icon} color={WHITE} size={24} />
              <TemplateText size={16} color={WHITE} ml={8} semiBold>
                {tool.buttonCta}
              </TemplateText>
            </TemplateBox>
          </TemplateBox>
        ))}
      </TemplateBox>
      <TemplateBox
        width={WRAPPED_SCREEN_WIDTH}
        height={StyleSheet.hairlineWidth}
        backgroundColor={WHITE_20}
        mv={30}
        selfCenter
      />
      <TemplateBox ph={WRAPPER_MARGIN}>
        <TemplateText medium size={18} color={WHITE} mb={16}>
          Open Actions
        </TemplateText>
        <TemplateBox
          borderRadius={24}
          backgroundColor={WHITE_10}
          ph={WRAPPER_MARGIN}
          pv={20}
          mb={20}
          mx={WRAPPER_MARGIN}
        >
          {dummyActions?.map((action, index) => (
            <TemplateBox
              key={index}
              mb={12}
              row
              alignItems="center"
              justifyContent="space-between"
              onPress={() => {}}
            >
              <TemplateBox width={"90%"}>
                <TemplateText color={WHITE} medium size={16}>
                  {action.title}
                </TemplateText>
                <TemplateText color={WHITE_60} size={12}>
                  {action.description}
                </TemplateText>
              </TemplateBox>
              <TemplateBox flex />
              <DynamicIcon name={"ArrowRight"} color={WHITE_60} size={20} />
            </TemplateBox>
          ))}
        </TemplateBox>
      </TemplateBox>
      <TemplateBox
        width={WRAPPED_SCREEN_WIDTH}
        height={StyleSheet.hairlineWidth}
        backgroundColor={WHITE_20}
        mv={30}
        selfCenter
      />
      <TemplateBox row ph={WRAPPER_MARGIN} mb={20} alignItems="center">
        <TemplateText medium size={18} color={WHITE}>
          Recent Letters
        </TemplateText>
        <TemplateBox flex />
        <TemplateText
          medium
          size={14}
          color={WHITE_60}
          onPress={() => navigation.navigate(ALL_DOCUMENT_SUMMARIES)}
        >
          View All
        </TemplateText>
        <DynamicIcon name={"ArrowRight"} color={WHITE_60} size={20} />
      </TemplateBox>
      {dummyDocs?.splice(0, 3).map((letter, index) => (
        <TemplateBox
          key={index}
          backgroundColor={WHITE_10}
          mb={16}
          ph={16}
          width={WRAPPED_SCREEN_WIDTH}
          selfCenter
          borderRadius={16}
          pv={16}
          row
          justifyContent="space-between"
          alignItems="center"
          borderWidth={StyleSheet.hairlineWidth}
          borderColor={WHITE_20}
          onPress={() => navigation.navigate(SUMMARY, { letterId: letter.id })}
        >
          <DynamicIcon name={"File"} color={WHITE} size={30} />
          <TemplateBox flex ml={12} justifyContent="center">
            <TemplateText size={16} semiBold color={WHITE_60}>
              {letter.title}
            </TemplateText>
            <TemplateText size={14} color={WHITE_60} mt={6}>
              {letter.subtitle}
            </TemplateText>
          </TemplateBox>
          <DynamicIcon name={"ArrowRight"} color={WHITE_60} size={20} />
        </TemplateBox>
      ))}
      <TimeLineModal
        visible={isTimeLineModalVisible}
        onClose={() => setTimeLineModalVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  contentContainer: {
    flexGrow: 1,
  },
  heroImage: {
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  gridWrapper: {
    marginHorizontal: WRAPPER_MARGIN,
    marginTop: 100,
    marginBottom: 24,
  },
  grid: {
    justifyContent: "space-between",
  },
  tile: {
    height: 200,
    marginBottom: TILE_GUTTER,
    backgroundColor: WHITE_10,
    borderColor: WHITE_20,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    padding: 16,
    justifyContent: "center",
  },
  tileIconWrap: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  tileLabel: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
});

const modalStyles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  shell: {
    width: "100%",
    height: SCREEN_HEIGHT,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#141416",
  },
  card: {
    flexDirection0: "row",
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

export default HomeScreen;
