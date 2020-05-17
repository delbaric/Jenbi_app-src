import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import ProfileCenter from '../screens/profile/ProfileCenter';
const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="ProfileCenter" screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name="ProfileCenter" component={ProfileCenter} />
  </Stack.Navigator>
);

