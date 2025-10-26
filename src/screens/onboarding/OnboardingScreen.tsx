import React, { useState } from "react";
import { StyleSheet, FlatList } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { Colors } from "@/constants/Colors";
import { SIGN_UP } from "@/navigation/screenNames";
import TemplateText from "@/components/TemplateText";
import { SCREEN_WIDTH } from "@/constants/Layout";
import OnboardingCarousel from "@/components/carousels/OnboardingCarousel";
import { wp } from "@/utils/getResponsiveSize";
import { AuthStackParamList } from "@/navigation/auth/AuthStack";
import Box from "@/components/Box";
import Button from "@/components/Button";
type OnboardingScreen = StackScreenProps<AuthStackParamList, typeof SIGN_UP>;

const OnboardingScreen: React.FC<OnboardingScreen> = ({ navigation }) => {
  const onboardingContent = [
    {
      title: "Scan any official document",
      message:
        "Snap a photo or upload a PDF from mail, email, or portals. Instantly identifies the important details and, if needed, translates from any language into plain, everyday text so you don't miss what matters.",
    },
    {
      title: "Get a plain-language summary",
      message:
        "See what the document is about, who it's from, what it asks, and any amounts or dates. No jargon or legalese, just a clear explanation you can skim in seconds.",
    },
    {
      title: "Know exactly what to do next",
      message:
        "Receive a step-by-step action list with links to forms and booking pages, documents to prepare, and realistic deadlines. Check off tasks as you go and move on with confidence.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const carouselRef = React.useRef<FlatList<any> | null>(null);
  const handleNext = () => {
    if (activeIndex === onboardingContent?.length - 1) {
      navigation.navigate(SIGN_UP);
    } else {
      carouselRef?.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    }
  };

  return (
    <Box alignItems="center" flex backgroundColor={Colors.BLACK}>
      <Box
        ph={25}
        pv={8}
        borderRadius={16}
        onPress={() => navigation.navigate(SIGN_UP)}
        absolute
        right={20}
        top={80}
        backgroundColor={Colors.WHITE_10}
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
        <Box width={SCREEN_WIDTH}>
          <OnboardingCarousel
            showPagination
            dots
            data={onboardingContent}
            renderItem={({ item, index }) => (
              <Box
                justifyContent="center"
                alignItems="center"
                width={SCREEN_WIDTH}
              >
                <Box width={SCREEN_WIDTH} ph={wp(20)} alignItems="center">
                  <TemplateText
                    size={24}
                    bold
                    center
                    mb={8}
                    color={Colors.WHITE}
                  >
                    {item?.title}
                  </TemplateText>
                  <Box height={10} />
                  <Box ph={12} center>
                    <TemplateText
                      size={14}
                      lineHeight={22}
                      center
                      bold
                      color={Colors.GRAY_SCALE_80}
                    >
                      {item?.message}
                    </TemplateText>
                  </Box>
                </Box>
              </Box>
            )}
            paginationSize={onboardingContent?.length}
            snapToInterval={SCREEN_WIDTH}
            flex={1}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            ref={carouselRef}
            activePaginationColor={Colors.WHITE_50}
            inactivePaginationColor={Colors.WHITE_10}
          />
        </Box>
        <Button
          title="Next"
          onPress={handleNext}
          style={{ marginTop: 40, marginBottom: 24, alignSelf: "center" }}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK,
    alignItems: "center",
  },
});
export default OnboardingScreen;
