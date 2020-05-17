import React, { useContext, useState } from 'react';
import { Picker, Text, TextInput, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/colors';
import UserContext from '../../../context/user-context';
import TipsContext from '../../../context/tips-context';
import { startEditTip, startRemoveTip } from '../../../actions/tips';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default props => {
  const userContext = useContext(UserContext);
  const { tipsDispatch } = useContext(TipsContext);

  const [title, setTitle] = useState(props.tip.title);
  const [body, setBody] = useState(props.tip.body);
  const [age, setAge] = useState(props.tip.age);
  const [label, setLabel] = useState(props.tip.label);
  const [removeRequest, setRemoveRequest] = useState(false);

  const handleRemove = () => {
    startRemoveTip(tipsDispatch, props.tip.id);
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
          <Text style={styles.modalText}>עודכן לאחרונה: {String(props.tip.createdAt).substring(0, 10)}</Text>

          <TextInput
            placeholder={props.tip.title}
            onChangeText={(val) => setTitle(val)}
            value={title}
            style={styles.textInput}
          />

          <TextInput
            placeholder={props.tip.body}
            onChangeText={(val) => setBody(val)}
            value={body}
            multiline={true}
            numberOfLines={5}
            style={{ ...styles.textInput, height: 200 }}
          />

          <Picker
            selectedValue={label}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setLabel(itemValue)}>
            <Picker.Item label="תיוג.." value="unknown" />
            <Picker.Item label="הליכות" value="הליכות" />
            <Picker.Item label="תחבורה" value="תחבורה" />
            <Picker.Item label="בריאות" value="בריאות" />
            <Picker.Item label="תזונה" value="תזונה" />
            <Picker.Item label="תשומת לב" value="תשומת לב" />
            <Picker.Item label="משחקים" value="משחקים" />
            <Picker.Item label="התנהגות בבית" value="התנהגות בבית" />
            <Picker.Item label="מקומות ציבוריים" value="מקומות ציבוריים" />
          </Picker>
          <Picker
            selectedValue={age}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setAge(itemValue)}>
            <Picker.Item label="לגילאים.." value="unknown" />
            <Picker.Item label="עד שלושה חודשים" value="עד שלושה חודשים" />
            <Picker.Item label="3-6 חודשים" value="3-6 חודשים" />
            <Picker.Item label="חצי שנה או יותר" value="חצי שנה או יותר" />
            <Picker.Item label="לכל הגילאים" value="לכל הגילאים" />
          </Picker>

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
                  startEditTip(tipsDispatch, props.tip.id, {
                    title,
                    body,
                    label,
                    age
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
  },
  picker: {
    width: 200
  }
});