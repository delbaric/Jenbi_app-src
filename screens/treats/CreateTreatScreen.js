import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Colors from '../../constants/colors';
import UserContext from '../../context/user-context';
import { startAddTreat } from '../../actions/treats';
import Header from "../../components/Header";
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default ({ navigation }) => {
  const userContext = useContext(UserContext);
  const [description, setDescription] = useState('');
  const [momentDate, setMomentDate] = useState(moment().format('DD/MM/YYYY'));
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [treatPicker, setTreatPicker] = useState(-1);

  const handleConfirm = (selectedDate) => {
    const currentDate = selectedDate || date;
    setDatePickerVisibility(false);
    setMomentDate(moment(currentDate).format('DD/MM/YYYY'));
  };

  const handleCancel = () => {
    setDescription('');
    setMomentDate(moment().format('DD/MM/YYYY'));
    setTreatPicker(-1);
  }

  const jsx = (
    <View style={styles.content}>
      <View style={styles.picker}>
        <View style={styles.pickerRow}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.pickerItemRight, treatPicker === 0 ? styles.pickerActive : '']}
            onPress={() => {
              setDescription('אמפולה');
              setMomentDate(moment().add(1, 'month').format('DD/MM/YYYY'));
              setTreatPicker(0);
            }}>
            <Text style={[styles.pickerItemText, treatPicker === 0 ? styles.pickerTextActive : '']}>אמפולה</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.pickerItemLeft, treatPicker === 1 ? styles.pickerActive : '']}
            onPress={() => {
              setDescription('תולעת הפארק');
              setMomentDate(moment().add(2, 'month').format('DD/MM/YYYY'));
              setTreatPicker(1);
            }}>
            <Text style={[styles.pickerItemText, treatPicker === 1 ? styles.pickerTextActive : '']}>תולעת הפארק</Text>
          </TouchableOpacity>
        </View>
        <View style={{...styles.pickerRow, borderTopWidth: 0, borderBottomWidth: 0}}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.pickerItemRight, treatPicker === 2 ? styles.pickerActive : '']}
            onPress={() => {
              setDescription('משושה');
              setMomentDate(moment().add(1, 'month').format('DD/MM/YYYY'));
              setTreatPicker(2);
            }}>
            <Text style={[styles.pickerItemText, treatPicker === 2 ? styles.pickerTextActive : '']}>משושה</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.pickerItemLeft, treatPicker === 3 ? styles.pickerActive : '']}
            onPress={() => {
              setDescription('כלבת');
              setMomentDate(moment().add(1, 'year').format('DD/MM/YYYY'));
              setTreatPicker(3);
            }}>
            <Text style={[styles.pickerItemText, treatPicker === 3 ? styles.pickerTextActive : '']}>כלבת</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.pickerRow}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.pickerItemRight, treatPicker === 4 ? styles.pickerActive : '']}
            onPress={() => {
              setDescription('תולעי מעיים');
              setMomentDate(moment().add(6, 'month').format('DD/MM/YYYY'));
              setTreatPicker(4);
            }}>
            <Text style={[styles.pickerItemText, treatPicker === 4 ? styles.pickerTextActive : '']}>תולעי מעיים</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.9}
            style={[styles.pickerItemLeft, treatPicker === 5 ? styles.pickerActive : '']}
            onPress={() => {
              setDescription('');
              setMomentDate(moment().format('DD/MM/YYYY'));
              setTreatPicker(5);
            }}>
            <Text style={[styles.pickerItemText, treatPicker === 5 ? styles.pickerTextActive : '']}>אחר</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.contentItem}>
        <Text style={styles.contentItemText}>שם: </Text>
        <TextInput
          onChangeText={(desc) => setDescription(desc)}
          value={description}
          style={styles.textInput}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setDescription('');
            setTreatPicker(-1);
            setMomentDate(moment().format('DD/MM/YYYY'));
          }}>
          <MaterialIcons name="clear" color={Colors.buttonBorderDefault} size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentItem}>
        <Text style={styles.contentItemText}>בתוקף עד:</Text>
        <Text style={{ ...styles.contentItemText, borderBottomWidth: 1 }}>{momentDate}</Text>
        <TouchableOpacity activeOpacity={0.9} onPress={() => {
          setDatePickerVisibility(true);
        }}>
          <AntDesign name="calendar" color={Colors.buttonBorderDefault} size={30} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        activeOpacity={0.9}
        style={{ ...styles.button, minWidth: '0%', marginVertical: hp('1%') }}
        onPress={() => {
          navigation.navigate('TreatsInfo')
        }}>
        <Text style={{ ...styles.buttonText, fontSize: hp('2.5%') }}>מידע</Text>
      </TouchableOpacity>

      {isDatePickerVisible && (
        <View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </View>
      )}

      <View style={{ flexDirection: 'row-reverse' }}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => {
          if (description === '') {
            alert('נא להזין תיאור לטיפול');
          } else if (moment(momentDate, 'DD/MM/YYYY').isSame(Date.now(), 'day')) {
            alert('נא להגדיר תוקף לטיפול');
          } else {
            startAddTreat(userContext, {
              createdAt: moment(Date.now()).format('DD/MM/YYYY HH:mm:ss'),
              description: description,
              validTo: momentDate
            });
            navigation.goBack();
          }
        }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>שמירה</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.9} onPress={() => {
          handleCancel();
          navigation.goBack();
        }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>ביטול</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.screen}>
        <Header screenName="הוספת טיפול" navigation={navigation} />
        {jsx}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBackground
  },
  content: {
    paddingHorizontal: wp('1%'),
    paddingTop: hp('3%'),
    width: wp('100%'),
    height: hp('100%'),
    alignItems: 'center',
  },
  contentItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    width: '75%',
    justifyContent: 'space-between',
  },
  contentItemText: {
    marginVertical: 20,
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
  },
  textInput: {
    minWidth: wp('40%'),
    height: hp('6%'),
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('1.2%'),
    fontFamily: 'Rubik-Regular',
    fontSize: 20
  },
  button: {
    marginVertical: hp('3%'),
    marginHorizontal: wp('2.5%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1.2%'),
    minWidth: wp('33%'),
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.buttonDefault
  },
  buttonText: {
    fontSize: hp('4.5%'),
    fontFamily: 'Rubik-Regular',
    color: 'white'
  },
  picker: {
    height: 250,
    width: 320,
  },
  pickerRow: {
    borderWidth: 1,
    borderColor: Colors.buttonBorderDefault,
    alignItems: 'center',
    justifyContent: 'center',
    height: '33%',
    flexDirection: 'row-reverse'
  },
  pickerItemLeft: {
    borderColor: Colors.buttonBorderDefault,
    width: '50%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerItemRight: {
    borderLeftWidth: 1,
    borderColor: Colors.buttonBorderDefault,
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerActive: {
    backgroundColor: Colors.header,
  },
  pickerItemText: {
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
  },
  pickerTextActive: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Rubik-Regular'
  }
});