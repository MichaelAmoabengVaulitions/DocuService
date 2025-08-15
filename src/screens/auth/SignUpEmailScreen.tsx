import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    BACKGROUND,
    BLACK,
    BLACK_10,
    DARK_OVERLAY,
    ERROR_RED,
    GREY_30,
    GREY_70,
    ONBOARDING_BLUE,
    SECONDARY,
    WHITE,
} from '../../theme/Colors';
import TemplateText from '../../components/TemplateText';
import { SCREEN_WIDTH, WRAPPED_SCREEN_WIDTH, WRAPPER_MARGIN } from '../../theme/Layout';
import Button from '../../components/Button';
import { LOGIN, WEBVIEW } from '../../navigation/ScreenNames';
import TemplateTextInput from '../../components/TemplateTextInput';
import Wrapper from '../../components/Wrapper';
import Error from '../../components/Error';
import { emailValid, passwordValid, isEmpty } from '../../Utils/validation';
import useProfile from '../../hooks/user/useProfile';
import BrandLogo from '../../../assets/svgs/BrandLogo';
import { useConfig } from '../../context/core';
import TemplateTouchable from '../../components/TemplateTouchable';
import TemplateIcon from '../../components/TemplateIcon';
import TemplateBox from '../../components/TemplateBox';
import ResizedImage from '../../components/ResizedImage';
import Box from '../../components/Box';
import { StackScreenProps } from '@react-navigation/stack';

const creatorAuthImage = require('../../../assets/images/onboarding/login.jpg');
const brandAuthImage = require('../../../assets/images/onboarding/brand-auth.jpg');

const CREATOR_PLACEHOLDER = 'Your Name';
const BRAND_PLACEHOLDER = 'Your Brand Name';

type RootStackParamList = {
    SignUpEmailScreen: {
        type?: string,
        email?: string
    } | undefined
    Login: undefined
}

type SignUpEmailScreen = StackScreenProps<RootStackParamList, 'SignUpEmailScreen'>;


