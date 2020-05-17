import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen';
import DrawerRouter from './DrawerRouter';
import LoadingScreen from '../screens/LoadingScreen';
import UserContext from '../context/user-context';

const Stack = createStackNavigator();

export default () => {
  const { userState } = useContext(UserContext);

  return (
    <NavigationContainer>
      {userState.uid === '' || userState.facebookName === '' ? (
        <Stack.Navigator
          initialRouteName="LoadingScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
          />
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
          />
        </Stack.Navigator>
      ) : (
          <Stack.Navigator
            initialRouteName="DrawerRouter"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen
              name="DrawerRouter"
              component={DrawerRouter}
            />
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}