import React, { useMemo, useState } from "react";
import { StyleSheet, Image } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import Button from "../../components/Button";
import { emailValid } from "@/utils/validation";
import Box from "@/components/Box";
import { Colors } from "@/constants/Colors";
import TemplateText from "@/components/TemplateText";
import TemplateTextInput from "@/components/TemplateTextInput";
import Error from "@/components/Error";
import { LOGIN, SIGN_UP_EMAIL } from "@/navigation/screenNames";
import { AuthStackParamList } from "@/navigation/auth/AuthStack";
import { SCREEN_WIDTH, WRAPPER_MARGIN } from "@/constants/Layout";

const googleIcon = require("../../../assets/images/google-icon.png");

type SignUpScreen = StackScreenProps<AuthStackParamList, "SignUpScreen">;

const SignUpScreen: React.FC<SignUpScreen> = ({ navigation, route }) => {
  //@ts-ignore
  //const { mainDomain } = useConfig();
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const showEmailError = useMemo(
    () => emailTouched && !emailValid(email),
    [email, emailTouched]
  );

  return (
    <Box flex backgroundColor={Colors.BLACK} ph={24} pt={140}>
      <Box mb={32} center>
        <TemplateText size={24} bold mb={8}>
          Create account
        </TemplateText>
        <TemplateText size={14} color={Colors.WHITE_60}>
          Sign up to get started and access all features.
        </TemplateText>
      </Box>

      <Box
        row
        alignItems="center"
        justifyContent="center"
        borderWidth={StyleSheet.hairlineWidth}
        borderColor={Colors.WHITE_10}
        borderRadius={30}
        pv={14}
        ph={16}
        mb={90}
        backgroundColor={Colors.WHITE_10}
      >
        {/*@ts-ignore*/}
        <Image source={googleIcon} style={styles.googleIcon} />
        <TemplateText color={Colors.WHITE} ml={12} size={14} medium>
          Continue with Google
        </TemplateText>
      </Box>

      {/* Divider */}
      <Box row alignItems="center" justifyContent="center" mb={16}>
        <Box flex height={1} backgroundColor={Colors.WHITE} />
        <TemplateText size={14} color={Colors.WHITE_60} ml={16} mr={16} medium>
          Or continue with
        </TemplateText>
        <Box flex height={1} backgroundColor={Colors.WHITE} />
      </Box>

      {/* Email Label & Input */}
      <Box mb={40}>
        <TemplateText color={Colors.WHITE} mb={8} size={14} medium>
          Email
        </TemplateText>
        <TemplateTextInput
          placeholder="Enter your email address"
          value={email}
          style={[showEmailError && styles.error]}
          onChangeText={(text: string) => setEmail(text)}
          keyboardType="email-address"
          onBlur={() => setEmailTouched(true)}
          autoCapitalize="none"
        />
        <Error show={showEmailError}>Please enter a valid email</Error>
      </Box>
      <Button
        title="Continue with Email"
        onPress={() => navigation.navigate(SIGN_UP_EMAIL, { email })}
        disabled={!emailValid(email)}
        style={{ alignSelf: "center" }}
      />

      {/* Already have an account */}
      <Box
        row
        justifyContent="center"
        mb={24}
        mt={16}
        onPress={() => navigation.navigate(LOGIN)}
      >
        <TemplateText color={Colors.WHITE_60} size={16}>
          Already have an account?{" "}
        </TemplateText>
        <TemplateText color={Colors.WHITE} size={16}>
          Login
        </TemplateText>
      </Box>

      {/* Terms */}
      <Box
        alignItems="center"
        absolute
        bottom={40}
        selfCenter
        onPress={() => {
          //TODO: Navigate to Terms screen
          //   if (mainDomain) {
          //     navigation.navigate(WEBVIEW, {
          //       url: mainDomain,
          //     });
          //   }
        }}
      >
        <TemplateText size={14} color={Colors.WHITE_60}>
          By signing up you agree to our{" "}
          <TemplateText color={Colors.WHITE} bold size={14}>
            Terms
          </TemplateText>
        </TemplateText>
        <TemplateText size={14} color={Colors.WHITE} bold>
          and Conditions of Use
        </TemplateText>
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  googleIcon: {
    height: 24,
    width: 24,
  },
  contentContainerStyle: {},
  logo: {
    alignSelf: "center",
  },
  buttonContainer: {
    alignSelf: "center",
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
  title: {},
  input: {
    height: 60,
    width: SCREEN_WIDTH - 32,
    borderRadius: 8,
    paddingLeft: 16,
    marginTop: 16,
    borderColor: Colors.BLACK_10,
    backgroundColor: Colors.WHITE_60,
  },
  error: {
    borderColor: Colors.ERROR_RED,
  },
  generalError: {
    marginVertical: 10,
    alignSelf: "center",
  },
  passwordIcon: {
    bottom: 20,
    right: 20,
    position: "absolute",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
export default SignUpScreen;
