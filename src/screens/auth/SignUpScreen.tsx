import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import {
    BLACK_10,
    ERROR_RED,
    GREY_30,
    GREY_70,
    PRIMARY,
    SECONDARY,
    WHITE,
} from '../../theme/Colors';
import TemplateText from '../../components/TemplateText';
import { SCREEN_WIDTH, WRAPPER_MARGIN } from '../../theme/Layout';
import { LOGIN, SIGN_UP_EMAIL, WEBVIEW } from '../../navigation/ScreenNames';
import TemplateTextInput from '../../components/TemplateTextInput';
import { useConfig } from '../../context/core';
import ResizedImage from '../../components/ResizedImage';
import Box from '../../components/Box';
import { emailValid } from '../../Utils/validation';
import Error from '../../components/Error';
import { StackScreenProps } from '@react-navigation/stack';

const googleIcon = require('../../../assets/images/onboarding/google-icon.png');

type RootStackParamList = {
    SignUpScreen: undefined
    Login: undefined
}

type SignUpScreen = StackScreenProps<RootStackParamList, 'SignUpScreen'>;

const SignUpScreen: React.FC<SignUpScreen> = ({ navigation, route }) => {
    const { mainDomain } = useConfig();
    const [email, setEmail] = useState('');
    const [emailTouched, setEmailTouched] = useState(false);
    const showEmailError = useMemo(() => emailTouched && !emailValid(email), [email, emailTouched]);

    return (
        <Box flex backgroundColor={PRIMARY} ph={24} pt={140}>

            <Box mb={32} center>
                <TemplateText size={24} bold mb={8}>
                    Create account
                </TemplateText>
                <TemplateText size={14} color={GREY_70}>
                    Sign up to get started and access all features.
                </TemplateText>
            </Box>

            <Box
                row
                alignItems="center"
                justifyContent="center"
                borderWidth={1}
                borderColor="#3F3F46"
                borderRadius={24}
                pv={14}
                ph={16}
                mb={90}
            >
                <ResizedImage source={googleIcon} style={styles.googleIcon} />
                <TemplateText color={WHITE} ml={12}>Continue with Google</TemplateText>
            </Box>

            {/* Divider */}
            <Box row alignItems="center" justifyContent="center" mb={16}>
                <Box flex height={1} backgroundColor={WHITE} />
                <TemplateText size={14} color={GREY_70} ml={16} mr={16} medium>
                    Or continue with
                </TemplateText>
                <Box flex height={1} backgroundColor={WHITE} />
            </Box>

            {/* Email Label & Input */}
            <Box mb={40}>
                <TemplateText color={WHITE} mb={8}>
                    Email
                </TemplateText>

                <TemplateTextInput
                    placeholder="Enter your email address"
                    value={email}
                    style={[showEmailError && styles.error]}
                    onChangeText={(text) => setEmail(text)}
                    keyboardType="email-address"
                    onBlur={() => setEmailTouched(true)}
                    autoCapitalize="none"
                />
                 <Error show={showEmailError}>Please enter a valid email</Error>
            </Box>

            <Box backgroundColor={SECONDARY} borderRadius={100} alignItems="center" pv={14} mb={24} onPress={() => navigation.navigate(SIGN_UP_EMAIL, { email })} disabled={!emailValid(email)}>
                <TemplateText color="#171725" medium>
                    Continue with Email
                </TemplateText>
            </Box>

            {/* Already have an account */}
            <Box row justifyContent="center" mb={24} onPress={() => navigation.navigate(LOGIN)}>
                <TemplateText color={GREY_70}>Already have an account? </TemplateText>
                <TemplateText color={SECONDARY}>Login</TemplateText>
            </Box>

            {/* Terms */}
            <Box alignItems="center" absolute bottom={40} selfCenter
                onPress={() => {
                    if (mainDomain) {
                        navigation.navigate(WEBVIEW, {
                            url: mainDomain,
                        });
                    }
                }}>
                <TemplateText size={14} color={GREY_70}>
                    By signing up you agree to our{' '}
                    <TemplateText color={WHITE} bold size={14}>Terms</TemplateText>
                </TemplateText>
                <TemplateText size={14} color={WHITE} bold>
                    and Conditions of Use
                </TemplateText>
            </Box>
        </Box>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    googleIcon:{
        height: 24,
        width: 24
    },
    contentContainerStyle: {
    },
    logo: {
        alignSelf: 'center',
    },
    buttonContainer: {
        alignSelf: 'center',
        marginBottom: 20,
    },
    button: {
        marginTop: 24,
    },
    loginText: {
        marginTop: WRAPPER_MARGIN,
    },
    signupLink: {
        marginTop: 16,
    },
    title: {
    },
    input: {
        height: 60,
        width: SCREEN_WIDTH - 32,
        borderRadius: 8,
        paddingLeft: 16,
        marginTop: 16,
        borderColor: BLACK_10,
        backgroundColor: GREY_30
    },
    error: {
        borderColor: ERROR_RED,
    },
    generalError: {
        marginVertical: 10,
        alignSelf: 'center',
    },
    passwordIcon: {
        bottom: 20,
        right: 20,
        position: 'absolute',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
export default SignUpScreen;
