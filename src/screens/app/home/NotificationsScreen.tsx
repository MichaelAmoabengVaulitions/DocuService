import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { WRAPPER_MARGIN } from "../../../theme/Layout";
import { BLACK, WHITE, WHITE_5, WHITE_60 } from "../../../theme/Colors";

import TemplateText from "../../../components/TemplateText";
import TemplateBox from "../../../components/TemplateBox";
import DynamicIcon from "../../../components/icons/DynamicIcon";

type NotificationsScreenProps = {
  navigation: any;
};

const NotificationsScreen = ({ navigation }: NotificationsScreenProps) => {
  const notifications = [
    {
      dateLabel: "Yesterday",
      items: [
        {
          time: "8:17 PM",
          title: "Deadline in 3 days.",
          body: "We’ll remind you 24 hours before the cutoff.",
        },
        {
          time: "6:40 PM",
          title: "New letter analyzed: Finanzamt.",
          body: "Plain summary and next steps are ready. Tap to review.",
        },
        {
          time: "4:05 PM",
          title: "Payment details extracted.",
          body: "IBAN and reference copied to your clipboard.",
        },
        {
          time: "2:12 PM",
          title: "Field check needed.",
          body: "The customer number looks unclear—confirm to finish.",
        },
        {
          time: "9:30 AM",
          title: "Compare found a change.",
          body: "Latest notice increased the amount to €312.40.",
        },
      ],
    },
    {
      dateLabel: "October 12",
      items: [
        {
          time: "7:58 PM",
          title: "Draft reply prepared.",
          body: "Polite German + English version saved to the letter.",
        },
        {
          time: "5:21 PM",
          title: "Reminder scheduled.",
          body: "We’ll nudge you 3 days and 1 day before the deadline.",
        },
        {
          time: "1:09 PM",
          title: "Attachment missing.",
          body: "Letter mentions “page 2.” Upload the second page if you have it.",
        },
        {
          time: "10:02 AM",
          title: "Inbox import is on.",
          body: "We’ll auto-detect official PDFs from Gmail.",
        },
      ],
    },
    {
      dateLabel: "October 11",
      items: [
        {
          time: "4:46 PM",
          title: "Case folder created.",
          body: "“Tax back-payment 2025” now groups 3 related letters.",
        },
        {
          time: "12:33 PM",
          title: "Calendar synced.",
          body: "Deadline added to your calendar with a link to the summary.",
        },
        {
          time: "8:55 AM",
          title: "Auto-delete complete.",
          body: "Original scan removed after 48 hours. Copies remain in summaries.",
        },
      ],
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <TemplateBox ph={WRAPPER_MARGIN}>
        <TemplateText semiBold size={20} mb={16} mt={120} color={WHITE}>
          Notifications
        </TemplateText>

        {notifications.map((group) => (
          <React.Fragment key={group.dateLabel}>
            <TemplateText semiBold size={16} mb={8} mt={20} color={WHITE}>
              {group.dateLabel}
            </TemplateText>

            {group.items.map((n, idx) => (
              <TemplateBox
                key={`${group.dateLabel}-${idx}`}
                backgroundColor={WHITE_5}
                borderRadius={8}
                pAll={16}
                mb={12}
                row
                alignItems="center"
                onPress={() => {
                  // Handle tap on a notification
                  console.log(`Open: ${n.title}`);
                }}
              >
                <TemplateBox style={{ flex: 1 }}>
                  <TemplateText color={WHITE_60} size={14} mb={8}>
                    {n.time}
                  </TemplateText>
                  <TemplateText color={WHITE} size={16} bold>
                    {n.title}
                  </TemplateText>
                  <TemplateText color={WHITE_60} size={14} mt={4}>
                    {n.body}
                  </TemplateText>
                </TemplateBox>

                <DynamicIcon name={"ArrowRight"} color={WHITE_60} size={24} />
              </TemplateBox>
            ))}
          </React.Fragment>
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

export default NotificationsScreen;
