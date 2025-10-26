import ModalBase from "./ModalBase";
import Box from "../Box";
import { WRAPPED_SCREEN_WIDTH, WRAPPER_MARGIN } from "@/constants/Layout";
import { Colors } from "@/constants/Colors";
import DynamicIcon from "../icons/DynamicIcon";
import TemplateText from "../TemplateText";

interface ActionPlanItemModalProps {
  visible: boolean;
  onClose: () => void;
  item: any;
}
const ActionPlanItemModal = ({
  visible,
  onClose,
  item,
}: ActionPlanItemModalProps) => {
  return (
    <ModalBase isVisible={visible} onClose={onClose}>
      <Box flex backgroundColor={Colors.BLACK} alignItems="center">
        <Box absolute top={16} left={16} onPress={onClose} zIndex={10}>
          <DynamicIcon name={"Close"} size={24} color={Colors.WHITE} />
        </Box>
        <Box pt={50} flex pAll={WRAPPER_MARGIN} alignItems="center">
          <TemplateText color={Colors.WHITE} size={24} semiBold mb={16} center>
            {item?.title}
          </TemplateText>
          <TemplateText color={Colors.WHITE_70} size={16} center>
            {item?.description}
          </TemplateText>

          <Box
            mt={24}
            backgroundColor={Colors.WHITE_5}
            borderRadius={16}
            width={WRAPPED_SCREEN_WIDTH}
            pAll={16}
          >
            <Box row alignItems="center" justifyContent="space-between">
              <TemplateText color={Colors.WHITE} size={16} center>
                Due date
              </TemplateText>
              <Box flex />
              <TemplateText color={Colors.WHITE_50} size={16} center>
                {new Date(item?.dueDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </TemplateText>
            </Box>
            <Box
              width={WRAPPED_SCREEN_WIDTH - 20}
              height={1}
              backgroundColor={Colors.WHITE_5}
              selfCenter
              ml={16}
              mt={12}
              mb={16}
            />

            <Box row alignItems="center" justifyContent="space-between">
              <TemplateText color={Colors.WHITE} size={16} center>
                Risk Level
              </TemplateText>
              <Box flex />
              <TemplateText color={Colors.WHITE_50} size={16} center>
                {item?.riskLevel || "High"}
              </TemplateText>
            </Box>

            <Box
              width={WRAPPED_SCREEN_WIDTH - 20}
              height={1}
              backgroundColor={Colors.WHITE_5}
              selfCenter
              ml={16}
              mt={12}
              mb={16}
            />

            <Box row alignItems="center" justifyContent="space-between">
              <TemplateText color={Colors.WHITE} size={16} center>
                Documents
              </TemplateText>
              <Box flex />
              <Box width={"60%"} alignItems="flex-end">
                {item?.documentsToPrepare?.length > 0 ? (
                  item.documentsToPrepare.map((doc: string, index: number) => (
                    <TemplateText
                      key={index}
                      color={Colors.WHITE_50}
                      size={16}
                      right
                    >
                      {doc}
                    </TemplateText>
                  ))
                ) : (
                  <TemplateText color={Colors.WHITE_50} size={16} center>
                    None
                  </TemplateText>
                )}
              </Box>
            </Box>

            <Box
              width={WRAPPED_SCREEN_WIDTH - 20}
              height={1}
              backgroundColor={Colors.WHITE_5}
              selfCenter
              ml={16}
              mt={12}
              mb={16}
            />

            <Box row alignItems="center" justifyContent="space-between">
              <TemplateText color={Colors.WHITE} size={16} left>
                Evidence
              </TemplateText>
              <Box flex />
              <Box width={"60%"} alignItems="flex-end">
                <TemplateText color={Colors.WHITE_50} size={16} right>
                  {item?.evidence?.quote}
                </TemplateText>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </ModalBase>
  );
};

export default ActionPlanItemModal;
