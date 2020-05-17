import firestore from '../firebase/firebase';
import moment from 'moment';

export const updateTips = tips => ({
  type: 'UPDATE_TIPS',
  tips,
});

export const startSetTips = async (tipsDispatch) => {
  try {
    const tipsDoc = await firestore.doc(`tips/all`).get();
    const { all } = tipsDoc.data();
    tipsDispatch(updateTips(all));
  }
  catch (error) { console.log(error) }
};

export const startRemoveTip = async (tipsDispatch, id) => {
  try {
    const tipsDoc = await firestore.doc(`tips/all`).get();
    let { all } = tipsDoc.data();
    const newAll = all.filter(item => item.id !== id);
    await firestore.doc(`tips/all`).update({ all: newAll });
    tipsDispatch(updateTips(newAll));
  }
  catch (error) { console.log(error) }

}

export const startEditTip = async (tipsDispatch, id, data) => {
  try {
    const createdAt = moment(Date.now()).format('DD/MM/YYYY HH:mm:ss');
    const tipsDoc = await firestore.doc(`tips/all`).get();
    let { all } = tipsDoc.data();
    const tip = all.find(item => item.id === id);
    const newAll = all.filter(item => item.id !== id);
    newAll.push({
      ...tip,
      ...data,
      createdAt
    })
    await firestore.doc(`tips/all`).update({ all: newAll });
    tipsDispatch(updateTips(newAll));
  }
  catch (error) { console.log(error) }

}

export const startAddTip = async (userContext, tipsDispatch, data) => {
  const { userState } = userContext;
  const { uid, profile } = userState;
  const createdAt = moment(Date.now()).format('DD/MM/YYYY HH:mm:ss');
  const id = firestore.collection('make-id').doc().id;

  const tip = {
    id,
    author: { name: profile.name, uid, puppy: profile.puppy.name },
    createdAt,
    ...data
  };

  try {
    const tipsDoc = await firestore.doc(`tips/all`).get();
    const { all } = tipsDoc.data();
    all.push(tip);
    await firestore.doc(`tips/all`).update({ all });
    tipsDispatch(updateTips(all));
  }
  catch (error) { console.log(error) }
};