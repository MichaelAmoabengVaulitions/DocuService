import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
    ScrollView, StyleSheet, Alert,
} from 'react-native';

import { useIsFocused } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import {
    BLACK,
    GREY_30,
    IOS_BLUE,
    LIGHT_GREEN, TRANSPARENT,
    WHITE,
    WHITE_20,
    WHITE_50,
    WHITE_60,
    WHITE_80,
} from '../../../theme/Colors';
import {
    HEADER_MARGIN, IS_ANDROID, SCREEN_WIDTH, WRAPPED_SCREEN_WIDTH,
    WRAPPER_MARGIN,
} from '../../../theme/Layout';
import Greeting from './components /Greeting';
import useAuthContext from '../../../hooks/auth/useAuthContext';
import RecommendedBrandsCarousel from './components /RecommendedBrandsCarousel';
import HeaderIconButton from '../../../components/header/HeaderButton';
import {
    BRANDS_CATALOGUE, FEED_DETAILS, PROFILE_STACK, UGCAI,
} from '../../../navigation/ScreenNames';
import useFeatureFlags from '../../../hooks/featureFlags/useFeatureFlags';
import TemplateBox from '../../../components/TemplateBox';
import TemplateText from '../../../components/TemplateText';
import CatalogueSvg from '../../../../assets/svgs/CatalogueSvg';
import { SHADOW } from '../../../theme/Shadow';
import useAppReview from '../../../hooks/useAppReview';
import TemplateIcon from '../../../components/TemplateIcon';
import { wp } from '../../../Utils/getResponsiveSize';
import FeedsTab from '../explore/components/FeedsTab';
import FeedCard from '../explore/components/FeedCard';
import getIconByType from '../../../Utils/getIconByType';
import AffiliateBrandsCarousel from './components /AffiliateBrandsCarousel';
import BrandsCarousel from './components /BrandsCarousel';
import EventsCarousel from './components /EventsCarousel';
import useProfile from '../../../hooks/user/useProfile';
import FeaturedCreatorsCarousel from '../../brands/admin/components/FeaturedCreatorsCarousel';
import ProjectsCarousel from './components /ProjectsCarousel';
import EmergingBrandsCarousel from './components /EmergingBrandsCarousel';
import DynamicIcon from '../../../components/icons/DynamicIcon';
import { ca, sr } from 'date-fns/locale';

