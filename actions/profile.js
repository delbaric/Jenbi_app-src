import firestore from '../firebase/firebase';
import moment from 'moment';

export const updateProfile = (profile, lastUpdate) => ({
  type: 'UPDATE_PROFILE',
  profile,
  lastUpdate
});

export const startUpdateProfile = async (userContext, updates) => {
  const { userState, userDispatch } = userContext;
  const { uid, profile } = userState;

  const tmpProfile = {
    ...profile,
    ...updates
  };

  const lastUpdate = moment(Date.now()).format('DD/MM/YYYY');
  try {
    await firestore.doc(`users/${uid}`).update({
      profile: tmpProfile,
      lastUpdate
    });
    userDispatch(updateProfile(tmpProfile, lastUpdate));
  }
  catch (error) { console.log(error) }
};
