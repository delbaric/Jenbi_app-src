import firestore from '../firebase/firebase';
import moment from 'moment';

export const updateTreats = (treats, lastUpdate) => ({
  type: 'UPDATE_TREATS',
  treats,
  lastUpdate
});

export const startAddTreat = async (userContext, treatData) => {
  const { userState, userDispatch } = userContext;
  const { uid, treats } = userState;
  const id = firestore.collection('make-id').doc().id;
  const newTreat = {
    id,
    ...treatData
  };
  treats.push(newTreat);
  const lastUpdate = moment(Date.now()).format('DD/MM/YYYY')
  try {
    await firestore.doc(`users/${uid}`).update({
      treats,
      lastUpdate
    });
    userDispatch(updateTreats(treats, lastUpdate));
  }
  catch (error) { console.log(error) }
};

export const startEditTreat = async (userContext, treatID, updates) => {
  const { userState, userDispatch } = userContext;
  const { uid, treats } = userState;
  const tmpTreats = treats.map(treat => {
    if (treat.id !== treatID)
      return treat
    else
      return ({ ...treat, ...updates })
  });
  const lastUpdate = moment(Date.now()).format('DD/MM/YYYY');
  try {
    await firestore.doc(`users/${uid}`).update({
      treats: tmpTreats,
      lastUpdate
    });
    userDispatch(updateTreats(tmpTreats, lastUpdate));
  }
  catch (error) { console.log(error) }
};

export const startRemoveTreat = async (userContext, treatID) => {
  const { userState, userDispatch } = userContext;
  const { uid, treats } = userState;
  const tmpTreats = treats.filter(treat => {
    return (treat.id !== treatID)
  });
  const lastUpdate = moment(Date.now()).format('DD/MM/YYYY');
  try {
    await firestore.doc(`users/${uid}`).update({
      treats: tmpTreats,
      lastUpdate
    });
    userDispatch(updateTreats(tmpTreats, lastUpdate));
  }
  catch (error) { console.log(error) }
};
