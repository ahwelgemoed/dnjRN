import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator
} from 'react-navigation';
import HomeScreen from '../screens/HomeScreen';
import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import SignupScreen from '../screens/SignupScreen';
// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
const AuthStack = createStackNavigator({
  LoginScreen: LoginScreen,
  SignupScreen: SignupScreen
});

export default createAppContainer(
  createSwitchNavigator(
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    // Main: MainTabNavigator,
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
