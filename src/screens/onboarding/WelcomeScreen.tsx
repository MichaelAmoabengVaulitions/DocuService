import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import {
  BLACK,
  DEFAULT_GRADIENT,
  GRAY_SCALE_80,
  WHITE,
  WHITE_10,
} from "../../theme/Colors";
import TemplateText from "../../components/TemplateText";
import {
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  WRAPPED_SCREEN_WIDTH,
} from "../../theme/Layout";
import TemplateBox from "../../components/TemplateBox";
import OnboardingCarousel from "../../components/carousels/OnboardingCarousel";
import { ONBOARDING } from "../../navigation/ScreenNames";
import { wp } from "../../Utils/getResponsiveSize";
import Box from "../../components/Box";
import { StackScreenProps } from "@react-navigation/stack";
//@ts-ignore
type RootStackParamList = {
  WelcomeScreen: undefined;
  onboarding: undefined;
};

type WelcomeScreen = StackScreenProps<RootStackParamList, "WelcomeScreen">;

const WelcomeScreen: React.FC<WelcomeScreen> = ({ navigation }) => {
  const welcomeContent = [
    {
      title: "LetterPlan",
      message:
        "Plain-language summaries with checklists and deadlines. More clarity. Start with your next letter.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = React.useRef<FlatList<any>>(null);
  const handleNext = () => {
    if (activeIndex === welcomeContent?.length - 1) {
      navigation.navigate(ONBOARDING);
    } else {
      carouselRef?.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  return (
    <Box
      alignItems="center"
      flex
      backgroundColor={BLACK}
      vGradient
      gradientColors={DEFAULT_GRADIENT}
      gradientEndBalance={0.6}
      gradientStartBalance={0.3}
    >
      <Box
        ph={25}
        pv={8}
        borderRadius={20}
        onPress={() => navigation.navigate(ONBOARDING)}
        absolute
        right={20}
        top={80}
        backgroundColor={WHITE_10}
        zIndex={1}
        borderWidth={1}
        borderColor={WHITE_10}
      >
        <TemplateText size={14}>Skip</TemplateText>
      </Box>
      {/* <Box height={504} width={SCREEN_WIDTH} mt={HEADER_MARGIN}>
        <Image
          source={welcomeBackground}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </Box> */}
      <Box
        pb={40}
        absolute
        bottom={SCREEN_HEIGHT * 0.3}
        justifyContent="center"
        alignItems="center"
        width={SCREEN_WIDTH}
      >
        <TemplateBox width={WRAPPED_SCREEN_WIDTH}>
          <OnboardingCarousel
            showPagination
            dots
            data={welcomeContent}
            renderItem={({ item, index }) => (
              <TemplateBox
                justifyContent="center"
                alignItems="center"
                width={WRAPPED_SCREEN_WIDTH}
              >
                <Box
                  width={WRAPPED_SCREEN_WIDTH}
                  ph={wp(24)}
                  alignItems="center"
                >
                  <TemplateText size={30} bold center mb={8} color={WHITE}>
                    {item?.title}
                  </TemplateText>
                  <TemplateBox height={10} />
                  <TemplateText size={18} center semiBold color={GRAY_SCALE_80}>
                    {item?.message}
                  </TemplateText>
                </Box>
              </TemplateBox>
            )}
            paginationSize={welcomeContent?.length}
            snapToInterval={WRAPPED_SCREEN_WIDTH}
            flex={1}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            ref={carouselRef}
          />
        </TemplateBox>
        <Box
          backgroundColor={BLACK}
          pv={16}
          width={WRAPPED_SCREEN_WIDTH - 40}
          borderRadius={30}
          row
          center
          onPress={handleNext}
          mt={20}
          selfCenter
          borderWidth={1}
          borderColor={WHITE_10}
        >
          <TemplateText color={WHITE} size={16} semiBold>
            Next
          </TemplateText>
        </Box>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
    alignItems: "center",
  },
});
export default WelcomeScreen;
