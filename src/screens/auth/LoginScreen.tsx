import React, { useState } from "react";
import { Image, StyleSheet } from "react-native";
//@ts-ignore
import Ionicons from "@expo/vector-icons/Ionicons";
import TemplateText from "../../components/TemplateText";
import Button from "../../components/Button";
import Wrapper from "../../components/Wrapper";
import TemplateTextInput from "../../components/TemplateTextInput";
import Error from "../../components/Error";

import Box from "../../components/Box";
import { StackScreenProps } from "@react-navigation/stack";
import { Colors } from "@/constants/Colors";
import { SCREEN_WIDTH, WRAPPER_MARGIN } from "@/constants/Layout";
import { FORGOT_PASSWORD, SIGN_UP } from "@/navigation/screenNames";
import { AuthStackParamList } from "@/navigation/auth/AuthStack";

const googleIcon = require("../../../assets/images/google-icon.png");

type LoginScreen = StackScreenProps<AuthStackParamList, "LoginScreen">;

const LoginScreen: React.FC<LoginScreen> = ({ navigation }) => {
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState();

  const [error, setError] = useState<null | string>(null);

  const [loading, setLoading] = useState(false);

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    // try {
    //   if (error) {
    //     setError(null);
    //   }
    //   await auth().signInWithEmailAndPassword(email, password);
    //   const profile = await getProfile(auth().currentUser.uid);
    //   const token = await messaging().getToken();

    //   const data = token
    //     ? { lastLoginTime: new Date().toISOString(), token }
    //     : { lastLoginTime: new Date().toISOString() };
    //   await updateProfile(data, profile?.id);
    //   // eslint-disable-next-line @typescript-eslint/no-shadow
    // } catch (error) {
    //   if (error?.code === "auth/email-already-in-use") {
    //     setError("That email address is already in use!");
    //   }

    //   if (error?.code === "auth/invalid-email") {
    //     setEmail("That email address is invalid!");
    //   }
    //   if (error?.code === "auth/wrong-password") {
    //     setError("That password is invalid!");
    //   }
    //   if (error?.code === "auth/user-not-found") {
    //     setError("That user does not exist!");
    //   }
    // }
    setLoading(false);
  };

  return (
    <Box flex backgroundColor={Colors.BLACK}>
      <Wrapper contentContainerStyle={styles.contentContainerStyle} keyboard>
        <Box flex pt={40}>
          <Box mb={32} center>
            <TemplateText size={24} semiBold mb={8}>
              Login
            </TemplateText>
            <TemplateText size={14} color={Colors.WHITE_60}>
              Login to get started and access all features.
            </TemplateText>
          </Box>

          <Box
            row
            alignItems="center"
            justifyContent="center"
            borderWidth={1}
            borderColor={Colors.WHITE_20}
            backgroundColor={Colors.WHITE_10}
            borderRadius={30}
            pv={14}
            ph={16}
            mb={60}
          >
            <Image source={googleIcon} style={styles.googleIcon} />
            <TemplateText color={Colors.WHITE} ml={12} semiBold size={14}>
              Continue with Google
            </TemplateText>
          </Box>

          <Box row alignItems="center" justifyContent="center" mb={16}>
            <Box flex height={1} backgroundColor={Colors.WHITE} />
            <TemplateText
              size={14}
              color={Colors.WHITE_60}
              ml={16}
              mr={16}
              medium
            >
              Or continue with
            </TemplateText>
            <Box flex height={1} backgroundColor={Colors.WHITE} />
          </Box>

          <Box mb={20}>
            <TemplateText color={Colors.WHITE} mb={8} size={14} medium>
              Email
            </TemplateText>

            <TemplateTextInput
              placeholder="Enter your email address"
              value={email}
              onChangeText={(text: string) => setEmail(text)}
              keyboardType="email-address"
              autoCapitalize="none"
              returnKeyType="next"
            />
          </Box>
          <Box mb={30}>
            <TemplateText color={Colors.WHITE} mb={8} size={14} medium>
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
                <Ionicons
                  name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={Colors.WHITE}
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
            color={Colors.WHITE_60}
          >
            Forgot you password?
            {"  "}
            <TemplateText
              color={Colors.WHITE}
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
            <TemplateText color={Colors.WHITE_60} size={14}>
              Don't have an account?{" "}
            </TemplateText>
            <TemplateText color={Colors.WHITE} size={14}>
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
    borderColor: Colors.BLACK_10,
    borderRadius: 8,
    paddingLeft: 16,
    marginTop: 16,
    backgroundColor: Colors.WHITE_60,
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
