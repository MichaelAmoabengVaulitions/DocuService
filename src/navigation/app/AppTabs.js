// src/navigation/AppTabs.js

import React from 'react';
import { StyleSheet, View } from 'react-native'; // ← added View
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from '@react-native-community/blur';
import {
    CHATS_STACK,
    HOME_STACK,
    OFFERS_STACK,
    PROFILE_STACK,
} from '../ScreenNames';
import HomeStack from './HomeStack';
import OffersStack from './OffersStack';
import ChatsStack from '../chats/ChatsStack';
import ProfileStack from './ProfileStack';
import TabButton from '../../components/tabs/TabButton';
import TabLabel from '../../components/tabs/TabLabel';
import useNotificationPermissions from '../../hooks/notifications/useNotificationPermissions';
import { BLACK, BLACK_30, BLUE, WHITE_90, WHITE, IOS_BLUE } from '../../theme/Colors';

const Tab = createBottomTabNavigator();

const AppTabs = () => {
    useNotificationPermissions();

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                lazy: true,
                freezeOnBlur: true,
                animationEnabled: false,
                gestureEnabled: false,
                // dark glass background, clipped to rounded tab bar
                tabBarBackground: () => (
                    <View style={styles.blurContainer}>
                        <BlurView
                            style={StyleSheet.absoluteFill}
                            blurType="dark"
                            blurAmount={40}
                            pointerEvents="none"  
                            reducedTransparencyFallbackColor="rgba(0,0,0,0.4)"
                        />
                    </View>
                ),
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    left: '5%',
                    width: '90%',
                    height: 70,
                    backgroundColor: BLACK_30,
                    borderTopWidth: 0,
                    borderRadius: 70,
                    overflow: 'hidden', 
                    elevation: 8,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 16,
                    alignItems: 'center',
                    paddingBottom: 5,
                },
            }}
        >
            <Tab.Screen
                name={HOME_STACK}
                component={HomeStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton focused={focused} icon={'Home'} color={focused ? IOS_BLUE : WHITE} />
                    ),
                    tabBarLabel: (props) => <TabLabel {...props}>Home</TabLabel>,
                }}
            />
            <Tab.Screen
                name={OFFERS_STACK}
                component={OffersStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton focused={focused} icon={'Saved'} color={focused ? IOS_BLUE : WHITE} />
                    ),
                    tabBarLabel: (props) => <TabLabel {...props}>Saved</TabLabel>,
                }}
            />
            <Tab.Screen
                name={CHATS_STACK}
                component={ChatsStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton focused={focused} icon={'Chat'} color={focused ? IOS_BLUE : WHITE} />
                    ),
                    tabBarLabel: (props) => <TabLabel {...props}>Chat</TabLabel>,
                }}
            />
            <Tab.Screen
                name={PROFILE_STACK}
                component={ProfileStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <TabButton focused={focused} icon={'Profile'} color={focused ? IOS_BLUE : WHITE} />
                    ),
                    tabBarLabel: (props) => <TabLabel {...props}>Profile</TabLabel>,
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    blurContainer: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 70,
        overflow: 'hidden',
    },
});

export default AppTabs;
