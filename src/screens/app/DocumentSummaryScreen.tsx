import Box from "@/components/Box";
import DynamicIcon from "@/components/icons/DynamicIcon";
import { Colors } from "@/constants/Colors";
import { WRAPPED_SCREEN_WIDTH, WRAPPER_MARGIN } from "@/constants/Layout";
import React, { useState, useMemo, useLayoutEffect } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import dummySummary from "@/constants/DummyData/dummyLetterSummary.json";
import TemplateText from "@/components/TemplateText";
import ToggleTab from "@/components/ToggleTab";
import ActionPlanItemModal from "@/components/modals/ActionPlanItemModal";
import ReminderModal from "@/components/modals/ReminderModal";

interface DocumentSummaryScreenProps {
  navigation: any;
}

type ToggleTabs = {
  label: string;
  value: string;
  description?: string;
};

const toggleTabs: ToggleTabs[] = [
  { label: "Summary", value: "summaryLong", description: "Here is a summary" },
  {
    label: "Explanation",
    value: "explanationDetailed",
    description: "A detailed explanation.",
  },
  {
    label: "Action Plan",
    value: "actions",
    description: "Take action on the following points:",
  },
  { label: "Checklist", value: "checklist" },
];

const DocumentSummaryScreen = ({ navigation }: DocumentSummaryScreenProps) => {
  const [activeTab, setActiveTab] = useState<string>(toggleTabs[0].value);
  const [isActionPlanItemModalVisible, setIsActionPlanItemModalVisible] =
    useState(false);

  const [selectedCheckListItem, setSelectedCheckListItem] = useState<any>(null);
  const [selectedActionPlanItem, setSelectedActionPlanItem] =
    useState<any>(null);
  const [isReminderModalVisible, setIsReminderModalVisible] = useState(false);
  const [selectedReminderItem, setSelectedReminderItem] = useState<any>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box mr={WRAPPER_MARGIN} onPress={() => {}}>
          <Box mr={16}>
            <DynamicIcon name="ExportFile" size={24} color={Colors.WHITE} />
          </Box>
        </Box>
      ),
    });
  }, [navigation]);

  const filteredContent = useMemo(() => {
    return (dummySummary as Record<string, any>)[activeTab];
  }, [activeTab, dummySummary]);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <Box>
        <Box ph={WRAPPER_MARGIN}>
          <TemplateText
            semiBold
            size={16}
            mb={16}
            mt={120}
            color={Colors.WHITE}
          >
            {dummySummary.title}
          </TemplateText>
          <Box
            backgroundColor={Colors.WHITE_10}
            pAll={16}
            borderRadius={20}
            borderColor={Colors.WHITE_20}
            borderWidth={StyleSheet.hairlineWidth}
          >
            <TemplateText
              color={Colors.WHITE}
              size={14}
              semiBold
              numberOfLines={4}
            >
              {dummySummary.keyFactsSummary.note}
            </TemplateText>

            <TemplateText color={Colors.WHITE_50} size={11} mt={8}>
              {dummySummary.keyFactsSummary.legalReferences.join(" | ")}
            </TemplateText>
          </Box>
        </Box>
        <ToggleTab
          tabs={toggleTabs}
          activeTab={activeTab}
          onPress={(tab) => {
            setActiveTab(tab);
          }}
          backgroundColor={Colors.WHITE_10}
          activeBackgroundColor={Colors.WHITE_5}
        />
      </Box>

      <Box>
        <Box row alignItems="center" mv={24} ph={WRAPPER_MARGIN}>
          <TemplateText medium size={20} color={Colors.WHITE}>
            {toggleTabs.find((tab) => tab.value === activeTab)?.label}
          </TemplateText>
          <Box flex />
          <Box
            row
            alignItems="center"
            pv={8}
            ph={12}
            borderRadius={12}
            backgroundColor={Colors.WHITE_10}
            onPress={() => {
              if (
                activeTab === toggleTabs[0].value ||
                activeTab === toggleTabs[1].value
              ) {
                // Handle Text-to-Speech
              } else {
                setIsReminderModalVisible(true);
              }
            }}
          >
            <DynamicIcon
              name={
                activeTab === toggleTabs[0].value ||
                activeTab === toggleTabs[1].value
                  ? "TextToSpeech"
                  : "Bell"
              }
              size={24}
              color={Colors.WHITE}
            />
            <TemplateText color={Colors.WHITE} size={14} ml={12} medium>
              {`${
                activeTab === toggleTabs[0].value ||
                activeTab === toggleTabs[1].value
                  ? "Read Aloud"
                  : "Set Up Reminders"
              }`}
            </TemplateText>
          </Box>
        </Box>

        {(activeTab === toggleTabs[0].value ||
          activeTab === toggleTabs[1].value) && (
          <Box ph={WRAPPER_MARGIN} mb={24}>
            <TemplateText
              color={Colors.WHITE_60}
              size={16}
              lineHeight={30}
              mb={16}
              secondary
            >
              {filteredContent}
            </TemplateText>
          </Box>
        )}
        {activeTab === toggleTabs[2].value && filteredContent?.length > 0 && (
          <Box ph={WRAPPER_MARGIN} mb={24}>
            {filteredContent?.map((item: any, index: number) => (
              <Box
                key={index}
                mb={16}
                pAll={16}
                backgroundColor={Colors.WHITE_5}
                borderRadius={20}
                borderWidth={StyleSheet.hairlineWidth}
                borderColor={Colors.WHITE_20}
              >
                <Box
                  row
                  alignItems="center"
                  onPress={() => {
                    setSelectedActionPlanItem(item);
                    setIsActionPlanItemModalVisible(true);
                  }}
                >
                  <Box width={"90%"}>
                    <TemplateText color={Colors.WHITE} size={17} medium mb={8}>
                      {item.title}
                    </TemplateText>
                    <TemplateText color={Colors.WHITE_60} size={14}>
                      {item.description}
                    </TemplateText>
                  </Box>
                  <Box flex />
                  <Box
                    onPress={() => {
                      setSelectedActionPlanItem(item);
                      setIsActionPlanItemModalVisible(true);
                    }}
                  >
                    <DynamicIcon
                      name="ArrowRight"
                      size={20}
                      color={Colors.WHITE_60}
                    />
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {activeTab === toggleTabs[3].value && filteredContent?.length > 0 && (
          <Box
            mt={24}
            backgroundColor={Colors.WHITE_5}
            borderRadius={16}
            width={WRAPPED_SCREEN_WIDTH}
            pAll={16}
            selfCenter
          >
            {filteredContent?.map((item: any, index: number) => (
              <Box key={`checklist-item-${index}`}>
                <Box
                  row
                  alignItems="center"
                  justifyContent="space-between"
                  onPress={() => {
                    Alert.alert(
                      "Complete Action",
                      "Mark this action as complete?",
                      [
                        { text: "Cancel", style: "cancel" },
                        {
                          text: "OK",
                          onPress: () => {
                            // Mark action as complete
                          },
                        },
                      ]
                    );
                  }}
                >
                  <TemplateText
                    color={Colors.WHITE}
                    size={14}
                    maxWidth={"60%"}
                    left
                  >
                    {item.label}
                  </TemplateText>
                  <Box flex />

                  <Box>
                    <DynamicIcon
                      name={
                        index < filteredContent.length - 3 ? "Tick" : "Circle"
                      }
                      size={20}
                      color={Colors.WHITE_60}
                    />
                  </Box>
                </Box>

                {index < filteredContent.length - 1 && (
                  <Box
                    width={WRAPPED_SCREEN_WIDTH - 20}
                    height={1}
                    backgroundColor={Colors.WHITE_5}
                    selfCenter
                    ml={16}
                    mt={12}
                    mb={16}
                  />
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <ActionPlanItemModal
        visible={isActionPlanItemModalVisible}
        onClose={() => setIsActionPlanItemModalVisible(false)}
        item={selectedActionPlanItem}
      />
      <ReminderModal
        visible={isReminderModalVisible}
        onClose={() => setIsReminderModalVisible(false)}
        item={selectedReminderItem}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: Colors.BLACK,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 12,
  },
});

export default DocumentSummaryScreen;
