import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../constants/colors';
import Header from "../../components/Header";
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default ({ navigation }) => {

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.screen}>
        <Header screenName="מידע טיפולים" navigation={navigation} />
        <View style={styles.content}>
          <Text style={{ ...styles.text, fontSize: 17 }}>איך הזמנים מחושבים?</Text>
          <View style={{ flex: 0.6, marginTop: 10, justifyContent: 'space-between' }}>
            <Text>
              אמפולה: 4 שבועות.
              שימו לב שזמן ההמתנה המינימלי המומלץ בין טיפול לטיפול הוא 3 שבועות,
              וכן כי בחודשי החורף התדירות המומלצת גבוהה יותר.
              בנוסף, חשוב לקחת בחשבון את גיל ומשקל הגור.
        </Text>
            <Text>
              תולעת הפארק: החיסון תקף לחודשיים. שימו לב שיש לחסן החל מגיל 4 חודשים.
        </Text>
            <Text>
              משושה: החיסון ניתן 4 פעמים, החל מגיל 6 שבועות,
              כלומר בסך הכל יש לחסן בגילאים 6, 10, 14, 18 שבועות.
        </Text>
            <Text>
              כלבת: החיסון תקף לשנה. שימו לב שיש לחסן בגיל 3 חודשים.
        </Text>
            <Text>
              תולעי מעיים: החיסון תקף לחצי שנה. שימו לב שיש לחסן בגיל 7 חודשים.
        </Text>
            <Text>
              הזמנים המופיעים כאן הם בהשראת נהלי המרכז, ובכל זאת יש להתייחס אליהם כהמלצה בלבד(!) ולהפעיל שיקול דעת ו/או להתייעץ עם סמכות מקצועית בכל הקשור לנושאי בריאות הגורים.
            </Text>
          </View>
          <View style={{ flex: 0.20, justifyContent: 'center' }}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={{ ...styles.button, marginVertical: hp('1%') }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={styles.buttonText}>הבנתי!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View >
    )
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
    width: '95%',
    height: hp('100%'),
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
  },
  button: {
    marginVertical: hp('3%'),
    marginHorizontal: wp('2.5%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1.2%'),
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