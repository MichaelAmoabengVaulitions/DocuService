import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Alert, Image } from "react-native";

//import { useIsFocused } from '@react-navigation/native';
//import messaging from '@react-native-firebase/messaging';
import {
  BLACK,
  BLACK_70,
  BLACK_90,
  DARK_OVERLAY,
  DEFAULT_GRADIENT,
  FOREST_GREEN,
  GREY_30,
  IOS_BLUE,
  LIGHT_GREEN,
  TRANSPARENT,
  WHITE,
  WHITE_20,
  WHITE_50,
  WHITE_60,
  WHITE_80,
} from "../../../theme/Colors";
import {
  HEADER_MARGIN,
  IS_ANDROID,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  WRAPPED_SCREEN_WIDTH,
  WRAPPER_MARGIN,
} from "../../../theme/Layout";
import homeHeroImage from "../../../../assets/images/home/home-hero.png";
//import Greeting from './components /Greeting';
import useAuthContext from "../../../hooks/auth/useAuthContext";
// import RecommendedBrandsCarousel from './components /RecommendedBrandsCarousel';
// import HeaderIconButton from '../../../components/header/HeaderButton';
// import {
//     BRANDS_CATALOGUE, FEED_DETAILS, PROFILE_STACK, UGCAI,
// } from '../../../navigation/ScreenNames';
import useFeatureFlags from "../../../hooks/featureFlags/useFeatureFlags";
import TemplateBox from "../../../components/TemplateBox";
import TemplateText from "../../../components/TemplateText";
// import CatalogueSvg from '../../../../assets/svgs/CatalogueSvg';
// import { SHADOW } from '../../../theme/Shadow';
// import useAppReview from '../../../hooks/useAppReview';
// import TemplateIcon from '../../../components/TemplateIcon';
// import { wp } from '../../../Utils/getResponsiveSize';
// import FeedsTab from '../explore/components/FeedsTab';
// import FeedCard from '../explore/components/FeedCard';
// import getIconByType from '../../../Utils/getIconByType';
// import AffiliateBrandsCarousel from './components /AffiliateBrandsCarousel';
// import BrandsCarousel from './components /BrandsCarousel';
// import EventsCarousel from './components /EventsCarousel';
// import useProfile from '../../../hooks/user/useProfile';
// import FeaturedCreatorsCarousel from '../../brands/admin/components/FeaturedCreatorsCarousel';
// import ProjectsCarousel from './components /ProjectsCarousel';
// import EmergingBrandsCarousel from './components /EmergingBrandsCarousel';
import DynamicIcon from "../../../components/icons/DynamicIcon";
import { SCAN_LETTER } from "../../../navigation/ScreenNames";

const TILE_GUTTER = 12; // space between tiles (matches TK feel)
const TILE_WIDTH = (SCREEN_WIDTH - WRAPPER_MARGIN * 2 - TILE_GUTTER) / 2;
const HomeScreen = ({ navigation }) => {
  const { auth } = useAuthContext();

  const TOOLS = [
    {
      title: "Scan Letter",
      description:
        "Take a photo of an official letter. We detect the text, extract key fields, and start the analysis.",
      category: "Letters",
      icon: "Scan",
      onPress: () => navigation.navigate(SCAN_LETTER),
    },
    {
      title: "Import PDF",
      description:
        "Upload a PDF you received by email. We parse the text and prepare a summary with action points.",
      category: "Letters",
      icon: "ImportFile",
    },
    {
      title: "Your Next Steps",
      description:
        "See tasks generated from your letters. Pay, send a draft email, or add reminders in one tap.",
      category: "Actions",
      icon: "Transport",
    },
    {
      title: "Recent Letters",
      description:
        "Reopen past scans with their summaries, deadlines, and plan status all in one place.",
      category: "History",
      icon: "Family",
    },
    {
      title: "Explain Terms",
      description:
        "Plain-language meanings for common fields in German letters.",
      category: "Help",
      icon: "Shopping",
    },
    {
      title: "Privacy & Security",
      description:
        "Learn how data is stored in the EU and how originals are automatically deleted after 48 hours.",
      category: "Help",
      icon: "Health",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <TemplateBox
        vGradient
        gradientColors={DEFAULT_GRADIENT}
        height={SCREEN_HEIGHT * 0.38}
        pt={HEADER_MARGIN}
        gradientEndBalance={0.9}
        gradientStartBalance={0.2}
      >
        <TemplateBox
          alignItems="center"
          row
          justifyContent="space-between"
          mv={40}
          ph={WRAPPER_MARGIN}
        >
          <TemplateBox>
            <DynamicIcon name={"Profile"} color={WHITE} size={30} />
          </TemplateBox>
          <TemplateBox flex />
          <TemplateBox row alignItems="center" justifyContent="space-between">
            <TemplateBox mr={12}>
              <DynamicIcon name={"Bell"} color={WHITE} size={24} />
            </TemplateBox>

            <TemplateBox>
              <DynamicIcon name={"Saved"} color={WHITE} size={24} />
            </TemplateBox>
          </TemplateBox>
        </TemplateBox>
        <TemplateBox row alignItems="center" ph={WRAPPER_MARGIN}>
          <TemplateBox mt={130}>
            <TemplateText color={WHITE} size={14}>
              Hello
            </TemplateText>
            <TemplateText color={WHITE} size={24} bold>
              Michael Amoabeng
            </TemplateText>
          </TemplateBox>
          <TemplateBox flex />
          <TemplateBox absolute right={-40} top={-30}>
            <Image source={homeHeroImage} style={styles.heroImage} />
          </TemplateBox>
        </TemplateBox>
      </TemplateBox>
      <TemplateBox style={styles.gridWrapper}>
        <TemplateBox style={styles.grid} row flexWrap="wrap">
          {TOOLS.map((tool, index) => (
            <TemplateBox
              key={index}
              style={[styles.tile, { width: TILE_WIDTH }]}
              onPress={tool.onPress}
            >
              <TemplateBox style={styles.tileIconWrap}>
                <DynamicIcon name={tool.icon} size={34} color={FOREST_GREEN} />
              </TemplateBox>

              <TemplateText style={styles.tileLabel} semiBold center size={16}>
                {tool.title}
              </TemplateText>
            </TemplateBox>
          ))}
        </TemplateBox>
      </TemplateBox>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BLACK,
  },
  contentContainer: {
    flexGrow: 1,
    //paddingTop: HEADER_MARGIN,
  },
  heroImage: {
    width: 340,
    height: 260,
    resizeMode: "contain",
    alignSelf: "flex-end",
  },
  gridWrapper: {
    marginHorizontal: WRAPPER_MARGIN,
    marginTop: 20,
    marginBottom: 24,
  },
  grid: {
    justifyContent: "space-between", // ensures 2 columns with even gap
  },
  tile: {
    height: 150,
    marginBottom: TILE_GUTTER,
    backgroundColor: WHITE_20,
    borderColor: WHITE_20,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  tileIconWrap: {
    height: 48,
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  tileLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
});
export default HomeScreen;
