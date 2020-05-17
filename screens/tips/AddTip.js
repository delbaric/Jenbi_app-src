import React, { useState, useContext } from 'react';
import { ScrollView, KeyboardAvoidingView, Picker, StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import Header from "../../components/Header";
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import UserContext from '../../context/user-context';
import TipsContext from '../../context/tips-context';
import { startAddTip } from '../../actions/tips';

export default ({ navigation }) => {
  const userContext = useContext(UserContext);
  const { tipsDispatch } = useContext(TipsContext);

  const [title, setTitle] = useState();
  const [label, setLabel] = useState();
  const [age, setAge] = useState();
  const [body, setBody] = useState();

  const restoreFieldsToDefault = () => {
    setTitle();
    setLabel();
    setAge();
    setBody();
  };

  const validData = () => {
    if (!!title && !!label && !!age && !!body)
      if (label !== "unknown" && age !== "unknown")
        return true;
    alert("הוספת הטיפ נכשלה - יש למלא את כל השדות");
  }

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.screen}>
        <Header screenName="הוספת טיפ" navigation={navigation} />

        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.screenContent}>
              <View style={styles.line}>
                <Text style={styles.headline}>כותרת: </Text>
                <TextInput
                  onChangeText={(val) => setTitle(val)}
                  value={title}
                  style={{ ...styles.textInput, marginHorizontal: 20 }}
                />
              </View>

              <View style={{ ...styles.line, justifyContent: 'space-evenly' }}>
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
              </View>

              <View style={styles.line}>
                <Text style={styles.headline}>תוכן: </Text>
                <TextInput
                  multiline={true}
                  numberOfLines={15}
                  onChangeText={(val) => setBody(val)}
                  value={body}
                  style={styles.textInputLarge}
                />
              </View>
            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row-reverse', marginTop: 20 }}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => {
                if (validData()) {
                  startAddTip(userContext, tipsDispatch, {
                    title,
                    label,
                    age,
                    body
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
                restoreFieldsToDefault();
                navigation.goBack();
              }}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>ביטול</Text>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    alignItems: 'center'
  },
  screenContent: {
    marginTop: 20
  },
  line: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.buttonBorderDefault,
    padding: 5,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 15,
  },

  headline: {
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
    textAlign: 'center'
  },
  textInput: {
    minWidth: '60%',
    height: hp('4.5%'),
    borderColor: 'black',
    borderBottomWidth: 1,
    paddingHorizontal: wp('2.5%'),
    fontFamily: 'Rubik-Regular',
    fontSize: 18,
  },
  textInputLarge: {
    width: '70%',
    borderColor: 'black',
    borderWidth: 0.25,
    paddingHorizontal: wp('2.5%'),
    fontFamily: 'Rubik-Regular',
    fontSize: 14,
    backgroundColor: 'white',
    marginHorizontal: 20
  },
  picker: {
    width: 125,
  },
  button: {
    marginVertical: hp('1.5%'),
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
});