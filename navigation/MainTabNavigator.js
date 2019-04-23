import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createDrawerNavigator
} from 'react-navigation';

// import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PostPoem from '../screens/PostPoem';
import FooterTabs from '../components/FooterTabs';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});
const PostStack = createStackNavigator({
  Post: PostPoem
});
const Drawer = createDrawerNavigator({
  Home: {
    screen: HomeScreen
  },
  Post: {
    screen: PostPoem
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home'
};
PostStack.navigationOptions = {
  tabBarLabel: 'Post'
};
export default createBottomTabNavigator(
  {
    Drawer,
    HomeStack,
    PostStack
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