const HomeScreen = ({ navigation }) => {
    const { auth } = useAuthContext();
    const dummySmartTasks = [
        { title: 'Upload work-permit payslips', subtitle: 'Due in 3 days' },
        { title: 'Book Bürgeramt appointment (Anmeldung)', subtitle: 'Due tomorrow' },
    ]
    const categories = [
        { id: 'c1', label: 'Immigration', icon: 'Immigration' },
        { id: 'c2', label: 'Housing', icon: 'House' },
        { id: 'c3', label: 'Work', icon: 'Work' },
        { id: 'c4', label: 'Health', icon: 'Health' },
        { id: 'c5', label: 'Finance', icon: 'Finance' },
        { id: 'c6', label: 'Language', icon: 'Language' },
        { id: 'c7', label: 'Social', icon: 'Social' },
        { id: 'c8', label: 'Transport', icon: 'Transport' },
        { id: 'c9', label: 'Family', icon: 'Family' },
        { id: 'c10', label: 'Shopping', icon: 'Shopping' },
    ];
    const TOOLS = [
        { title: 'Queue‑Intel Coach', description: 'See real‑world wait times for residence permits and track your place in line.', category: 'Immigration', icon: 'Immigration' },
        { title: 'Slot‑Sniper', description: 'Auto‑monitor visa sites and grab a fresh appointment instantly.', category: 'Immigration', icon: 'Immigration' },
        { title: 'DocLens AR', description: 'Scan German letters and get clear English summaries with deadlines.', category: 'Immigration', icon: 'Immigration' },

        { title: 'RentRadar', description: 'Find new flats first with live listings and Anmeldung‑friendly filters.', category: 'Housing', icon: 'House' },
        { title: 'TrustBadge', description: 'Share a secure renter badge proving SCHUFA, income and references.', category: 'Housing', icon: 'House' },
        { title: 'Contract‑Autopilot', description: 'Scan utility contracts and send cancellation letters in one tap.', category: 'Housing', icon: 'House' },

        { title: 'PermitPath', description: 'Follow a personalised timeline for your work or Blue Card application.', category: 'Work', icon: 'Work' },
        { title: 'QualiMatch', description: 'Check German recognition of your degree and auto‑generate paperwork.', category: 'Work', icon: 'Work' },
        { title: 'WorkCulture Coach', description: 'Get real‑time chat tips on German workplace norms and etiquette.', category: 'Work', icon: 'Work' },

        { title: 'PolicyPicker', description: 'Compare health insurers with clear cost breakdowns and English tips.', category: 'Health', icon: 'Health' },
        { title: 'MedQueue Optimizer', description: 'Find the earliest specialist slot or switch to tele‑visit fast.', category: 'Health', icon: 'Health' },
        { title: 'MindBridge', description: 'Daily CBT exercises, mood check‑ins and priority therapist booking.', category: 'Health', icon: 'Health' },

        { title: 'KYC‑Lite Wallet', description: 'Open a bank account remotely with secure eID verification.', category: 'Finance', icon: 'Finance' },
        { title: 'Credit Nudge', description: 'Track and grow your SCHUFA score with smart payment reminders.', category: 'Finance', icon: 'Finance' },
        { title: 'PayBlend', description: 'See if shops prefer cash, card or mobile pay before you go.', category: 'Finance', icon: 'Finance' },

        { title: 'Bureaucracy Bot', description: 'Upload official forms and get plain‑English instructions.', category: 'Language', icon: 'Language' },
        { title: 'SpeechLens', description: 'Live speech‑to‑speech translation during appointments.', category: 'Language', icon: 'Language' },
        { title: 'Vocab‑In‑Situ', description: 'AR overlays translate signs and labels with flashcard review.', category: 'Language', icon: 'Language' },

        { title: 'ConnectPulse', description: 'Detect loneliness signals and discover nearby meet‑ups.', category: 'Social', icon: 'Social' },
        { title: 'SocialGraph Mapper', description: 'Aggregate events and suggest the best matches for you.', category: 'Social', icon: 'Social' },
        { title: 'TandemMatch', description: 'Find language‑exchange partners with accent feedback.', category: 'Social', icon: 'Social' },

        { title: 'StrikeSentinel', description: 'Get rail‑strike forecasts and instant alternative routes.', category: 'Transport', icon: 'Transport' },
        { title: 'TicketVault', description: 'Store your Deutschlandticket securely and track renewals.', category: 'Transport', icon: 'Transport' },
        { title: 'LicenceTracker', description: 'Monitor licence conversion steps and schedule TÜV tests.', category: 'Transport', icon: 'Transport' },

        { title: 'Kita‑Scout', description: 'Heat‑map search and wait‑list tracking for day‑care spots.', category: 'Family', icon: 'Family' },
        { title: 'SchoolFit', description: 'Compare schools by curriculum, fees and commute time.', category: 'Family', icon: 'Family' },
        { title: 'FamilyFin‑Advisor', description: 'Simulate benefits and tax classes with timely alerts.', category: 'Family', icon: 'Family' },

        { title: 'ShopPlanner', description: 'Plan grocery runs around Sunday closures with smart lists.', category: 'Shopping', icon: 'Shopping' },
        { title: 'RecycleCam', description: 'Snap items to see the right recycling bin and refund value.', category: 'Shopping', icon: 'Shopping' },
        { title: 'ExitHelper', description: 'Generate cancellation letters for utilities when you move.', category: 'Shopping', icon: 'Shopping' },
    ];

    const [selectedCategory, setSelectedCategory] = useState(categories[0].label);
    const filteredTools = useMemo(
        () => TOOLS.filter(t => !selectedCategory || t.category === selectedCategory),
        [selectedCategory],
    )

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
        >
            <TemplateBox alignItems="center" row justifyContent="space-between" mb={20}>
                <TemplateBox
                    ml={WRAPPER_MARGIN}
                    height={wp(50)}
                    width={wp(50)}
                    borderRadius={wp(30)}
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={WHITE_20}
                >
                    <TemplateText color={GREY_30} medium size={18}>MA</TemplateText>
                </TemplateBox>
                <TemplateBox ml={8}>
                    <TemplateText color={WHITE} medium size={16}>You have 2 new tasks</TemplateText>
                </TemplateBox>
                <TemplateBox flex />
                <TemplateBox row alignItems="center" justifyContent="space-between" ph={WRAPPER_MARGIN}>
                    <TemplateBox mr={WRAPPER_MARGIN}>
                        <DynamicIcon name={'Bell'} color={WHITE} />
                    </TemplateBox>
                </TemplateBox>
            </TemplateBox>

            {dummySmartTasks.map(({ title, subtitle }) => (
                <TemplateBox
                    borderRadius={20}
                    borderWidth={1}
                    borderColor={WHITE_20}
                    pAll={16}
                    width={WRAPPED_SCREEN_WIDTH}
                    selfCenter
                    mb={10}
                    key={title}
                >
                    <TemplateBox>
                        <TemplateText medium size={14} mb={4}>{title}</TemplateText>
                        <TemplateText color={WHITE_60} size={12}>{subtitle}</TemplateText>
                    </TemplateBox>

                    <TemplateBox row alignItems="center" justifyContent="space-between">
                        <TemplateBox flex />
                        <TemplateText size={12}>Dismiss</TemplateText>
                        <TemplateBox
                            alignItems="center"
                            justifyContent="center"
                            borderRadius={10}
                            borderWidth={1}
                            backgroundColor={WHITE_20}
                            ph={10}
                            pv={5}
                            ml={10}
                        >
                            <TemplateText color={WHITE_60} size={13}>Due in 3 days</TemplateText>
                        </TemplateBox>
                    </TemplateBox>
                </TemplateBox>
            ))}

            <TemplateBox>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: WRAPPER_MARGIN, marginTop: 36 }}
                >
                    {categories.map(category => {
                        const active = selectedCategory === category.label
                        return (
                            <TemplateBox
                                key={category.id}
                                ph={12}
                                height={34}
                                borderRadius={15}
                                borderWidth={1}
                                borderColor={active ? WHITE : WHITE_20}
                            
                                mr={8}
                                alignItems="center"
                                row
                                onPress={() => setSelectedCategory(active ? null : category.label)}
                            >
                                <TemplateText
                                    medium
                                    size={14}
                                    mr={4}
                                    color={active ? WHITE : WHITE_60}
                                >
                                    {category.label}
                                </TemplateText>
                                <DynamicIcon name={category.icon} color={active ? WHITE : WHITE_60} size={16} />
                            </TemplateBox>
                        )
                    })}
                </ScrollView>

                <TemplateBox mh={WRAPPER_MARGIN} mt={20}>
                    {filteredTools.map(({ title, description, icon }) => (
                        <TemplateBox
                            key={title}
                            pAll={16}
                            borderRadius={20}
                            borderColor={WHITE_20}
                            borderWidth={1}
                            row
                            alignItems="center"
                            justifyContent="space-between"
                            mb={10}
                            width={SCREEN_WIDTH - 32}
                            selfCenter
                        >
                            <TemplateBox pr={10}>
                                <TemplateBox row alignItems="center" mb={4} justifyContent="space-between">
                                    <TemplateText bold size={16} mr={4}>{title}</TemplateText>
                                    <DynamicIcon name={icon} color={WHITE} size={12} />
                                </TemplateBox>

                                <TemplateBox width={SCREEN_WIDTH - 100}>
                                    <TemplateText color={WHITE_60} size={14}>{description}</TemplateText>
                                </TemplateBox>
                            </TemplateBox>
                            <DynamicIcon name={"DoubleArrowRight"} color={WHITE} size={24} />
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
        backgroundColor: BLACK
    },
    contentContainer: {
        flexGrow: 1,
        paddingTop: HEADER_MARGIN,
    },
});
export default HomeScreen;
