// navigation/stacks/AppStack.tsx
import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  StackScreenProps,
} from "@react-navigation/stack";

import {
  ALL_DOCUMENT_SUMMARIES,
  HOME,
  NOTIFICATIONS,
  PROFILE_SETTINGS,
  SCAN_DOCUMENT,
  SUMMARY,
} from "../screenNames";

import { SWITCH, TRANSPARENT_HEADER } from "../screenOptions";

import HomeScreen from "@/screens/app/HomeScreen";
import ScanDocumentsScreen from "@/screens/app/ScanDocumentsScreen";
import DocumentsSummaryScreen from "@/screens/app/DocumentSummaryScreen";
import AllDocumentsScreen from "@/screens/app/AllDocumentsScreen";
import ProfileScreen from "@/screens/app/ProfileScreen";
import NotificationsScreen from "@/screens/app/NotificationsScreen";

export type AppStackParamList = {
  [K in
    | typeof HOME
    | typeof SCAN_DOCUMENT
    | typeof SUMMARY
    | typeof ALL_DOCUMENT_SUMMARIES
    | typeof PROFILE_SETTINGS
    | typeof NOTIFICATIONS]: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> =
  StackScreenProps<AppStackParamList, T>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}

const { Navigator, Screen } = createStackNavigator<AppStackParamList>();
const headerOptions: StackNavigationOptions =
  TRANSPARENT_HEADER as StackNavigationOptions;

export default function AppStack() {
  return (
    <Navigator
      initialRouteName={HOME}
      screenOptions={{
        ...SWITCH,
        freezeOnBlur: true,
        gestureEnabled: false,
      }}
      id={undefined}
    >
      <Screen name={HOME} component={HomeScreen} options={headerOptions} />
      <Screen
        name={SCAN_DOCUMENT}
        component={ScanDocumentsScreen}
        options={headerOptions}
      />
      <Screen
        name={SUMMARY}
        component={DocumentsSummaryScreen}
        options={headerOptions}
      />
      <Screen
        name={ALL_DOCUMENT_SUMMARIES}
        component={AllDocumentsScreen}
        options={headerOptions}
      />
      <Screen
        name={PROFILE_SETTINGS}
        component={ProfileScreen}
        options={headerOptions}
      />
      <Screen
        name={NOTIFICATIONS}
        component={NotificationsScreen}
        options={headerOptions}
      />
    </Navigator>
  );
}
