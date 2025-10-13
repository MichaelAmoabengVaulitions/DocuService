import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  SWITCH,
  TRANSPARENT_HEADER,
} from "../../components/header/ScreenOptions";
import {
  ALL_DOCUMENT_SUMMARIES,
  HOME,
  NOTIFICATIONS,
  PROFILE_SETTINGS,
  SCAN_DOCUMENT,
  SUMMARY,
} from "../ScreenNames";
import HomeScreen from "../../screens/app/home/HomeScreen";
import ScanDocument from "../../screens/app/home/ScanDocumentScreen";
import SummaryScreen from "../../screens/app/home/SummaryScreen";
import AllDocumentsScreen from "../../screens/app/home/AllDocumentsScreen";
import ProfileScreen from "../../screens/app/home/ProfileScreen";
import NotificationsScreen from "../../screens/app/home/NotificationsScreen";

const Stack = createStackNavigator();
const { Navigator, Screen } = Stack;

const HomeStack = () => (
  <Navigator
    screenOptions={{
      ...SWITCH,
      lazy: true,
      freezeOnBlur: true,
      animationEnabled: false,
      gestureEnabled: false,
      transitionSpec: {
        open: { animation: "timing", config: { duration: 150 } },
        close: { animation: "timing", config: { duration: 200 } },
      },
    }}
  >
    <Screen options={TRANSPARENT_HEADER} name={HOME} component={HomeScreen} />
    <Screen
      name={SCAN_DOCUMENT}
      options={TRANSPARENT_HEADER}
      component={ScanDocument}
    />
    <Screen
      name={SUMMARY}
      options={TRANSPARENT_HEADER}
      component={SummaryScreen}
    />
    <Screen
      name={ALL_DOCUMENT_SUMMARIES}
      options={TRANSPARENT_HEADER}
      component={AllDocumentsScreen}
    />
    <Screen
      name={PROFILE_SETTINGS}
      options={TRANSPARENT_HEADER}
      component={ProfileScreen}
    />
    <Screen
      name={NOTIFICATIONS}
      options={TRANSPARENT_HEADER}
      component={NotificationsScreen}
    />
  </Navigator>
);

export default HomeStack;
