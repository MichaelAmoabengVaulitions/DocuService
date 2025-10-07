import React, { useState, useEffect } from "react";
import { View, StyleSheet, Animated, ScrollView } from "react-native";
import PropTypes, { shape } from "prop-types";
import { WRAPPED_SCREEN_WIDTH, WRAPPER_MARGIN } from "../theme/Layout";
import TemplateTouchable from "./TemplateTouchable";
import TemplateText from "./TemplateText";
import { BRAND_BLUE, FOREST_GREEN, WHITE, WHITE_10 } from "../theme/Colors";

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
}) => {
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
          <TemplateTouchable
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
                  activeTab !== value ? activeBackgroundColor : FOREST_GREEN,
              },
            ]}
            onPress={() => onPress(value)}
            disabled={disabledTabs && disabledTabs?.includes(value)}
          >
            <TemplateText
              color={activeTab === value ? activeTextColor : WHITE}
              semibold
              bold={activeTab === value}
              numberOfLines={1}
              style={[styles.title, titleStyle]}
            >
              {label}
            </TemplateText>
          </TemplateTouchable>
        ))}
    </ScrollView>
  );
};

export default ToggleTab;

ToggleTab.propTypes = {
  tabs: PropTypes.arrayOf(
    shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  backgroundColor: PropTypes.string,
  activeBackgroundColor: PropTypes.string,
  titleStyle: PropTypes.shape({}),
  disabledTabs: PropTypes.arrayOf(PropTypes.string),
  activeTextColor: PropTypes.string,
  style: PropTypes.shape({}),
};

ToggleTab.defaultProps = {
  onPress: null,
  backgroundColor: WHITE_10,
  activeBackgroundColor: FOREST_GREEN,
  titleStyle: null,
  disabledTabs: [],
  activeTextColor: WHITE,
  style: null,
};

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
