import React, { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import auth from "@react-native-firebase/auth";
import {
  BACKGROUND,
  BLACK_10,
  GRAY_SCALE_80,
  GREY_30,
  ONBOARDING_BLUE,
  WHITE,
} from "../../theme/Colors";
import TemplateText from "../../components/TemplateText";
import {
  SCREEN_WIDTH,
  WRAPPED_SCREEN_WIDTH,
  WRAPPER_MARGIN,
} from "../../theme/Layout";
import Button from "../../components/Button";
import { ONBOARDING } from "../../navigation/ScreenNames";
import Wrapper from "../../components/Wrapper";
import TemplateTextInput from "../../components/TemplateTextInput";
import BrandLogo from "../../../assets/svgs/BrandLogo";
import Error from "../../components/Error";
import HeaderIconButton from "../../components/header/HeaderButton";
import TemplateBox from "../../components/TemplateBox";
import ResizedImage from "../../components/ResizedImage";
import Box from "../../components/Box";
import { StackScreenProps } from "@react-navigation/stack";

const lockImage = require("../../../assets/images/onboarding/lock.png");

type RootStackParamList = {
  ResetPasswordScreen: { isUpdate?: string } | undefined;
  Login: undefined;
  onboarding: undefined;
};

type ResetPasswordScreen = StackScreenProps<
  RootStackParamList,
  "ResetPasswordScreen"
>;

const ResetPasswordScreen: React.FC<ResetPasswordScreen> = ({
  navigation,
  route,
}) => {
  const isUpdate = route.params?.isUpdate;
  const [email, setEmail] = useState();

  const [error, setError] = useState<null | string>(null);

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      if (!email) {
        setError("Please enter your email address");
        setLoading(false);
        return;
      }
      await auth().sendPasswordResetEmail(email);
      Alert.alert(
        isUpdate ? "Password Update" : "Password Reset",
        "A password reset link has been sent to your email address",
        [
          {
            text: "OK",
            onPress: () => {
              if (isUpdate) {
                navigation.goBack();
                return;
              }
              navigation.navigate(ONBOARDING);
            },
          },
        ]
      );
    } catch (error) {
      if (error?.code === "au-email") {
        setError("That email address is invalid!");
      }
      if (error?.code === "auth/user-not-found") {
        setError("That user does not exist!");
      }
    }
    setLoading(false);
  };

  return (
    <Box flex backgroundColor={BACKGROUND}>
      <Wrapper
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.container}
        keyboard
      >
        <TemplateBox borderRadius={20} overflow="hidden">
          <TemplateBox
            style={{
              position: "absolute",
              paddingTop: 8,
              alignSelf: "center",
              alignItems: "center",
              zIndex: 99,
            }}
            backgroundColor={`${BLACK_10}`}
          ></TemplateBox>
          <ResizedImage
            source={lockImage}
            style={{ height: 345, width: WRAPPED_SCREEN_WIDTH }}
            resizeMode="contain"
          />
        </TemplateBox>

        <TemplateBox
          width={WRAPPED_SCREEN_WIDTH}
          mt={16}
          justifyContent="center"
          alignItems="center"
        >
          <TemplateText size={18} bold caps style={styles.title}>
            {isUpdate ? "Update your Password!" : "Reset your Password!"}
          </TemplateText>
          <TemplateText size={14} medium>
            Enter your email to continue
          </TemplateText>
        </TemplateBox>
        <Box width={WRAPPED_SCREEN_WIDTH} mt={16}>
          <TemplateTextInput
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </Box>
        <Error show={!!error} style={styles.generalError}>
          {error}
        </Error>
        <View style={styles.buttonContainer}>
          <Button
            title="Reset Password"
            onPress={handleResetPassword}
            style={styles.button}
            loading={loading}
            disabled={!email}
          />
          {!isUpdate && (
            <TemplateText
              size={14}
              center
              style={styles.signupLink}
              medium
              color={GRAY_SCALE_80}
            >
              New to the app?{" "}
              <TemplateText
                color={WHITE}
                underLine
                size={16}
                medium
                onPress={() => navigation.navigate(ONBOARDING)}
              >
                Sign Up
              </TemplateText>
            </TemplateText>
          )}
        </View>
      </Wrapper>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  contentContainerStyle: {
    flex: 1,
  },
  buttonContainer: {
    alignSelf: "center",
  },
  button: {
    marginTop: 24,
    marginBottom: 16,
  },
  signupLink: {
    marginBottom: 16,
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
    backgroundColor: GREY_30,
    marginTop: 16,
  },
  generalError: {
    marginVertical: 10,
    alignSelf: "center",
  },
});
export default ResetPasswordScreen;
