import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import TipsCenter from '../screens/tips/TipsCenter';
import AddTip from '../screens/tips/AddTip';
const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="TipsCenter" screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name="TipsCenter" component={TipsCenter} />
    <Stack.Screen name="AddTip" component={AddTip} />
  </Stack.Navigator>
);

