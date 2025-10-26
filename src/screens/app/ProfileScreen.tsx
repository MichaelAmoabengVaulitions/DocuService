import Box from "@/components/Box";
import DynamicIcon from "@/components/icons/DynamicIcon";
import TemplateText from "@/components/TemplateText";
import { Colors } from "@/constants/Colors";
import { WRAPPER_MARGIN } from "@/constants/Layout";
import React from "react";
import { StyleSheet, ScrollView } from "react-native";

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
      onPress: () => {},
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <Box ph={WRAPPER_MARGIN}>
        <TemplateText semiBold size={20} mb={16} mt={120} color={Colors.WHITE}>
          Account Settings
        </TemplateText>

        {profileItems.map((item, index) => (
          <Box
            key={index}
            backgroundColor={Colors.WHITE_5}
            borderRadius={16}
            pAll={16}
            mb={16}
            row
            alignItems="center"
            onPress={item?.onPress}
          >
            <Box width={"80%"}>
              <TemplateText color={Colors.WHITE} size={16} bold>
                {item.title}
              </TemplateText>
              <TemplateText color={Colors.WHITE_60} size={14} mt={4}>
                {item.subtitle}
              </TemplateText>
            </Box>
            <Box flex />
            <DynamicIcon
              name={"ArrowRight"}
              color={Colors.WHITE_60}
              size={24}
            />
          </Box>
        ))}
      </Box>
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
});

export default ProfileScreen;
