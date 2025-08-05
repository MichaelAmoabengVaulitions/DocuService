import React, { useEffect, useLayoutEffect, useMemo } from 'react';
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
import { ca } from 'date-fns/locale';

const HomeScreen = ({ navigation }) => {
    const { auth } = useAuthContext();
    const dummySmartTasks = [
        { "title": "Upload work-permit payslips",          "subtitle": "Due in 3 days" },
        { "title": "Book Bürgeramt appointment (Anmeldung)", "subtitle": "Due tomorrow" },
    
    ]
    const categories = [
        {id: 'c1', label: 'Immigration',icon: 'Immigration'},
        {id: 'c2', label: 'Housing', icon: 'House'},
        {id: 'c3', label: 'Work',  icon: 'Work'},
        {id: 'c4', label: 'Health', icon: 'Health'},
        {id: 'c5', label: 'Finance', icon: 'Finance'},
        {id: 'c6', label: 'Language', icon: 'Language'},
        {id: 'c7', label: 'Social', icon: 'Social'},
        {id: 'c8', label: 'Transport', icon: 'Transport'},
        {id: 'c9', label: 'Family', icon: 'Family'},
        {id: 'c10', label: 'Shopping', icon: 'Shopping'},
    ];

   // const { features, feed } = useFeatureFlags();

  //  const brandsCatalogueEnabled = features?.brandsCatalogue?.visible;

    // const profile = auth?.profile;
    // const { updateProfile } = useProfile();

    // const profileImage = profile?.image;

    // const isFocused = useIsFocused();

    // useEffect(() => {
    //     if (isFocused && profile) {
    //         auth?.getProfileCompleteStatus();
    //     }
    // }, [
    //     isFocused,
    //     profile,
    // ]);

    // useEffect(() => {
    //     const unsubscribe = messaging().onTokenRefresh((token) => {
    //         if (token) updateFcmToken(token);
    //     });
    //     return unsubscribe;
    // }, []);

    // const updateFcmToken = async (token) => {
    //     await updateProfile({ fcmToken: token }, profile?.id);
    // };

    // const creatorToolsEnabled = features?.openAIScreen;

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerRight: () => (
    //             <TemplateBox
    //                 mr={WRAPPER_MARGIN}
    //             >
    //                 <DynamicIcon name={'Bell'} color={WHITE}/>
    //             </TemplateBox>
    //         ),
    //         headerLeft: () => (
    //             <TemplateBox alignItems="center" row>
    //                 <TemplateBox
    //                     ml={WRAPPER_MARGIN}
    //                     height={wp(50)}
    //                     width={wp(50)}
    //                     borderRadius={wp(30)}
    //                     alignItems="center"
    //                     justifyContent="center"
    //                     backgroundColor={WHITE_20}
    //                 >
    //                     <TemplateText color={GREY_30} medium size={18}>MA</TemplateText>
    //                 </TemplateBox>
    //                 <TemplateBox ml={8}>
    //                     <TemplateText color={WHITE} medium size={16}>You have 2 new tasks</TemplateText>
    //                 </TemplateBox>
    //             </TemplateBox>
    //         ),
    //     });
    // }, [navigation]);

    // useEffect(() => {
    //     if (!profileImage) {
    //         Alert.alert(
    //             'Profile image',
    //             'Please upload a profile image to continue',
    //             [
    //                 {
    //                     text: 'OK',
    //                     onPress: () => navigation.navigate(PROFILE_STACK),
    //                 },
    //             ],
    //         );
    //     }
    // }, [profileImage]);

    // const { previousResponse, handleRate } = useAppReview();

    // const ugcGuidePdfFeed = useMemo(() => {
    //     if (!feed?.feeds?.length) return [];

    //     return feed?.feeds?.[0];
    // }, [feed]);

    // const updateLastLogin = async () => {
    //     await updateProfile({ lastLoginTime: new Date().toISOString() }, profile?.id);
    // };

    // useEffect(() => {
    //     updateLastLogin();
    // }, []);

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
                    <TemplateBox flex/>

                     <TemplateBox row alignItems="center" justifyContent="space-between" ph={WRAPPER_MARGIN}>
                 <TemplateBox
                    mr={WRAPPER_MARGIN}
                >
                    <DynamicIcon name={'Bell'} color={WHITE}/>
                </TemplateBox>
                </TemplateBox>
           
            </TemplateBox>
          {dummySmartTasks.map(({title , subtitle}) => (
                <TemplateBox
                    borderRadius={20}
                    borderWidth={1}
                    borderColor={WHITE_20}
                    pAll={16}
                    width={WRAPPED_SCREEN_WIDTH}
                    selfCenter
                    mb={10}
                >
                    <TemplateBox>
                        <TemplateText medium size={14} mb={4}>{title}</TemplateText>
                        <TemplateText color={WHITE_60}  size={12}>{subtitle}</TemplateText>
                    </TemplateBox>

                    <TemplateBox 
                        row 
                        alignItems="center" 
                        justifyContent="space-between"
                    >
                        <TemplateBox flex/>
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
                            <TemplateText color={WHITE_60}  size={13}>Due in 3 days</TemplateText>
                        </TemplateBox>
                    </TemplateBox>
                </TemplateBox>
            ))}

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: WRAPPER_MARGIN, marginVertical: 20 }}
            >
                {categories.map((category, index) => (
                    <TemplateBox
                        key={category.id}
                        ph={12}
                        height={34}
                        borderRadius={15}
                        borderWidth={1}
                        borderColor={index === 0 ? WHITE : WHITE_20}
                        mr={8}
                        alignItems="center"
                        row
                    >
                        <TemplateText medium size={14} mr={4} color={index === 0 ? WHITE : WHITE_60}>{category.label}</TemplateText>
                        <DynamicIcon name={category.icon} color={index === 0 ? WHITE : WHITE_60} size={16}/>
                    </TemplateBox>
                ))}
            </ScrollView>
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
