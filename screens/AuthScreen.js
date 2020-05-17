import React, { useContext, useEffect, useState } from "react";
import { Text, Image, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts } from '@use-expo/font';
import Colors from '../constants/colors';
import UserContext from '../context/user-context';
import { startLogin } from '../actions/auth';
import Header from '../components/Header';

export default () => {
  const { userDispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <View style={styles.screen}><ActivityIndicator /></View>
  } else if (loading) {
    return <View style={styles.screen}><ActivityIndicator /></View>
  } else {
    return (
      <View style={styles.screen}>
        <Header screenName="ברוכים הבאים" />
        <View style={styles.screenContent}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </View>
        <View style={{ ...styles.screenContent, flex: 2 }}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>שלום!</Text>
            <Text style={styles.text}>לחצו להתחברות</Text>
          </View>
          <View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                startLogin(userDispatch);
                setLoading(true);
              }}
            >
              <View style={styles.buttonContainer}>
                <Image
                  style={styles.ImageIconStyle}
                  source={require('../../assets/facebook.png')}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.screenBackground
  },
  screenContent: {
    flex: 1,
    // justifyContent: "center",
    alignItems: 'center'
  },
  logo: {
    flex: 1,
    width: 600
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: hp('12%'),
    width: wp('50%'),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#3b5998',
    backgroundColor: '#3b5998',
    marginBottom: hp('15%'),
  },
  textContainer: {
    paddingVertical: hp('3%'),
    alignItems: 'center'
  },
  ImageIconStyle: {
    height: hp('10.5%'),
    width: wp('48%'),
    resizeMode: 'stretch',
  },
  text: {
    fontSize: hp('3.7%'),
    fontFamily: 'Rubik-Bold',
    color: '#28437d'
  }
});