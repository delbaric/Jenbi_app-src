import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import Header from '../../components/Header';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import SosPerson from './components/SosPerson';

export default ({ navigation }) => {

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.screen}>
        <Header screenName="חירום" navigation={navigation} />
        <View style={styles.container}>
          <Text style={styles.subHeadline}>מרכז לכלבי נחיה בית עובד</Text>
          <ScrollView style={{ borderColor: Colors.buttonBorderDefault, borderWidth: 1, width: '100%' }}>

            <SosPerson
              name='בית עובד - כללי'
              address='דרך השדות 6, בית עובד'
              phone='08-940-8213'
            />

            
          </ScrollView>

          <Text style={styles.subHeadline}>וטרנירים - באר שבע</Text>
          <ScrollView style={{ borderColor: Colors.buttonBorderDefault, borderWidth: 1, width: '100%' }}>
            <SosPerson
              name='ברנע מרפאה וטרינרית'
              address='משעול גירית 2, באר שבע'
              phone='08-642-1848'
            />

            <SosPerson
              name='ד"ר סבינה- הובר מרכז רפואי וטרינרי'
              address='אליהו נאוי 24, באר שבע'
              phone='050-766-8189'
            />
          </ScrollView>


        </View>
      </View>
    )
  }
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 4,
    paddingTop: '2%',
    paddingHorizontal: '2%',
    paddingBottom: '2%',
    backgroundColor: Colors.screenBackground,
    width: '100%',
    alignItems: 'center',
  },
  subHeadline: {
    fontSize: 22,
    fontFamily: 'Rubik-Regular'
  }
});