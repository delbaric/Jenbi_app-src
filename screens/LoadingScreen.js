import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import UserContext from '../context/user-context';
import { firebase } from '../firebase/firebase';
import { startFetchUser } from '../actions/auth';

export default ({ navigation }) => {
  const { userDispatch } = useContext(UserContext);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        startFetchUser(userDispatch, user.uid);
      }
      else {
        navigation.navigate('AuthScreen');
      }
    })
  }, [])

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator />
    </View>
  );
}