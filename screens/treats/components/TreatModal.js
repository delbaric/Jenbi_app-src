import React, { useContext, useState } from 'react';
import { Text, TextInput, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/colors';
import UserContext from '../../../context/user-context';
import { startEditTreat, startRemoveTreat } from '../../../actions/treats';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default props => {
  const userContext = useContext(UserContext);
  const { id, createdAt, description, validTo } = props.treat;
  const [descriptionState, setDescription] = useState(description);
  const [removeRequest, setRemoveRequest] = useState(false);

  const handleRemove = () => {
    startRemoveTreat(userContext, id);
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
          <Text style={styles.modalText}>נוצר: {createdAt.substring(0, createdAt.length - 3)}</Text>
          <Text style={styles.modalText}>בתוקף עד: {validTo}</Text>

          <TextInput
            placeholder={description}
            onChangeText={(desc) => setDescription(desc)}
            value={descriptionState}
            style={styles.textInput}
          />
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
                  startEditTreat(userContext, id, {
                    description: descriptionState
                  });
                  props.setModalState(false);
                }}
              >
                <Text style={styles.modalButtonText}>עדכן</Text>
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
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'space-around'

  },
  modalButton: {
    width: '45%',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
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
    fontWeight: 'bold',
    marginBottom: 10
  }
});