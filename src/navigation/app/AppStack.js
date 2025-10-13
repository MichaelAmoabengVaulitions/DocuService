import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  APP_TABS,
  CREATORS_PROFILES_STACK,
  EVENT_DETAILS_SCREEN,
  EVENTS_SCREEN,
  FAVORITE_EVENTS_SCREEN,
  HOME,
  HOME_STACK,
  SUBSCRIPTION,
  WEBVIEW,
} from "../ScreenNames";
import {
  SWITCH,
  TRANSPARENT_HEADER,
  TRANSPARENT_HEADER_NO_LOGO,
  TRANSPARENT_NO_LOGO_HEADER,
} from "../../components/header/ScreenOptions";
import SubscriptionScreen from "../../screens/subscriptions/SubscriptionScreen";

import HomeStack from "./HomeStack";

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

const AppStack = () => (
  <Navigator
    initialRouteName={HOME_STACK}
    screenOptions={{
      ...SWITCH,
      freezeOnBlur: true,
      animationEnabled: false,
      gestureEnabled: false,
      transitionSpec: {
        open: { animation: "timing", config: { duration: 200 } },
        close: { animation: "timing", config: { duration: 200 } },
      },
    }}
  >
    <Screen
      name={HOME_STACK}
      options={{ headerShown: false }}
      component={HomeStack}
    />
    <Screen
      name={SUBSCRIPTION}
      component={SubscriptionScreen}
      options={TRANSPARENT_HEADER_NO_LOGO}
    />
  </Navigator>
);

export default AppStack;
