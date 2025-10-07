import React, { useState, useEffect, useMemo, useLayoutEffect } from "react";
import { StyleSheet, ScrollView, Alert, Image, Switch } from "react-native";

import {
  IS_ANDROID,
  WRAPPED_SCREEN_WIDTH,
  WRAPPER_MARGIN,
} from "../../../theme/Layout";
import {
  BLACK,
  BLACK_0_5,
  BLACK_40,
  BLACK_90,
  DARK_FOREST_GREEN,
  DARK_FOREST_GREEN_20,
  DARK_FOREST_GREEN_30,
  DARK_FOREST_GREEN_40,
  DARK_FOREST_GREEN_50,
  DARK_OVERLAY,
  FOREST_GREEN,
  PRIMARY,
  TRANSPARENT,
  WHITE,
  WHITE_10,
  WHITE_20,
  WHITE_30,
  WHITE_40,
  WHITE_5,
  WHITE_50,
  WHITE_60,
  WHITE_70,
} from "../../../theme/Colors";

import { wp } from "../../../Utils/getResponsiveSize";
import TemplateText from "../../../components/TemplateText";
import TemplateBox from "../../../components/TemplateBox";
import DynamicIcon from "../../../components/icons/DynamicIcon";
//@ts-ignore
import documentImage from "../../../../assets/images/summary-header.png";
import dummySummary from "../../../consts/dummyLetterSummary.json";
import ToggleTab from "../../../components/ToggleTab";
import ModalBase from "../../../components/modals/ModalBase";
import { is } from "date-fns/locale";

