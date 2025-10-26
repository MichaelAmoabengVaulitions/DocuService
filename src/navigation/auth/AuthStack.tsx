// navigation/stacks/AuthStack.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "@/constants/Colors";
import { SWITCH, TRANSPARENT_HEADER } from "../screenOptions";

import WelcomeScreen from "@/screens/onboarding/WelcomeScreen";
import OnboardingScreen from "@/screens/onboarding/OnboardingScreen";
import SignUpScreen from "@/screens/auth/SignUpScreen";
import SignUpEmailScreen from "@/screens/auth/SignUpEmailScreen";
import LoginScreen from "@/screens/auth/LoginScreen";
import ForgotPasswordScreen from "@/screens/auth/ForgotPasswordScreen";

import {
  WELCOME,
  ONBOARDING,
  SIGN_UP,
  SIGN_UP_EMAIL,
  LOGIN,
  FORGOT_PASSWORD,
} from "../screenNames";
export type AuthStackParamList = {
  WelcomeScreen: undefined;
  OnboardingScreen: undefined;
  SignUpScreen: undefined;
  SignUpEmailScreen: { email: string; type?: string };
  LoginScreen: undefined;
  ForgotPasswordScreen: {
    isUpdate?: boolean;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AuthStackParamList {}
  }
}

const Stack = createNativeStackNavigator<AuthStackParamList>();
const { Navigator, Screen } = Stack;

const AuthStack = () => (
  <Navigator
    id={undefined}
    initialRouteName={WELCOME}
    screenOptions={{
      contentStyle: { backgroundColor: Colors.BLACK },
      ...SWITCH,
      headerLeft: undefined,
    }}
  >
    <Screen
      name={WELCOME}
      component={WelcomeScreen}
      options={TRANSPARENT_HEADER as any}
    />
    <Screen
      name={ONBOARDING}
      component={OnboardingScreen}
      options={TRANSPARENT_HEADER as any}
    />
    <Screen
      name={SIGN_UP}
      component={SignUpScreen}
      options={TRANSPARENT_HEADER as any}
    />
    <Screen
      name={SIGN_UP_EMAIL}
      component={SignUpEmailScreen}
      options={TRANSPARENT_HEADER as any}
    />
    <Screen
      name={LOGIN}
      component={LoginScreen}
      options={TRANSPARENT_HEADER as any}
    />
    <Screen
      name={FORGOT_PASSWORD}
      component={ForgotPasswordScreen}
      options={TRANSPARENT_HEADER as any}
    />
  </Navigator>
);

export default AuthStack;
