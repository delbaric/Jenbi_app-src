import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import WalksCenter from '../screens/walks/WalksCenter';
import StopwatchScreen from '../screens/walks/StopwatchScreen';
import CreateWalkScreen from '../screens/walks/CreateWalkScreen';
import EditWalkScreen from '../screens/walks/EditWalkScreen';
const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="WalksCenter" screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name="WalksCenter" component={WalksCenter} />
    <Stack.Screen name="StopwatchScreen" component={StopwatchScreen} />
    <Stack.Screen name="CreateWalkScreen" component={CreateWalkScreen} />
    <Stack.Screen name="EditWalkScreen" component={EditWalkScreen} />
  </Stack.Navigator>
);

