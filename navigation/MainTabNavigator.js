import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

// import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PostPoem from '../screens/PostPoem';

const HomeStack = createStackNavigator({
  Home: HomeScreen
});
const PostStack = createStackNavigator({
  Post: PostPoem
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home'
  // tabBarIcon: ({ focused }) => (
  //   <TabBarIcon
  //     focused={focused}
  //     name={
  //       Platform.OS === 'ios'
  //         ? `ios-information-circle${focused ? '' : '-outline'}`
  //         : 'md-information-circle'
  //     }
  //   />
  // )
};
PostStack.navigationOptions = {
  tabBarLabel: 'Post'
  // tabBarIcon: ({ focused }) => (
  //   <TabBarIcon
  //     focused={focused}
  //     name={
  //       Platform.OS === 'ios'
  //         ? `ios-information-circle${focused ? '' : '-outline'}`
  //         : 'md-information-circle'
  //     }
  //   />
  // )
};
export default createBottomTabNavigator({
  HomeStack,
  PostStack
});
