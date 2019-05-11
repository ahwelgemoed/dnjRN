import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';
import { fadeIn } from 'react-navigation-transitions';
import HomeScreen from '../screens/HomeScreen';
import BookmarkScreen from '../screens/BookmarkScreen';
import PostPoem from '../screens/PostPoem';
import DrawerScreen from '../screens/DrawerScreen';
import AccountScreen from '../screens/AccountScreen';
import FooterTabs from '../components/FooterTabs';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Post: {
    screen: PostPoem
  },
  Account: {
    screen: AccountScreen
  },
  Bookmark: {
    screen: BookmarkScreen
  }
});

const Tabs = createBottomTabNavigator(
  {
    HomeStack
  },
  {
    defaultNavigationOptions: {
      tabBarComponent: props => <FooterTabs {...props} />,
      headerStyle: {
        backgroundColor: '#f4511e'
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

export default (Drawer = createDrawerNavigator(
  {
    Home: {
      screen: Tabs
    }
  },
  {
    // drawerLockMode: 'locked-closed',
    contentComponent: DrawerScreen,
    initialRouteName: 'Home',
    transitionConfig: () => fadeIn(),
    drawerWidth: 200
  }
));
