import React, { useState } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { WRAPPED_SCREEN_WIDTH, WRAPPER_MARGIN } from "../../../theme/Layout";
import {
  BLACK,
  FOREST_GREEN,
  PRIMARY,
  WHITE,
  WHITE_20,
  WHITE_40,
  WHITE_5,
  WHITE_60,
} from "../../../theme/Colors";

import TemplateText from "../../../components/TemplateText";
import TemplateBox from "../../../components/TemplateBox";
import TemplateTextInput from "../../../components/TemplateTextInput";
import DynamicIcon from "../../../components/icons/DynamicIcon";
import ModalBase from "../../../components/modals/ModalBase";
import Button from "../../../components/Button";
import dummyRecentLetters from "../../../consts/dummyRecentLetters.json";
import { SUMMARY } from "../../../navigation/ScreenNames";
//@ts-ignore

const FilterModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const filterOptions = [
    { id: "overdue", label: "Overdue" },
    { id: "due_today", label: "Due today" },
    { id: "due_week", label: "Due this week" },
    { id: "unread", label: "Unread" },
    { id: "payments", label: "Payments" },
    { id: "needs_docs", label: "Needs documents" },
    { id: "has_appointment", label: "Has appointment" },
  ];

  return (
    <ModalBase isVisible={visible} onClose={onClose}>
      <TemplateBox flex backgroundColor={PRIMARY}>
        <TemplateBox row alignItems="center" mv={24} ph={16}>
          <TemplateBox onPress={onClose}>
            <DynamicIcon name={"Close"} size={24} color={WHITE} />
          </TemplateBox>
          <TemplateBox flex />
          <TemplateText semiBold size={18} color={WHITE}>
            Filter Documents
          </TemplateText>
          <TemplateBox flex />
          <TemplateText color={FOREST_GREEN} size={16}>
            Reset
          </TemplateText>
        </TemplateBox>
        <TemplateBox>
          {filterOptions.map((option) => (
            <TemplateBox
              key={option.id}
              row
              alignItems="center"
              pv={12}
              ph={16}
            >
              <TemplateText color={WHITE} size={16}>
                {option.label}
              </TemplateText>
              <TemplateBox flex />
              <TemplateBox>
                <DynamicIcon name="Circle" size={20} color={WHITE} />
              </TemplateBox>
            </TemplateBox>
          ))}
        </TemplateBox>

        <Button
          title="Apply Filters"
          onPress={onClose}
          style={{ alignSelf: "center", marginTop: 40 }}
        />
      </TemplateBox>
    </ModalBase>
  );
};

type AllDocumentsScreenProps = {
  navigation: any;
};

const AllDocumentsScreen = ({ navigation }: AllDocumentsScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);
  const [dummyDocs, setDummyDocs] = useState(dummyRecentLetters.docs);
  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <TemplateBox ph={WRAPPER_MARGIN}>
        <TemplateText semiBold size={20} mb={16} mt={120} color={WHITE}>
          All Document Summaries
        </TemplateText>

        <TemplateBox row alignItems="center" mb={24}>
          <TemplateTextInput
            placeholder="Search documents"
            value={searchQuery}
            onChangeText={(text: string) => setSearchQuery(text)}
            style={styles.input}
            focus={false}
            disabled={false}
            placeholderTextColor={WHITE_40}
            placeholderStyle={{}}
            children={null}
          />
          <TemplateBox flex />
          <TemplateBox onPress={() => setIsFilterModalVisible(true)}>
            <DynamicIcon name="Filter" size={24} color={WHITE_60} />
          </TemplateBox>
        </TemplateBox>
        {dummyDocs?.map((letter, index) => (
          <TemplateBox
            key={index}
            backgroundColor={WHITE_5}
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
            onPress={() =>
              navigation.navigate(SUMMARY, { letterId: letter.id })
            }
          >
            <DynamicIcon name={"File"} color={WHITE} size={30} />
            <TemplateBox flex ml={12} justifyContent="center">
              <TemplateText size={16} bold color={WHITE_60}>
                {letter.title}
              </TemplateText>
              <TemplateText size={14} color={WHITE_60} mt={6}>
                {letter.subtitle}
              </TemplateText>
            </TemplateBox>
            <DynamicIcon name={"ArrowRight"} color={WHITE_60} size={20} />
          </TemplateBox>
        ))}
      </TemplateBox>
      <FilterModal
        visible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
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

  input: {
    backgroundColor: BLACK,
    borderRadius: 30,
    color: WHITE,
    width: "90%",
    paddingHorizontal: 12,
    height: 46,
  },
});

export default AllDocumentsScreen;
