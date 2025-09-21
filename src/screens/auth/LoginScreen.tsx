import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import auth from "@react-native-firebase/auth";
import messaging from "@react-native-firebase/messaging";
import {
  BACKGROUND,
  BLACK,
  BLACK_10,
  DEFAULT_GRADIENT,
  GREY_30,
  GREY_70,
  SECONDARY,
  WHITE,
} from "../../theme/Colors";
import TemplateText from "../../components/TemplateText";
import { SCREEN_WIDTH, WRAPPER_MARGIN } from "../../theme/Layout";
import Button from "../../components/Button";
import {
  FORGOT_PASSWORD,
  ONBOARDING,
  SIGN_UP,
} from "../../navigation/ScreenNames";
import Wrapper from "../../components/Wrapper";
import TemplateTextInput from "../../components/TemplateTextInput";
import Error from "../../components/Error";
import TemplateIcon from "../../components/TemplateIcon";
import useProfile from "../../hooks/user/useProfile";
import ResizedImage from "../../components/ResizedImage";
import Box from "../../components/Box";
import { StackScreenProps } from "@react-navigation/stack";

const googleIcon = require("../../../assets/images/onboarding/google-icon.png");

type RootStackParamList = {
  LoginScreen: undefined;
  onboarding: undefined;
  ForgotPassword: undefined;
};

type LoginScreen = StackScreenProps<RootStackParamList, "LoginScreen">;

const LoginScreen: React.FC<LoginScreen> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState();

  const [error, setError] = useState<null | string>(null);

  const [loading, setLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const { updateProfile, getProfile } = useProfile();

  const handleLogin = async () => {
    setLoading(true);
    try {
      if (error) {
        setError(null);
      }
      await auth().signInWithEmailAndPassword(email, password);
      const profile = await getProfile(auth().currentUser.uid);
      const token = await messaging().getToken();

      const data = token
        ? { lastLoginTime: new Date().toISOString(), token }
        : { lastLoginTime: new Date().toISOString() };
      await updateProfile(data, profile?.id);
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      if (error?.code === "auth/email-already-in-use") {
        setError("That email address is already in use!");
      }

      if (error?.code === "auth/invalid-email") {
        setEmail("That email address is invalid!");
      }
      if (error?.code === "auth/wrong-password") {
        setError("That password is invalid!");
      }
      if (error?.code === "auth/user-not-found") {
        setError("That user does not exist!");
      }
    }
    setLoading(false);
  };

  return (
    <Box
      flex
      backgroundColor={BLACK}
      vGradient
      gradientColors={DEFAULT_GRADIENT}
    >
      <Wrapper contentContainerStyle={styles.contentContainerStyle} keyboard>
        <Box flex pt={40}>
          <Box mb={32} center>
            <TemplateText size={24} semiBold mb={8}>
              Login
            </TemplateText>
            <TemplateText size={14} color={GREY_70}>
              Login to get started and access all features.
            </TemplateText>
          </Box>

          <Box
            row
            alignItems="center"
            justifyContent="center"
            borderWidth={1}
            borderColor="#3F3F46"
            borderRadius={30}
            pv={14}
            ph={16}
            mb={60}
          >
            <ResizedImage source={googleIcon} style={styles.googleIcon} />
            <TemplateText color={WHITE} ml={12} semiBold size={14}>
              Continue with Google
            </TemplateText>
          </Box>

          <Box row alignItems="center" justifyContent="center" mb={16}>
            <Box flex height={1} backgroundColor={WHITE} />
            <TemplateText size={14} color={GREY_70} ml={16} mr={16} medium>
              Or continue with
            </TemplateText>
            <Box flex height={1} backgroundColor={WHITE} />
          </Box>

          <Box mb={20}>
            <TemplateText color={WHITE} mb={8} size={14} medium>
              Email
            </TemplateText>

            <TemplateTextInput
              placeholder="Enter your email address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </Box>
          <Box mb={30}>
            <TemplateText color={WHITE} mb={8} size={14} medium>
              Password
            </TemplateText>
            <Box>
              <TemplateTextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                returnKeyType="next"
              />
              <Box
                onPress={() => setPasswordVisible((prevState) => !prevState)}
                style={styles.passwordIcon}
              >
                <TemplateIcon
                  name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={WHITE}
                  family="Ionicons"
                />
              </Box>
            </Box>
            {!!error && (
              <Error show={!!error} style={styles.generalError}>
                {error}
              </Error>
            )}
          </Box>
          <Button
            title="Login"
            onPress={handleLogin}
            loading={loading}
            disabled={!email || !password}
          />

          <TemplateText
            size={14}
            center
            style={styles.signupLink}
            medium
            color={GREY_70}
          >
            Forgot you password?
            {"  "}
            <TemplateText
              color={SECONDARY}
              size={14}
              medium
              onPress={() => navigation.navigate(FORGOT_PASSWORD)}
            >
              Reset Password
            </TemplateText>
          </TemplateText>

          <Box
            row
            justifyContent="center"
            mb={24}
            onPress={() => navigation.navigate(SIGN_UP)}
          >
            <TemplateText color={GREY_70} size={14}>
              Don't have an account?{" "}
            </TemplateText>
            <TemplateText color={SECONDARY} size={14}>
              Sign up
            </TemplateText>
          </Box>
        </Box>
      </Wrapper>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {},
  googleIcon: {
    height: 24,
    width: 24,
  },
  contentContainerStyle: {
    flex: 1,
    paddingTop: 40,
  },
  buttonContainer: {
    alignSelf: "center",
    marginBottom: WRAPPER_MARGIN * 4,
  },
  button: {
    marginTop: 24,
    marginBottom: 16,
  },
  signupLink: {
    marginVertical: 16,
  },
  title: {
    marginBottom: WRAPPER_MARGIN,
  },

  input: {
    height: 60,
    width: SCREEN_WIDTH - 32,
    borderWidth: 0.4,
    borderColor: BLACK_10,
    borderRadius: 8,
    paddingLeft: 16,
    marginTop: 16,
    backgroundColor: GREY_30,
  },
  generalError: {
    marginVertical: 10,
    alignSelf: "center",
  },
  passwordIcon: {
    top: 16,
    right: 20,
    position: "absolute",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default LoginScreen;
