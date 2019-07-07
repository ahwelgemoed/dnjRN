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
import ShareScreen from '../screens/ShareScreen';
import YourPoems from '../screens/YourPoems';
import FooterTabs from '../components/FooterTabs';

const HomeStack = createStackNavigator(
  {
    Post: {
      screen: PostPoem
    },
    Home: {
      screen: HomeScreen
    },
    YourPoems: {
      screen: YourPoems
    },
    Account: {
      screen: AccountScreen
    },
    Share: {
      screen: ShareScreen
    },
    Bookmark: {
      screen: BookmarkScreen
    }
  },
  {
    headerMode: 'none'
  }
);

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
    drawerWidth: 250
  }
));
