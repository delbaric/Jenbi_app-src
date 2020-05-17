import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, KeyboardAvoidingView, Picker, StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import Header from "../../components/Header";
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import UserContext from '../../context/user-context';
import TipsContext from '../../context/tips-context';
import { startSetTips } from '../../actions/tips';
import TipItem from './components/TipItem';

export default ({ navigation }) => {
  const { userState } = useContext(UserContext);
  const { tipsState, tipsDispatch } = useContext(TipsContext);
  const [label, setLabel] = useState("all");

  useEffect(() => {
    startSetTips(tipsDispatch)
  },[tipsState.tips.length])

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.screen}>
        <Header screenName="טיפים" navigation={navigation} />

        <View style={styles.line}>
          <View style={{ width: '40%' }}>
            <Text style={styles.headline}>סינון לפי תיוג: </Text>
          </View>
          <Picker
            selectedValue={label}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) => setLabel(itemValue)}>
            <Picker.Item label="הכל" value="all" />
            <Picker.Item label="הליכות" value="הליכות" />
            <Picker.Item label="תחבורה" value="תחבורה" />
            <Picker.Item label="בריאות" value="בריאות" />
            <Picker.Item label="תזונה" value="תזונה" />
            <Picker.Item label="תשומת לב" value="תשומת לב" />
            <Picker.Item label="משחקים" value="משחקים" />
            <Picker.Item label="התנהגות בבית" value="התנהגות בבית" />
            <Picker.Item label="מקומות ציבוריים" value="מקומות ציבוריים" />
          </Picker>
        </View>

        <View style={{ flex: 4 }}>
          {label === "all" || tipsState.tips.filter(tip => tip.label === label).length > 0 ? (
            <ScrollView style={styles.tipsContainer}>
              {tipsState.tips.filter(tip => label === "all" ? true : tip.label === label)
                .reverse()
                .map((tip) =>
                  <TipItem key={tip.id} {...tip} />
                )}
              <View style={{ height: 20 }}></View>
            </ScrollView>
          ) : (
              <Text style={{ fontFamily: 'Rubik-Regular', fontSize: 20, textAlign: 'center' }}>לא קיימים טיפים בתיוג זה.{'\n'} אגב, שמתם לב לכפתור כאן למטה? </Text>
            )}
        </View>

        <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row-reverse', marginVertical: 10 }}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => {
            navigation.navigate('AddTip');
          }}
          >
            <View style={styles.button}>
              <Text style={styles.buttonText}>הוספת טיפ</Text>
            </View>
          </TouchableOpacity>
        </View>

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
  line: {
    flex: 0.5,
    width: '90%',
    margin: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.buttonBorderDefault,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  headline: {
    fontSize: 18,
    fontFamily: 'Rubik-Regular',
  },
  picker: {
    width: '60%',
  },
  tipsContainer: {
    width: '90%',
    padding: 5,
    marginBottom: 10,
    borderColor: Colors.buttonBorderDefault,
    borderWidth: 1,
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