import React, { useContext, useState, useEffect } from 'react';
import { ScrollView, KeyboardAvoidingView, Picker, StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Colors from '../../constants/colors';
import UserContext from '../../context/user-context';
import Header from "../../components/Header";
import { startUpdateProfile } from '../../actions/profile';
import PuppyObj from './components/PuppyObj';

export default ({ navigation }) => {
  const userContext = useContext(UserContext);
  const { userState } = userContext;
  const profile = userState.profile;

  const [myName, setMyName] = useState(profile.name);
  const [status, setStatus] = useState(profile.status);
  const [puppy, setPuppy] = useState(profile.puppy);
  const [city, setCity] = useState(profile.city);

  const restoreFieldsToDefault = () => {
    setMyName(profile.name);
    setStatus(profile.status);
    setPuppy(profile.puppy);
    setCity(profile.city);
  };

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.screen}>
        <Header screenName="פרופיל" navigation={navigation} />
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <ScrollView>
            <View style={styles.screenContent}>
              <View style={styles.line}>
                <Text style={styles.headline}>השם שלי: </Text>
                <TextInput
                  onChangeText={(val) => setMyName(val)}
                  value={myName}
                  style={{ ...styles.textInput, marginRight: 10, marginLeft: 30 }}
                />
              </View>

              <View style={styles.line}>
                <Text style={styles.headline}>סטטוס: </Text>
                <View style={{ borderColor: Colors.header, borderWidth: 0.5, borderRadius: 10, marginRight: 10 }}>
                  <Picker
                    selectedValue={status}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setStatus(itemValue)}>
                    <Picker.Item label="בחרו.." value="unknown" />
                    <Picker.Item label="אומנה פעילה" value="אומנה פעילה" />
                    <Picker.Item label="אומנה לשעבר" value="אומנה לשעבר" />
                    <Picker.Item label="אחר" value="אחר" />
                  </Picker>
                </View>
              </View>

              <PuppyObj setPuppy={setPuppy} profilePuppy={profile.puppy} />

              <View style={styles.line}>
                <Text style={styles.headline}>עיר: </Text>
                <TextInput
                  onChangeText={(val) => setCity(val)}
                  value={city}
                  style={{ ...styles.textInput, marginRight: 10, marginLeft: 50 }}
                />
              </View>
            </View>
            <View style={styles.info}>
              <Ionicons name="ios-people" color={Colors.header} size={30} />
              <Text style={styles.infoText}>
                הפרופיל הוא ציבורי {'\n'}
             יתר המשתמשים יוכלו לראות את המידע שלכם</Text>
            </View>
            <View style={{ justifyContent: 'center', flexDirection: 'row-reverse', marginTop: 15 }}>
              <TouchableOpacity activeOpacity={0.9} onPress={() => {
                startUpdateProfile(userContext, {
                  city,
                  name: myName,
                  puppy,
                  status,
                });
                navigation.jumpTo('HomeScreen');
              }}
              >
                <View style={styles.button}>
                  <Text style={styles.buttonText}>שמירה</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9} onPress={() => {
                restoreFieldsToDefault();
                navigation.jumpTo('HomeScreen');
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
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    alignItems: 'center'
  },
  screenContent: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.buttonDefault
  },
  line: {
    marginTop: 10,
    width: '95%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.buttonBorderDefault,
    padding: 5,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 15,
  },
  headline: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
  },
  textInput: {
    minWidth: '60%',
    height: hp('4.5%'),
    borderColor: Colors.header,
    borderBottomWidth: 1,
    paddingHorizontal: wp('2.5%'),
    fontFamily: 'Rubik-Regular',
    fontSize: 16,
  },
  picker: {
    width: 200,
    height: 30
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
  info: {
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: Colors.buttonDefault,
    borderRadius: 5,
    paddingBottom: 5,
  },
  infoText: {
    textAlign: 'center',
    fontFamily: 'Rubik-Regular',
    fontSize: 12,
    color: Colors.header
  }
})