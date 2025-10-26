import React, { JSX } from "react";
import { StyleSheet, ScrollView } from "react-native";
import Box from "./Box";
import TemplateText from "./TemplateText";
import { Colors } from "@/constants/Colors";
import { WRAPPER_MARGIN } from "@/constants/Layout";

interface ToggleTabProps {
  tabs: { label: string; value: string }[];
  activeTab: string;
  onPress: (value: string) => void;
  backgroundColor?: string;
  activeBackgroundColor?: string;
  style?: object;
  titleStyle?: object;
  disabledTabs?: string[];
  activeTextColor?: string;
}
const ToggleTab = ({
  tabs,
  activeTab,
  onPress,
  backgroundColor,
  activeBackgroundColor,
  style,
  titleStyle,
  disabledTabs,
  activeTextColor,
}: ToggleTabProps): JSX.Element => {
  const tabWidth = 130;

  return (
    <ScrollView
      contentContainerStyle={[styles.container, style]}
      horizontal
      snapToInterval={tabWidth * 2}
      decelerationRate="fast"
      snapToAlignment="start"
      showsHorizontalScrollIndicator={false}
    >
      {!!tabs?.length &&
        tabs.map(({ label, value }, id) => (
          <Box
            key={value}
            style={[
              styles.tab,

              disabledTabs && disabledTabs?.includes(value) && { opacity: 0.5 },
              {
                width: tabWidth,
                marginRight: id !== tabs.length - 1 ? 10 : 0,
                backgroundColor:
                  activeTab !== value ? activeBackgroundColor : backgroundColor,
                borderColor:
                  activeTab !== value ? activeBackgroundColor : Colors.WHITE_40,
              },
            ]}
            onPress={() => onPress(value)}
            disabled={disabledTabs && disabledTabs?.includes(value)}
          >
            <TemplateText
              color={activeTab === value ? activeTextColor : Colors.WHITE}
              semiBold
              bold={activeTab === value}
              numberOfLines={1}
              style={[styles.title, titleStyle]}
            >
              {label}
            </TemplateText>
          </Box>
        ))}
    </ScrollView>
  );
};

export default ToggleTab;

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: WRAPPER_MARGIN * 1.5,
    paddingLeft: WRAPPER_MARGIN,
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
  },

  title: {
    fontSize: 12,
  },
});
