import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  BLACK,
  DEFAULT_GRADIENT,
  GRAY_SCALE_80,
  WHITE,
  WHITE_10,
} from "../../theme/Colors";
import TemplateText from "../../components/TemplateText";
import { SCREEN_WIDTH, WRAPPED_SCREEN_WIDTH } from "../../theme/Layout";

import TemplateBox from "../../components/TemplateBox";
import OnboardingCarousel from "../../components/carousels/OnboardingCarousel";
import { SIGN_UP } from "../../navigation/ScreenNames";
import { wp } from "../../Utils/getResponsiveSize";
import Box from "../../components/Box";
import { StackScreenProps } from "@react-navigation/stack";
//@ts-ignore
import onboardingFirstImage from "../../../assets/images/onboarding/OnboardingFirst.png";
//@ts-ignore
import onboardingSecondImage from "../../../assets/images/onboarding/OnboardingSecond.png";
//@ts-ignore
import onboardingThirdImage from "../../../assets/images/onboarding/OnboardingThird.png";

type RootStackParamList = {
  OnboardingScreen: undefined;
  SignUp: undefined;
};

type OnboardingScreen = StackScreenProps<
  RootStackParamList,
  "OnboardingScreen"
>;

const OnboardingScreen: React.FC<OnboardingScreen> = ({ navigation }) => {
  const onboardingContent = [
    {
      title: "Scan any official document",
      message:
        "Snap a photo or upload a PDF from mail, email, or portals. Instantly identifies the important details and, if needed, translates from any language into plain, everyday text so you don't miss what matters.",
      image: onboardingFirstImage,
    },
    {
      title: "Get a plain-language summary",
      message:
        "See what the document is about, who it's from, what it asks, and any amounts or dates. No jargon or legalese, just a clear explanation you can skim in seconds.",
      image: onboardingSecondImage,
    },
    {
      title: "Know exactly what to do next",
      message:
        "Receive a step-by-step action list with links to forms and booking pages, documents to prepare, and realistic deadlines. Check off tasks as you go and move on with confidence.",
      image: onboardingThirdImage,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = React.useRef<{
    scrollToIndex: (params: {
      index: number;
      animated?: boolean;
      useNativeDriver?: boolean;
    }) => void;
  } | null>(null);
  const handleNext = () => {
    if (activeIndex === onboardingContent?.length - 1) {
      navigation.navigate(SIGN_UP);
    } else {
      carouselRef?.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
        useNativeDriver: true,
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
        borderRadius={16}
        onPress={() => navigation.navigate(SIGN_UP)}
        absolute
        right={20}
        top={80}
        backgroundColor={WHITE_10}
        zIndex={1}
      >
        <TemplateText size={14}>Skip</TemplateText>
      </Box>
      {/* <Box height={404} width={SCREEN_WIDTH} mt={HEADER_MARGIN * 2}>
        <Image
          source={onboardingContent[activeIndex]?.image}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </Box> */}
      <Box pb={40} borderRadius={32} absolute bottom={40}>
        <TemplateBox width={SCREEN_WIDTH}>
          <OnboardingCarousel
            showPagination
            dots
            data={onboardingContent}
            renderItem={({ item, index }) => (
              <TemplateBox
                justifyContent="center"
                alignItems="center"
                width={SCREEN_WIDTH}
              >
                <Box width={SCREEN_WIDTH} ph={wp(20)} alignItems="center">
                  <TemplateText size={24} bold center mb={8} color={WHITE}>
                    {item?.title}
                  </TemplateText>
                  <TemplateBox height={10} />
                  <Box ph={12} center>
                    <TemplateText
                      size={14}
                      lineHeight={22}
                      center
                      bold
                      color={GRAY_SCALE_80}
                    >
                      {item?.message}
                    </TemplateText>
                  </Box>
                </Box>
              </TemplateBox>
            )}
            paginationSize={onboardingContent?.length}
            snapToInterval={SCREEN_WIDTH}
            flex={1}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            //@ts-ignore
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
export default OnboardingScreen;
