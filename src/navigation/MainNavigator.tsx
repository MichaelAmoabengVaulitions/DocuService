// navigation/MainNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./app/AppStack";
import AuthStack from "./auth/AuthStack";

export default function MainNavigator() {
  // TODO: replace with real auth state (Firebase/Auth context, etc.)
  const isSignedIn = true;

  return (
    <NavigationContainer>
      {isSignedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