const ActionPlanItemModal = ({
  visible,
  onClose,
  item,
}: {
  visible: boolean;
  onClose: () => void;
  item: any;
}) => {
  return (
    <ModalBase isVisible={visible} onClose={onClose}>
      <TemplateBox flex backgroundColor={PRIMARY}>
        <TemplateBox absolute top={16} left={16} onPress={onClose} zIndex={10}>
          <DynamicIcon name={"Close"} size={24} color={WHITE} />
        </TemplateBox>
        <TemplateBox pt={50} flex pAll={WRAPPER_MARGIN} alignItems="center">
          <TemplateText color={WHITE} size={24} semiBold mb={16} center>
            {item?.title}
          </TemplateText>
          <TemplateText color={WHITE_70} size={16} center>
            {item?.description}
          </TemplateText>

          <TemplateBox
            mt={24}
            backgroundColor={WHITE_5}
            borderRadius={16}
            width={WRAPPED_SCREEN_WIDTH}
            pAll={16}
          >
            <TemplateBox row alignItems="center" justifyContent="space-between">
              <TemplateText color={WHITE} size={16} center>
                Due date
              </TemplateText>
              <TemplateBox flex />
              <TemplateText color={WHITE_50} size={16} center>
                {new Date(item?.dueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TemplateText>
            </TemplateBox>
            <TemplateBox
              width={WRAPPED_SCREEN_WIDTH - 20}
              height={1}
              backgroundColor={WHITE_5}
              selfCenter
              ml={16}
              mt={12}
              mb={16}
            />

            <TemplateBox row alignItems="center" justifyContent="space-between">
              <TemplateText color={WHITE} size={16} center>
                Risk Level
              </TemplateText>
              <TemplateBox flex />
              <TemplateText color={WHITE_50} size={16} center>
                {item?.riskLevel || "High"}
              </TemplateText>
            </TemplateBox>

            <TemplateBox
              width={WRAPPED_SCREEN_WIDTH - 20}
              height={1}
              backgroundColor={WHITE_5}
              selfCenter
              ml={16}
              mt={12}
              mb={16}
            />

            <TemplateBox row alignItems="center" justifyContent="space-between">
              <TemplateText color={WHITE} size={16} center>
                Documents
              </TemplateText>
              <TemplateBox flex />
              <TemplateBox width={"60%"} alignItems="flex-end">
                {item?.documentsToPrepare?.length > 0 ? (
                  item.documentsToPrepare.map((doc: string, index: number) => (
                    <TemplateText key={index} color={WHITE_50} size={16} right>
                      {doc}
                    </TemplateText>
                  ))
                ) : (
                  <TemplateText color={WHITE_50} size={16} center>
                    None
                  </TemplateText>
                )}
              </TemplateBox>
            </TemplateBox>

            <TemplateBox
              width={WRAPPED_SCREEN_WIDTH - 20}
              height={1}
              backgroundColor={WHITE_5}
              selfCenter
              ml={16}
              mt={12}
              mb={16}
            />

            <TemplateBox row alignItems="center" justifyContent="space-between">
              <TemplateText color={WHITE} size={16} left>
                Evidence
              </TemplateText>
              <TemplateBox flex />
              <TemplateBox width={"60%"} alignItems="flex-end">
                <TemplateText color={WHITE_50} size={16} right>
                  {item?.evidence?.quote}
                </TemplateText>
              </TemplateBox>
            </TemplateBox>
          </TemplateBox>
        </TemplateBox>
      </TemplateBox>
    </ModalBase>
  );
};

const ReminderModal = ({
  visible,
  onClose,
  item,
}: {
  visible: boolean;
  onClose: () => void;
  item: any;
}) => {
  const [isSwitchEnabled, setIsSwitchEnabled] = useState(false);

  const DAYS_OF_WEEK = [
    { label: "Monday", value: "monday", time: "8:00 AM" },
    { label: "Tuesday", value: "tuesday", time: "8:00 AM" },
    { label: "Wednesday", value: "wednesday", time: "8:00 AM" },
    { label: "Thursday", value: "thursday", time: "8:00 AM" },
    { label: "Friday", value: "friday", time: "8:00 AM" },
    { label: "Saturday", value: "saturday", time: "8:00 AM" },
    { label: "Sunday", value: "sunday", time: "8:00 AM" },
  ];

  return (
    <ModalBase isVisible={visible} onClose={onClose}>
      <TemplateBox
        pAll={WRAPPER_MARGIN}
        backgroundColor={PRIMARY}
        flex
        alignItems="center"
      >
        <TemplateBox absolute top={16} left={16} onPress={onClose}>
          <DynamicIcon name={"Close"} size={24} color={WHITE} />
        </TemplateBox>
        <TemplateBox pt={50} pAll={WRAPPER_MARGIN} alignItems="center">
          <TemplateText color={WHITE} size={24} semiBold mb={16} center>
            Set Up Reminders
          </TemplateText>
        </TemplateBox>

        <TemplateBox
          backgroundColor={WHITE_5}
          borderRadius={16}
          width={WRAPPED_SCREEN_WIDTH}
          pAll={16}
          mb={54}
        >
          <TemplateText color={WHITE} size={16} center mb={12}>
            You can set up reminders for important tasks and deadlines.
          </TemplateText>

          <TemplateBox>
            {DAYS_OF_WEEK.map((notificationDay, index) => (
              <TemplateBox>
                <TemplateBox
                  row
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Switch
                    value={isSwitchEnabled}
                    onValueChange={(value) => {
                      setIsSwitchEnabled(value);
                    }}
                    thumbColor={isSwitchEnabled ? FOREST_GREEN : BLACK_90}
                    trackColor={{
                      false: WHITE_10,
                      true: DARK_FOREST_GREEN_30,
                    }}
                    style={{ width: 52 }}
                  />

                  <TemplateText color={WHITE} size={16} center ml={12} medium>
                    {notificationDay.label}
                  </TemplateText>
                  <TemplateBox flex />
                  <TemplateBox
                    pv={6}
                    ph={12}
                    borderRadius={12}
                    backgroundColor={WHITE_5}
                  >
                    <TemplateText color={FOREST_GREEN} size={16} center medium>
                      {notificationDay.time}
                    </TemplateText>
                  </TemplateBox>
                </TemplateBox>

                {index !== DAYS_OF_WEEK.length - 1 && (
                  <TemplateBox
                    width={WRAPPED_SCREEN_WIDTH - 40}
                    height={1}
                    backgroundColor={WHITE_5}
                    selfCenter
                    ml={16}
                    mv={16}
                  />
                )}
              </TemplateBox>
            ))}
          </TemplateBox>
        </TemplateBox>
      </TemplateBox>
    </ModalBase>
  );
};

interface SummaryScreenProps {
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

const SummaryScreen = ({ navigation }: SummaryScreenProps) => {
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
        <TemplateBox mr={WRAPPER_MARGIN} onPress={() => {}}>
          <TemplateBox mr={16}>
            <DynamicIcon name="ExportFile" size={24} color={WHITE} />
          </TemplateBox>
        </TemplateBox>
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
      <TemplateBox>
        <TemplateBox ph={WRAPPER_MARGIN}>
          <TemplateText semiBold size={16} mb={16} mt={120} color={WHITE}>
            {dummySummary.title}
          </TemplateText>
          <TemplateBox
            backgroundColor={WHITE_10}
            pAll={16}
            borderRadius={20}
            borderColor={WHITE_20}
            borderWidth={StyleSheet.hairlineWidth}
          >
            <TemplateText color={WHITE} size={14} semiBold numberOfLines={4}>
              {dummySummary.keyFactsSummary.note}
            </TemplateText>

            <TemplateText color={WHITE_50} size={11} mt={8}>
              {dummySummary.keyFactsSummary.legalReferences.join(" | ")}
            </TemplateText>
          </TemplateBox>
        </TemplateBox>
        <ToggleTab
          tabs={toggleTabs}
          activeTab={activeTab}
          onPress={(tab) => {
            setActiveTab(tab);
          }}
          backgroundColor={WHITE_10}
          activeBackgroundColor={WHITE_5}
        />
      </TemplateBox>

      <TemplateBox>
        <TemplateBox row alignItems="center" mv={24} ph={WRAPPER_MARGIN}>
          <TemplateText medium size={20} color={WHITE}>
            {toggleTabs.find((tab) => tab.value === activeTab)?.label}
          </TemplateText>
          <TemplateBox flex />
          <TemplateBox
            row
            alignItems="center"
            pv={8}
            ph={12}
            borderRadius={12}
            backgroundColor={WHITE_10}
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
              color={WHITE}
            />
            <TemplateText color={WHITE} size={14} ml={12} medium>
              {`${
                activeTab === toggleTabs[0].value ||
                activeTab === toggleTabs[1].value
                  ? "Read Aloud"
                  : "Set Up Reminders"
              }`}
            </TemplateText>
          </TemplateBox>
        </TemplateBox>

        {(activeTab === toggleTabs[0].value ||
          activeTab === toggleTabs[1].value) && (
          <TemplateBox ph={WRAPPER_MARGIN} mb={24}>
            <TemplateText color={WHITE_60} size={16} lineHeight={30} mb={16}>
              {filteredContent}
            </TemplateText>
          </TemplateBox>
        )}
        {activeTab === toggleTabs[2].value && filteredContent?.length > 0 && (
          <TemplateBox ph={WRAPPER_MARGIN} mb={24}>
            {filteredContent?.map((item: any, index: number) => (
              <TemplateBox
                key={index}
                mb={16}
                pAll={16}
                backgroundColor={WHITE_5}
                borderRadius={20}
                borderWidth={StyleSheet.hairlineWidth}
                borderColor={WHITE_20}
              >
                <TemplateBox
                  row
                  alignItems="center"
                  onPress={() => {
                    setSelectedActionPlanItem(item);
                    setIsActionPlanItemModalVisible(true);
                  }}
                >
                  <TemplateBox width={"90%"}>
                    <TemplateText color={WHITE} size={17} medium mb={8}>
                      {item.title}
                    </TemplateText>
                    <TemplateText color={WHITE_60} size={14}>
                      {item.description}
                    </TemplateText>
                  </TemplateBox>
                  <TemplateBox flex />
                  <TemplateBox
                    onPress={() => {
                      setSelectedActionPlanItem(item);
                      setIsActionPlanItemModalVisible(true);
                    }}
                  >
                    <DynamicIcon name="ArrowRight" size={20} color={WHITE_60} />
                  </TemplateBox>
                </TemplateBox>
              </TemplateBox>
            ))}
          </TemplateBox>
        )}

        {activeTab === toggleTabs[3].value && filteredContent?.length > 0 && (
          <TemplateBox
            mt={24}
            backgroundColor={WHITE_5}
            borderRadius={16}
            width={WRAPPED_SCREEN_WIDTH}
            pAll={16}
            selfCenter
          >
            {filteredContent?.map((item: any, index: number) => (
              <TemplateBox>
                <TemplateBox
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
                  <TemplateText color={WHITE} size={14} maxWidth={"60%"} left>
                    {item.label}
                  </TemplateText>
                  <TemplateBox flex />

                  <TemplateBox>
                    {index < filteredContent.length - 3 ? (
                      <DynamicIcon name={"Tick"} size={20} color={WHITE_60} />
                    ) : (
                      <TemplateBox
                        pv={8}
                        ph={12}
                        borderRadius={12}
                        backgroundColor={WHITE_10}
                      >
                        <TemplateText color={WHITE_60} size={14}>
                          Pending
                        </TemplateText>
                      </TemplateBox>
                    )}
                  </TemplateBox>
                </TemplateBox>

                {index < filteredContent.length - 1 && (
                  <TemplateBox
                    width={WRAPPED_SCREEN_WIDTH - 20}
                    height={1}
                    backgroundColor={WHITE_5}
                    selfCenter
                    ml={16}
                    mt={12}
                    mb={16}
                  />
                )}
              </TemplateBox>
            ))}
          </TemplateBox>
        )}
      </TemplateBox>
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
    backgroundColor: BLACK,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "contain",
    borderRadius: 12,
  },
});

export default SummaryScreen;
