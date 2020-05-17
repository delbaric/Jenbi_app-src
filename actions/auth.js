import * as Facebook from 'expo-facebook';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import moment from 'moment';
import firestore, { firebase } from '../firebase/firebase';

export const startFetchUser = async (userDispatch, authUid) => {
  try {
    const expoPushToken = await registerForPushNotificationsAsync();
    if (!!expoPushToken)
      await firestore.doc(`users/${authUid}`).update({
        lastUpdate: moment(Date.now()).format('DD/MM/YYYY, HH:mm:ss'),
        expoPushToken
      });
    else
      await firestore.doc(`users/${authUid}`).update({
        lastUpdate: moment(Date.now()).format('DD/MM/YYYY, HH:mm:ss'),
      });
    const doc = await firestore.doc(`users/${authUid}`).get();
    const data = doc.data();

    userDispatch(login(authUid, data));
  }
  catch (error) { console.log(error) }
};

export const startSetUpUser = async (facebookId, facebookName, expoPushToken, userDispatch) => {
  try {
    let authUid;
    while (authUid === undefined || authUid === '') {
      authUid = firebase.auth().currentUser.uid;
    }
    const data = {
      expoPushToken: expoPushToken,
      profile: {
        city: '',
        facebook: {
          id: facebookId,
          facebookName: facebookName,
        },
        name: facebookName,
        puppy: { name: '', birth: '', gender: '' },
        status: ''
      },
      lastUpdate: moment(Date.now()).format('DD/MM/YYYY, HH:mm:ss'),
      treats: [],
      walks: []
    };
    await firestore.doc(`users/${authUid}`).set(data);
    userDispatch(login(authUid, data))
  }
  catch (e) { alert(e) }
}

export const login = (uid, data) => {
  return ({
    type: 'LOGIN',
    uid,
    ...data
  });
}

export const startLogin = async (userDispatch) => {
  try {
    await Facebook.initializeAsync('957976824605649');
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile'],
    });
    if (type === 'success') {
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      await firebase.auth().signInWithCredential(credential).catch((error) => { });
      const authUid = firebase.auth().currentUser.uid;
      let ref = await firestore.doc(`users/${authUid}`).get();
      ref = ref.data();
      if (!!ref) {
        startFetchUser(userDispatch, authUid);
      }
      else {
        fetch(`https://graph.facebook.com/me?fields=email,name&access_token=${token}`)
          .then((response) => response.json())
          .then((json) => {
            const { id, name } = json;
            const token = registerForPushNotificationsAsync();
            startSetUpUser(id, name, token, userDispatch);
          })
          .catch(() => {
            alert('ERROR GETTING DATA FROM FACEBOOK')
          })
      }
    }
  } catch ({ message }) {
    alert(`Facebook Login Error: ${message}`);
  }
}

export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
  }
  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }
  return token;
}

export const logout = () => ({
  type: 'LOGOUT',
});

export const startLogout = (authDispatch) => {
  authDispatch(logout());
  firebase.auth().signOut();
};