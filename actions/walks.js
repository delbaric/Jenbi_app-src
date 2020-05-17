import firestore from '../firebase/firebase';
import moment from 'moment';

export const updateWalks = (walks, lastUpdate) => ({
  type: 'UPDATE_WALKS',
  walks,
  lastUpdate
});

export const startAddWalk = async (userContext, walkData) => {
  const { userState, userDispatch } = userContext;
  const { uid, walks } = userState;
  const id = firestore.collection('make-id').doc().id;
  const newWalk = {
    id,
    ...walkData
  };
  walks.push(newWalk)
  const lastUpdate = moment(Date.now()).format('DD/MM/YYYY HH:mm:ss')
  try {
    await firestore.doc(`users/${uid}`).update({
      walks,
      lastUpdate
    });
    userDispatch(updateWalks(walks, lastUpdate));
  }
  catch (error) { console.log(error) }
};

export const startEditWalk = async (userContext, walkID, updates) => {
  const { userState, userDispatch } = userContext;
  const { uid, walks } = userState;
  const tmpWalks = walks.map(walk => {
    if (walk.id !== walkID)
      return walk
    else
      return ({ ...walk, ...updates })
  });
  const lastUpdate = moment(Date.now()).format('DD/MM/YYYY HH:mm:ss');
  try {
    await firestore.doc(`users/${uid}`).update({
      walks: tmpWalks,
      lastUpdate
    });
    userDispatch(updateWalks(tmpWalks, lastUpdate));
  }
  catch (error) { console.log(error) }
};

export const startRemoveWalk = async (userContext, walkID) => {
  const { userState, userDispatch } = userContext;
  const { uid, walks } = userState;
  const tmpWalks = walks.filter(walk => {
    return (walk.id !== walkID)
  });
  const lastUpdate = moment(Date.now()).format('DD/MM/YYYY HH:mm:ss');
  try {
    await firestore.doc(`users/${uid}`).update({
      walks: tmpWalks,
      lastUpdate
    });
    userDispatch(updateWalks(tmpWalks, lastUpdate));
  }
  catch (error) { console.log(error) }
};