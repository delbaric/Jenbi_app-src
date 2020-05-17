import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import Header from "../components/Header";
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.screen}>
        <Header screenName="אילוף" navigation={navigation} />
        <View style={{ ...styles.screenContent, flex: 0.25 }}>
          <Text style={styles.headline}>בקרוב</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBackground
  },
  screenContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  headline: {
    fontSize: 25,
    fontFamily: 'Rubik-Regular',
  }
})
