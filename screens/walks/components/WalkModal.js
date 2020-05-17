import React, { useContext, useState } from 'react';
import { Text, TextInput, Button, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Colors from '../../../constants/colors';
import UserContext from '../../../context/user-context';
import { startEditWalk, startRemoveWalk } from '../../../actions/walks';
import MakeStringTime from '../../../helpers/MakeStringTime';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default props => {

  const userContext = useContext(UserContext);
  const { id, createdAt, description, duration,
    plannedBizi, pulls, rank, unPlannedBizi, wasCompany, wasHalti } = props.walk;
  const [removeRequest, setRemoveRequest] = useState(false);

  const handleRemove = () => {
    startRemoveWalk(userContext, id);
    props.setModalState(false);
  };

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalState}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{moment(createdAt).format('DD/MM/YYYY, HH:mm')}</Text>
          {!!description && (<Text style={styles.modalText}>{description}</Text>)}
          <Text style={styles.modalText}>{MakeStringTime(duration)}</Text>
          {!!plannedBizi && (<Text style={styles.modalText}>ביזי מתוכנן: {plannedBizi}</Text>)}
          {!!unPlannedBizi && (<Text style={styles.modalText}>ביזי לא מתוכנן: {unPlannedBizi}</Text>)}
          {!!wasCompany && (<Text style={styles.modalText}>הלכנו עם עוד גורים: {wasCompany}</Text>)}
          {!!wasHalti && (<Text style={styles.modalText}>הלכנו עם האלטי: {wasHalti}</Text>)}
          {!!pulls && (<Text style={styles.modalText}>כמות המשיכות: {pulls}</Text>)}
          {!!rank && (<Text style={styles.modalText}>דירוג כללי להליכה: {rank}</Text>)}

          <View style={styles.modalButtonsContainer}>

            {removeRequest && (
              <View style={styles.removeWarning}>
                <Text style={styles.removeWarningText}>אי אפשר יהיה לשחזר את הרשומה! אתה בטוח?</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.modalButton}
                  onPress={() => {
                    handleRemove();
                    props.setModalState(false);
                  }}
                >
                  <Text style={styles.modalButtonText}>כן. מחק</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.modalButton}
                  onPress={() => setRemoveRequest(false)}
                >
                  <Text style={styles.modalButtonText}>ביטול</Text>
                </TouchableOpacity>
              </View>
            )}
            {!removeRequest && (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.modalButton}
                onPress={() => setRemoveRequest(true)}
              >
                <Text style={styles.modalButtonText}>מחק</Text>
              </TouchableOpacity>
            )}
            {!removeRequest && (
              <TouchableOpacity
                activeOpacity={0.9}
                style={styles.modalButton}
                onPress={() => {
                  props.setModalState(false);
                  props.navigation.navigate('EditWalkScreen', {walk: props.walk});
                }}
              >
                <Text style={styles.modalButtonText}>עריכה</Text>
              </TouchableOpacity>
            )}
          </View>
          {!removeRequest && (
            <TouchableOpacity
              activeOpacity={0.9}
              style={styles.modalButton}
              onPress={() => props.setModalState(false)}
            >
              <Text style={styles.modalButtonText}>ביטול</Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modalView: {
    margin: 40,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  modalText: {
    marginBottom: 10,
    fontFamily: 'Rubik-Regular',
    textAlign: "center"
  },
  modalButtonsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around'
  },
  modalButton: {
    width: '45%',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1,
    padding: '2%',
    marginBottom: 10,
    borderWidth: 1,
    backgroundColor: Colors.buttonDefault,
    borderColor: Colors.buttonBorderDefault
  },
  modalButtonText: {
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
    color: 'white'
  },
  removeWarning: {
    alignItems: 'center'
  },
  textInput: {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 5
  },
  removeWarningText: {
    textAlign: 'center',
    fontFamily: 'Rubik-Bold',
    marginBottom: 10
  }
});