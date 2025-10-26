import { useState } from "react";
import ModalBase from "./ModalBase";
import Box from "../Box";
import { WRAPPED_SCREEN_WIDTH, WRAPPER_MARGIN } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import DynamicIcon from "../icons/DynamicIcon";
import TemplateText from "../TemplateText";
import { Switch } from "react-native";

interface ReminderModalProps {
  visible: boolean;
  onClose: () => void;
  item: any;
}
const ReminderModal = ({ visible, onClose, item }: ReminderModalProps) => {
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
      <Box
        pAll={WRAPPER_MARGIN}
        backgroundColor={Colors.BLACK}
        flex
        alignItems="center"
      >
        <Box absolute top={16} left={16} onPress={onClose}>
          <DynamicIcon name={"Close"} size={24} color={Colors.WHITE} />
        </Box>
        <Box pt={50} pAll={WRAPPER_MARGIN} alignItems="center">
          <TemplateText color={Colors.WHITE} size={24} semiBold mb={16} center>
            Set Up Reminders
          </TemplateText>
        </Box>

        <Box
          backgroundColor={Colors.WHITE_5}
          borderRadius={16}
          width={WRAPPED_SCREEN_WIDTH}
          pAll={16}
          mb={54}
        >
          <TemplateText color={Colors.WHITE} size={16} center mb={12}>
            You can set up reminders for important tasks and deadlines.
          </TemplateText>

          <Box>
            {DAYS_OF_WEEK.map((notificationDay, index) => (
              <Box key={index.toString()}>
                <Box row alignItems="center" justifyContent="space-between">
                  <Switch
                    value={isSwitchEnabled}
                    onValueChange={(value) => {
                      setIsSwitchEnabled(value);
                    }}
                    thumbColor={
                      isSwitchEnabled ? Colors.SUCCESS_GREEN : Colors.WHITE_20
                    }
                    trackColor={{
                      false: Colors.WHITE_10,
                      true: Colors.WHITE_20,
                    }}
                    style={{ width: 52 }}
                  />

                  <TemplateText
                    color={Colors.WHITE}
                    size={16}
                    center
                    ml={12}
                    medium
                  >
                    {notificationDay.label}
                  </TemplateText>
                  <Box flex />
                  <Box
                    pv={6}
                    ph={12}
                    borderRadius={12}
                    backgroundColor={Colors.WHITE_5}
                  >
                    <TemplateText
                      color={Colors.WHITE_60}
                      size={16}
                      center
                      medium
                    >
                      {notificationDay.time}
                    </TemplateText>
                  </Box>
                </Box>

                {index !== DAYS_OF_WEEK.length - 1 && (
                  <Box
                    width={WRAPPED_SCREEN_WIDTH - 40}
                    height={1}
                    backgroundColor={Colors.WHITE_5}
                    selfCenter
                    ml={16}
                    mv={16}
                  />
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ModalBase>
  );
};

export default ReminderModal;
