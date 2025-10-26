import Box from "@/components/Box";
import DynamicIcon, { DynamicIconName } from "@/components/icons/DynamicIcon";
import TemplateText from "@/components/TemplateText";
import { Colors } from "@/constants/Colors";
import {
  SCREEN_HEIGHT,
  WRAPPED_SCREEN_WIDTH,
  WRAPPER_MARGIN,
} from "@/constants/Layout";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import dummyRecentLetters from "@/constants/DummyData/dummyRecentLetters.json";
import dummyActionItems from "@/constants/DummyData/dummyActions.json";

import {
  ALL_DOCUMENT_SUMMARIES,
  NOTIFICATIONS,
  PROFILE_SETTINGS,
  SCAN_DOCUMENT,
  SUMMARY,
} from "@/navigation/screenNames";
import TimeLineModal from "@/components/modals/TimeLineModal";

const TILE_GUTTER = 12;

const HomeScreen = ({ navigation }) => {
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
      <Box pt={10}>
        <Box
          alignItems="center"
          row
          justifyContent="space-between"
          mt={60}
          ph={WRAPPER_MARGIN}
          vCenter
        >
          <Box>
            <TemplateText color={Colors.WHITE} size={14}>
              Hello
            </TemplateText>
            <TemplateText color={Colors.WHITE} size={24} medium>
              Michael Amoabeng
            </TemplateText>
          </Box>
          <Box flex />
          <Box row alignItems="center" justifyContent="space-between">
            <Box mr={12} onPress={() => navigation.navigate(NOTIFICATIONS)}>
              <DynamicIcon name={"Bell"} color={Colors.WHITE_70} size={24} />
            </Box>
            <Box onPress={() => navigation.navigate(PROFILE_SETTINGS)}>
              <DynamicIcon name={"Profile"} color={Colors.WHITE_70} size={30} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box justifyContent="center" mt={34}>
        {TOOLS.map((tool, index) => (
          <Box
            key={index}
            backgroundColor={Colors.WHITE_10}
            mb={16}
            pAll={16}
            mh={WRAPPER_MARGIN}
            borderRadius={16}
            onPress={tool.onPress}
            selfCenter
            width={WRAPPED_SCREEN_WIDTH}
          >
            <TemplateText semiBold size={18} color={Colors.WHITE}>
              {tool.title}
            </TemplateText>
            <TemplateText size={14} color={Colors.WHITE_60}>
              {tool.description}
            </TemplateText>
            <Box
              row
              mt={16}
              alignItems="center"
              justifyContent="center"
              pAll={16}
              borderRadius={16}
              borderWidth={1}
              borderColor={Colors.WHITE_20}
              width={"100%"}
            >
              <DynamicIcon
                name={tool.icon as DynamicIconName}
                color={Colors.WHITE}
                size={24}
              />
              <TemplateText size={16} color={Colors.WHITE} ml={8} semiBold>
                {tool.buttonCta}
              </TemplateText>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        width={WRAPPED_SCREEN_WIDTH}
        height={StyleSheet.hairlineWidth}
        backgroundColor={Colors.WHITE_20}
        mv={30}
        selfCenter
      />
      <Box ph={WRAPPER_MARGIN}>
        <TemplateText medium size={18} color={Colors.WHITE} mb={16}>
          Open Actions
        </TemplateText>
        <Box
          borderRadius={24}
          backgroundColor={Colors.WHITE_10}
          ph={WRAPPER_MARGIN}
          pv={20}
          mb={20}
        >
          {dummyActions?.map((action, index) => (
            <Box
              key={index}
              mb={12}
              row
              alignItems="center"
              justifyContent="space-between"
              onPress={() => {}}
            >
              <Box width={"90%"}>
                <TemplateText color={Colors.WHITE} medium size={16}>
                  {action.title}
                </TemplateText>
                <TemplateText color={Colors.WHITE_60} size={12}>
                  {action.description}
                </TemplateText>
              </Box>
              <Box flex />
              <DynamicIcon
                name={"ArrowRight"}
                color={Colors.WHITE_60}
                size={20}
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box
        width={WRAPPED_SCREEN_WIDTH}
        height={StyleSheet.hairlineWidth}
        backgroundColor={Colors.WHITE_20}
        mv={30}
        selfCenter
      />
      <Box row ph={WRAPPER_MARGIN} mb={20} alignItems="center">
        <TemplateText medium size={18} color={Colors.WHITE}>
          Recent Letters
        </TemplateText>
        <Box flex />
        <TemplateText
          medium
          size={14}
          color={Colors.WHITE_60}
          onPress={() => navigation.navigate(ALL_DOCUMENT_SUMMARIES)}
        >
          View All
        </TemplateText>
        <DynamicIcon name={"ArrowRight"} color={Colors.WHITE_60} size={20} />
      </Box>
      {dummyDocs?.splice(0, 3).map((letter, index) => (
        <Box
          key={index}
          backgroundColor={Colors.WHITE_10}
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
          borderColor={Colors.WHITE_20}
          onPress={() => navigation.navigate(SUMMARY, { letterId: letter.id })}
        >
          <DynamicIcon name={"File"} color={Colors.WHITE} size={30} />
          <Box flex ml={12} justifyContent="center">
            <TemplateText size={16} semiBold color={Colors.WHITE_60}>
              {letter.title}
            </TemplateText>
            <TemplateText size={14} color={Colors.WHITE_60} mt={6}>
              {letter.subtitle}
            </TemplateText>
          </Box>
          <DynamicIcon name={"ArrowRight"} color={Colors.WHITE_60} size={20} />
        </Box>
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
    backgroundColor: Colors.BLACK,
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
    backgroundColor: Colors.WHITE_10,
    borderColor: Colors.WHITE_20,
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

export default HomeScreen;
