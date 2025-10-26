import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { StackScreenProps } from "@react-navigation/stack";
import { AuthStackParamList } from "@/navigation/auth/AuthStack";
import Box from "@/components/Box";
import { Colors } from "@/constants/Colors";
import Wrapper from "@/components/Wrapper";
import {
  SCREEN_WIDTH,
  WRAPPED_SCREEN_WIDTH,
  WRAPPER_MARGIN,
} from "@/constants/Layout";
import TemplateText from "@/components/TemplateText";
import TemplateTextInput from "@/components/TemplateTextInput";
import Error from "@/components/Error";
import Button from "@/components/Button";
import { ONBOARDING } from "@/navigation/screenNames";

//const lockImage = require("../../../assets/images/onboarding/lock.png");

type ForgotPasswordScreen = StackScreenProps<
  AuthStackParamList,
  "ForgotPasswordScreen"
>;

const ForgotPasswordScreen: React.FC<ForgotPasswordScreen> = ({
  navigation,
  route,
}) => {
  const isUpdate = route.params?.isUpdate;
  const [email, setEmail] = useState();

  const [error, setError] = useState<null | string>(null);

  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    // try {
    //   setLoading(true);
    //   if (!email) {
    //     setError("Please enter your email address");
    //     setLoading(false);
    //     return;
    //   }
    //   await auth().sendPasswordResetEmail(email);
    //   Alert.alert(
    //     isUpdate ? "Password Update" : "Password Reset",
    //     "A password reset link has been sent to your email address",
    //     [
    //       {
    //         text: "OK",
    //         onPress: () => {
    //           if (isUpdate) {
    //             navigation.goBack();
    //             return;
    //           }
    //           navigation.navigate(ONBOARDING);
    //         },
    //       },
    //     ]
    //   );
    // } catch (error) {
    //   if (error?.code === "au-email") {
    //     setError("That email address is invalid!");
    //   }
    //   if (error?.code === "auth/user-not-found") {
    //     setError("That user does not exist!");
    //   }
    // }
    setLoading(false);
  };

  return (
    <Box flex backgroundColor={Colors.BLACK} pt={80}>
      <Wrapper
        contentContainerStyle={styles.contentContainerStyle}
        style={styles.container}
        keyboard
      >
        <Box borderRadius={20} overflow="hidden">
          <Box
            style={{
              position: "absolute",
              paddingTop: 8,
              alignSelf: "center",
              alignItems: "center",
              zIndex: 99,
            }}
            backgroundColor={`${Colors.BLACK_10}`}
          ></Box>
          {/* <Image
            source={lockImage}
            style={{ height: 345, width: WRAPPED_SCREEN_WIDTH }}
            resizeMode="contain"
          /> */}
        </Box>

        <Box
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
        </Box>
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
              color={Colors.WHITE_30}
            >
              New to the app?{" "}
              <TemplateText
                color={Colors.WHITE}
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
    borderColor: Colors.BLACK_10,
    borderRadius: 8,
    paddingLeft: 16,
    backgroundColor: Colors.WHITE,
    marginTop: 16,
  },
  generalError: {
    marginVertical: 10,
    alignSelf: "center",
  },
});
export default ForgotPasswordScreen;
