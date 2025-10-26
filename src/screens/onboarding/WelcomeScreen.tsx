import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import TemplateText from "../../components/TemplateText";
import { ONBOARDING, WELCOME } from "@/navigation/screenNames";
import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "@/navigation/auth/AuthStack";
import Box from "@/components/Box";
import { Colors } from "@/constants/Colors";
import { SCREEN_WIDTH, WRAPPED_SCREEN_WIDTH } from "@/constants/Layout";
import { wp } from "@/utils/getResponsiveSize";
import OnboardingCarousel from "@/components/carousels/OnboardingCarousel";
import Button from "@/components/Button";

type WelcomeScreen = StackScreenProps<AuthStackParamList, typeof WELCOME>;

const WelcomeScreen: React.FC<WelcomeScreen> = ({ navigation }) => {
  const welcomeContent = [
    {
      title: "DocuService",
      message:
        "Plain-language summaries with checklists and deadlines. More clarity. Start with your next document.",
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
    <Box alignItems="center" flex backgroundColor={Colors.BLACK}>
      <Box
        ph={25}
        pv={8}
        borderRadius={20}
        onPress={() => navigation.navigate(ONBOARDING)}
        absolute
        right={20}
        top={80}
        backgroundColor={Colors.WHITE_10}
        zIndex={1}
        borderWidth={1}
        borderColor={Colors.WHITE_10}
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
        bottom={0}
        justifyContent="center"
        alignItems="center"
        width={SCREEN_WIDTH}
      >
        <Box width={WRAPPED_SCREEN_WIDTH}>
          <OnboardingCarousel
            showPagination
            dots
            data={welcomeContent}
            renderItem={({ item, index }) => (
              <Box
                justifyContent="center"
                alignItems="center"
                width={WRAPPED_SCREEN_WIDTH}
              >
                <Box
                  width={WRAPPED_SCREEN_WIDTH}
                  ph={wp(24)}
                  alignItems="center"
                >
                  <TemplateText
                    size={30}
                    bold
                    center
                    mb={8}
                    color={Colors.WHITE}
                  >
                    {item?.title}
                  </TemplateText>
                  <Box height={10} />
                  <TemplateText
                    size={18}
                    center
                    semiBold
                    color={Colors.GRAY_SCALE_80}
                  >
                    {item?.message}
                  </TemplateText>
                </Box>
              </Box>
            )}
            paginationSize={welcomeContent?.length}
            snapToInterval={WRAPPED_SCREEN_WIDTH}
            flex={1}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            ref={carouselRef}
          />
        </Box>

        <Button
          title="Get Started"
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
export default WelcomeScreen;