const SignUpEmailScreen: React.FC<SignUpEmailScreen> = ({ navigation, route }) => {
    const { mainDomain } = useConfig();

    const type = route.params?.type;
    const userEmail = route.params?.email;

    const isCreator = type === 'creator';

    const namePlaceholder = useMemo(() => {
        if (!type) {
            return CREATOR_PLACEHOLDER;
        }
        return isCreator ? CREATOR_PLACEHOLDER : BRAND_PLACEHOLDER;
    }, [type, isCreator]);

    const [name, setName] = useState();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [email, setEmail] = useState(userEmail);

    const [password, setPassword] = useState();

    const [emailTouched, setEmailTouched] = useState(false);

    const [passwordTouched, setPasswordTouched] = useState(false);

    const [firstNameTouched, setFirstNameTouched] = useState(false);
    const [lastNameTouched, setLastNameTouched] = useState(false);

    const [error, setError] = useState<null | string>();

    const showEmailError = useMemo(() => emailTouched && !emailValid(email), [email, emailTouched]);

    const showPasswordError = useMemo(() => passwordTouched && !passwordValid(password), [password, passwordTouched]);

    const showFirstNameError = useMemo(() => firstNameTouched && isEmpty(firstName), [firstName, firstNameTouched]);
    const showLastNameError = useMemo(() => lastNameTouched && isEmpty(lastName), [lastName, lastNameTouched]);

    const [loading, setLoading] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);

    const disabled = useMemo(() => (
        !emailValid(email)
        || !passwordValid(password)
        || isEmpty(firstName)
        || isEmpty(lastName)
        || loading
        || !!error
    ), [email, password, name, loading, error]);

    useEffect(() => {
        setError(null);
    }, []);

    const { createCreatorProfile, createBrandProfile } = useProfile();

    const handleSignUp = async () => {
        setLoading(true);
        try {
            await AsyncStorage.setItem('@userType', namePlaceholder);
            const response = await auth().createUserWithEmailAndPassword(
                email,
                password,
            );

            if (response?.user) {
                if (isCreator) {
                    await createCreatorProfile(name, response?.user);
                } else {
                    await createBrandProfile(name, response?.user);
                }
            }
        } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
                setError('That email address is already in use!');
            }

            if (e.code === 'auth/invalid-email') {
                setPassword('That email address is invalid!');
            }
            setLoading(false);
        }
    };

    const image = isCreator ? creatorAuthImage : brandAuthImage;

    return (
        <Box flex backgroundColor={BACKGROUND}>
            <Wrapper
                contentContainerStyle={styles.contentContainerStyle}
                style={styles.container}
                showsVerticalScrollIndicator={false}
                keyboard
            >
                <Box flex pt={56}>

                    <Box mb={24} center>
                        <TemplateText size={24} semiBold color={WHITE} mb={8}>
                            Complete your account
                        </TemplateText>
                        <TemplateText size={14} color={GREY_70}>
                            Sign up to finish creating your profile.
                        </TemplateText>
                    </Box>


                    <Box mb={16}>
                        <TemplateText color={WHITE} mb={8} medium>
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
                    <Box mb={16}>
                        <TemplateText color={WHITE} mb={8} medium>
                            First Name
                        </TemplateText>
                        <TemplateTextInput
                            placeholder="Enter your first name"
                            style={[showFirstNameError && styles.error]}
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                            onBlur={() => setFirstNameTouched(true)}
                        />
                        <Error show={showFirstNameError}>Please enter a valid name</Error>

                    </Box>

                    {/* Last Name */}
                    <Box mb={16}>
                        <TemplateText color={WHITE} mb={8} medium>
                            Last Name
                        </TemplateText>

                        <TemplateTextInput
                            placeholder="Enter your last name"
                            style={[showLastNameError && styles.error]}
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                            onBlur={() => setLastNameTouched(true)}
                        />
                        <Error show={showLastNameError}>Please enter a valid name</Error>

                    </Box>

                    <Box mb={24}>
                        <TemplateText color={WHITE} mb={8} medium>
                            Password
                        </TemplateText>
                        <Box>
                            <TemplateTextInput
                                placeholder="Create a password"
                                style={[showPasswordError && styles.error]}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                onBlur={() => setPasswordTouched(true)}
                                secureTextEntry={!passwordVisible}
                                autoCapitalize="none"
                            />

                            <Box absolute zIndex={99} right={16} height='100%' center onPress={() => setPasswordVisible((prevState) => !prevState)}>
                                <TemplateIcon
                                    name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                                    size={20}
                                    color={WHITE}
                                    family="Ionicons"
                                />
                            </Box>
                        </Box>
                        <Error show={showPasswordError}>Please enter a valid password</Error>


                    </Box>
                    <Error show={!!error} style={styles.generalError}>
                        {error}
                    </Error>

                    <Button
                        mt={40}
                        mb={24}
                        title="Continue with Email"
                        onPress={handleSignUp}
                        loading={loading}
                        disabled={disabled}
                    />

                    <Box row justifyContent="center" mv={24} onPress={() => navigation.navigate(LOGIN)}>
                        <TemplateText color={GREY_70}>Already have an account? </TemplateText>
                        <TemplateText color={SECONDARY}>Login</TemplateText>
                    </Box>
                </Box>
                <Box alignItems="center" absolute selfCenter bottom={20}
                    onPress={() => {
                        if (mainDomain) {
                            navigation.navigate(WEBVIEW, {
                                url: mainDomain,
                            });
                        }
                    }}
                >
                    <TemplateText size={12} color="#71717A">
                        By signing up you agree to our{' '}
                        <TemplateText color={WHITE} bold size={12}>Terms</TemplateText>
                    </TemplateText>
                    <TemplateText size={12} color={WHITE} bold>
                        and Conditions of Use
                    </TemplateText>
                </Box>
            </Wrapper>
        </Box>

    )



    return (
        <Wrapper
            contentContainerStyle={styles.contentContainerStyle}
            style={styles.container}
            showsVerticalScrollIndicator={false}
            keyboard
        >
            <TemplateBox borderRadius={20} overflow='hidden'>
                <TemplateBox style={{ position: 'absolute', paddingTop: 8, alignSelf: 'center', alignItems: 'center', zIndex: 99 }} backgroundColor={DARK_OVERLAY}>
                    <BrandLogo height={58} width={282} color={WHITE} />
                </TemplateBox>
                <ResizedImage source={image} style={{ height: 345, width: WRAPPED_SCREEN_WIDTH }} />
            </TemplateBox>


            <TemplateBox width={WRAPPED_SCREEN_WIDTH} mt={20}>
                <TemplateText
                    size={21}
                    medium
                    center
                    color={ONBOARDING_BLUE}
                    style={styles.title}
                >
                    {`Create your ${isCreator ? 'creator' : 'brand'} account `}
                </TemplateText>
            </TemplateBox>

            <TemplateTextInput
                placeholder={namePlaceholder}
                style={[styles.input, showNameError && styles.error]}
                value={name}
                onChangeText={(text) => setName(text)}
                onBlur={() => setNameTouched(true)}
            />
            <Error show={showNameError}>
                {`Please enter a valid ${isCreator ? 'name' : 'brand name'
                    } `}
            </Error>
            <TemplateTextInput
                placeholder="Your Email"
                style={[styles.input, showEmailError && styles.error]}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                onBlur={() => setEmailTouched(true)}
                autoCapitalize="none"
            />
            <Error show={showEmailError}>Please enter a valid email</Error>

            <View style={styles.passwordContainer}>
                <TemplateTextInput
                    placeholder="Password"
                    style={[styles.input, showPasswordError && styles.error]}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    onBlur={() => setPasswordTouched(true)}
                    secureTextEntry={!passwordVisible}
                    autoCapitalize="none"
                />
                <TemplateTouchable
                    onPress={() => setPasswordVisible((prevState) => !prevState)}
                    style={styles.passwordIcon}
                >
                    <TemplateIcon
                        name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                        size={20}
                        color={BLACK}
                        family="Ionicons"
                    />
                </TemplateTouchable>
            </View>
            <Error show={showPasswordError}>Please enter a valid password</Error>

            <View style={styles.buttonContainer}>
                <Error show={!!error} style={styles.generalError}>
                    {error}
                </Error>
                <Button
                    title="Create Account"
                    onPress={handleSignUp}
                    style={styles.button}
                    loading={loading}
                    disabled={disabled}
                    color={ONBOARDING_BLUE}
                />
                <TemplateText
                    size={14}
                    center
                    style={styles.loginText}
                    medium
                    onPress={() => {
                        if (mainDomain) {
                            navigation.navigate(WEBVIEW, {
                                url: mainDomain,
                            });
                        }
                    }}
                >
                    By creating an account, you agree to our
                    {' '}

                    <TemplateText
                        medium
                        underLine
                        size={16}
                        onPress={() => {
                            if (mainDomain) {
                                navigation.navigate(WEBVIEW, {
                                    url: mainDomain,
                                });
                            }
                        }}
                        color={ONBOARDING_BLUE}
                    >
                        Terms of Service
                        {' '}

                    </TemplateText>
                    and
                    {' '}

                    <TemplateText medium underLine size={14} color={ONBOARDING_BLUE}>
                        Privacy Policy
                    </TemplateText>
                </TemplateText>

                <TemplateText size={16} center style={styles.signupLink} medium>
                    Already a member?
                    {' '}

                    <TemplateText
                        color={ONBOARDING_BLUE}
                        underLine
                        size={16}
                        medium
                        onPress={() => navigation.navigate(LOGIN)}
                    >
                        Login
                    </TemplateText>
                </TemplateText>
            </View>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
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
export default SignUpEmailScreen;
