import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
    PRIMARY, SECONDARY, SECONDARY_DARK, WHITE,
} from '../../theme/Colors';
import TemplateText from '../../components/TemplateText';
import {
    HEADER_MARGIN, SCREEN_WIDTH
} from '../../theme/Layout';

import BrandLogo from '../../../assets/svgs/BrandLogo';
import TemplateBox from '../../components/TemplateBox';
import OnboardingCarousel from '../../components/carousels/OnboardingCarousel';
import { SIGN_UP } from '../../navigation/ScreenNames';
import { wp } from '../../Utils/getResponsiveSize';
import Box from '../../components/Box';
import { StackScreenProps } from '@react-navigation/stack';

type RootStackParamList = {
    OnboardingScreen: undefined
    SignUp: undefined
}

type OnboardingScreen = StackScreenProps<RootStackParamList, 'OnboardingScreen'>;

const OnboardingScreen:React.FC<OnboardingScreen>  = ({ navigation }) => {
    const welcomeContent = [
        {
            "title": "DeutschFlow: Practical Language & Culture",
            "message": "Learn real-world phrases, idioms and cultural tips tailored to your week."
        },
        {
            "title": "JobReady DE",
            "message": "Convert your CV, craft Anschreiben, prep for interviews—and find English-speaking doctors with one tap."
        },
        {
            "title": "LifeHacks: Expat Essentials & Hidden Helpers",
            "message": "Instant tips for lockouts, Mülltrennung rules, Ruhezeiten etiquette, parking permits and more everyday hacks."
        }
    ]

    const [activeIndex, setActiveIndex] = useState(0);

    const carouselRef = React.useRef(null);
    const handleNext = () => {
        if (activeIndex === welcomeContent?.length - 1) {
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
        <View style={styles.container}>
            <TemplateBox height={HEADER_MARGIN / 2} />
            <BrandLogo height={45} width={SCREEN_WIDTH / 1.4} color={WHITE} />
            <Box ph={25} pv={18} borderRadius={13} onPress={() => navigation.navigate(SIGN_UP)} absolute right={20} top={80} color={WHITE}>
                <TemplateText size={16} bold caps>
                    Skip
                </TemplateText>
            </Box>
            <Box pb={40} borderRadius={32} absolute bottom={40}>
                <TemplateBox
                    height={180}
                    width={SCREEN_WIDTH}
                >
                    <OnboardingCarousel
                        showPagination
                        dots
                        data={welcomeContent}
                        renderItem={({ item, index }) => (
                            <TemplateBox justifyContent='center' alignItems='center' width={SCREEN_WIDTH} >
                                <Box
                                    width={SCREEN_WIDTH}
                                    ph={wp(20)}
                                    alignItems="center"
                                >
                                    <TemplateText
                                        size={24}
                                        bold
                                        center
                                        mb={8}
                                        color={WHITE}
                                    >
                                        {item?.title}
                                    </TemplateText>
                                    <TemplateBox height={10} />
                                    <Box ph={12} center>
                                        <TemplateText
                                            size={14}
                                            lineHeight={22}
                                            center
                                            bold
                                            color={WHITE}
                                        >
                                            {item?.message}
                                        </TemplateText>
                                    </Box>
                                </Box>
                            </TemplateBox>
                        )}
                        paginationSize={welcomeContent?.length}
                        snapToInterval={SCREEN_WIDTH}
                        flex={1}
                        activeIndex={activeIndex}
                        setActiveIndex={setActiveIndex}
                        ref={carouselRef}
                        activePaginationColor={SECONDARY}
                        inactivePaginationColor={SECONDARY_DARK}
                    />

                </TemplateBox>
                <Box backgroundColor={SECONDARY} ph={34} pv={18} borderRadius={24} row center onPress={handleNext} mt={20} selfCenter>
                    <TemplateText color={PRIMARY} size={16} semiBold caps>
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
export default OnboardingScreen;