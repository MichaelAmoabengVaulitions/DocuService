import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native';
import {
    GRAY_SCALE_80,
    PRIMARY, SECONDARY, WHITE,
} from '../../theme/Colors';
import TemplateText from '../../components/TemplateText';
import {
    HEADER_MARGIN, SCREEN_WIDTH,
    WRAPPED_SCREEN_WIDTH,
} from '../../theme/Layout';
import BrandLogo from '../../../assets/svgs/BrandLogo';
import TemplateBox from '../../components/TemplateBox';
import useFeatureFlags from '../../hooks/featureFlags/useFeatureFlags';
import OnboardingCarousel from '../../components/carousels/OnboardingCarousel';
import { ONBOARDING } from '../../navigation/ScreenNames';
import { wp } from '../../Utils/getResponsiveSize';
import Box from '../../components/Box';
import { StackScreenProps } from '@react-navigation/stack';
type RootStackParamList = {
    WelcomeScreen: undefined
    onboarding: undefined
}

type WelcomeScreen = StackScreenProps<RootStackParamList, 'WelcomeScreen'>;

const WelcomeScreen: React.FC<WelcomeScreen> = ({ navigation }) => {
    const welcomeContent = [
        {
            "title": " Welcome to MyLifeDE",
            "message": "Your all-in-one expat companion for life in Germany."
        },
        {
            "title": "AskAlma: Bureaucracy Made Easy",
            "message": "Upload letters, translate forms and get step-by-step checklists for every official task."
        },
        {
            "title": "LocalTalk: Fluent in Formal German",
            "message": "Translate contracts, letters and emails into clear, context-driven German—or back into English"
        }
    ]

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
        <View style={styles.container}>
            <TemplateBox height={HEADER_MARGIN / 2} />
            <BrandLogo height={45} width={SCREEN_WIDTH / 1.4} color={WHITE} />
            <Box ph={25} pv={18} borderRadius={13} onPress={() => navigation.navigate(ONBOARDING)} absolute right={20} top={80} color={WHITE}>
                <TemplateText size={16} bold caps>
                    Skip
                </TemplateText>
            </Box>
            <Box backgroundColor={SECONDARY} pb={40} borderRadius={32} absolute bottom={40}>
                <TemplateBox
                    height={180}
                    width={WRAPPED_SCREEN_WIDTH}
                >
                    <OnboardingCarousel
                        showPagination
                        dots
                        data={welcomeContent}
                        renderItem={({ item, index }) => (
                            <TemplateBox justifyContent='center' alignItems='center' width={WRAPPED_SCREEN_WIDTH} >
                                <Box
                                    width={WRAPPED_SCREEN_WIDTH}
                                    ph={wp(24)}
                                    alignItems="center"
                                >
                                    <TemplateText
                                        size={24}
                                        bold
                                        center
                                        mb={8}
                                        color={PRIMARY}
                                    >
                                        {item?.title}
                                    </TemplateText>
                                    <TemplateBox height={10} />
                                    <TemplateText
                                        size={14}
                                        center
                                        semiBold
                                        color={GRAY_SCALE_80}
                                    >
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
                <Box backgroundColor={PRIMARY} ph={34} pv={18} borderRadius={24} row center onPress={handleNext} mt={20} selfCenter>
                    <TemplateText color={WHITE} size={16} semiBold caps>
                        Next
                    </TemplateText>
                </Box>
            </Box>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: PRIMARY,
        alignItems: 'center',
    },
});
export default WelcomeScreen;
