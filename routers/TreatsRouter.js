import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import TreatsScreen from '../screens/treats/TreatsScreen';
import CreateTreatScreen from '../screens/treats/CreateTreatScreen';
import TreatsInfo from '../screens/treats/TreatsInfo';
const Stack = createStackNavigator();

export default () => (
  <Stack.Navigator initialRouteName="TreatsScreen" screenOptions={{
    headerShown: false,
  }}>
    <Stack.Screen name="TreatsScreen" component={TreatsScreen} />
    <Stack.Screen name="CreateTreatScreen" component={CreateTreatScreen} />
    <Stack.Screen name="TreatsInfo" component={TreatsInfo} />
  </Stack.Navigator>
);

