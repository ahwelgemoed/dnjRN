import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBrowserApp,
  createStackNavigator
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import { fadeIn } from 'react-navigation-transitions';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import { Platform } from 'react-native';
// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });

const createApp = Platform.select({
  // web: config => createBrowserApp(config, { history: 'hash' }),
  default: config => createAppContainer(config)
});

const AuthStack = createStackNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
      navigationOptions: {
        drawerLockMode: 'locked-closed'
      }
    },
    LoginScreen: LoginScreen,
    SignupScreen: SignupScreen
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default createApp(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: MainTabNavigator,
      Auth: AuthStack
    },
    {
      initialRouteName: 'AuthLoading'
    }
  )
);
