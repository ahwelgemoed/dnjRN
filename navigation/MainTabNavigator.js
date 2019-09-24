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
import TemaScreen from '../screens/TemaScreen';
import YourPoems from '../screens/YourPoems';
import Settings from '../screens/Settings';
import RecordScreen from '../screens/RecordScreen';
import PodCastScreen from '../screens/PodCastScreen';
import FooterTabs from '../components/FooterTabs';

const HomeStack = createStackNavigator(
  {
    PodCastScreen: {
      screen: PodCastScreen
    },
    Home: {
      screen: HomeScreen
    },
    TemaScreen: {
      screen: TemaScreen
    },
    Post: {
      screen: PostPoem
    },
    Settings: {
      screen: Settings
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
    },
    RecordPoem: {
      screen: RecordScreen
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

export default Drawer = createDrawerNavigator(
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
);
