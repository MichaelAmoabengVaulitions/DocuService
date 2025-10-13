import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { WRAPPER_MARGIN } from "../../../theme/Layout";
import { BLACK, WHITE, WHITE_5, WHITE_60 } from "../../../theme/Colors";

import TemplateText from "../../../components/TemplateText";
import TemplateBox from "../../../components/TemplateBox";
import DynamicIcon from "../../../components/icons/DynamicIcon";
//@ts-ignore

type ProfileScreenProps = {
  navigation: any;
};

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const profileItems = [
    {
      title: "Personal Information",
      subtitle: "Update your personal details",
      icon: "Info",
    },
    {
      title: "Security",
      subtitle: "Change your password and secure your account",
      icon: "Lock",
    },
    {
      title: "Notifications",
      subtitle: "Manage your notification preferences",
      icon: "Bell",
    },
    {
      title: "Privacy Policy & Terms",
      subtitle: "Review our policies and terms",
      icon: "Shield",
    },
    {
      title: "Help & Support",
      subtitle: "Get assistance and find FAQs",
      icon: "HelpCircle",
    },
    {
      title: "Delete Account",
      subtitle: "Permanently delete your account",
      icon: "Trash",
    },
    {
      title: "Logout",
      subtitle: "Sign out of your account",
      icon: "Logout",
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <TemplateBox ph={WRAPPER_MARGIN}>
        <TemplateText semiBold size={20} mb={16} mt={120} color={WHITE}>
          Account Settings
        </TemplateText>

        {profileItems.map((item, index) => (
          <TemplateBox
            key={index}
            backgroundColor={WHITE_5}
            borderRadius={8}
            pAll={16}
            mb={12}
            row
            alignItems="center"
            onPress={() => {
              // Handle navigation or action for each item
              console.log(`Navigating to ${item.title}`);
            }}
          >
            <TemplateBox>
              <TemplateText color={WHITE} size={16} bold>
                {item.title}
              </TemplateText>
              <TemplateText color={WHITE_60} size={14} mt={4}>
                {item.subtitle}
              </TemplateText>
            </TemplateBox>
            <TemplateBox flex />
            <DynamicIcon name={"ArrowRight"} color={WHITE_60} size={24} />
          </TemplateBox>
        ))}
      </TemplateBox>
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
});

export default ProfileScreen;
