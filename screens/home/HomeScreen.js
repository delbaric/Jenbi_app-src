import React, { useContext } from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import Colors from '../../constants/colors';
import Header from "../../components/Header";
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import NavBoxWalks from './components/NavBoxWalks';
import NavBoxTreats from './components/NavBoxTreats';
import NavBoxProfile from './components/NavBoxProfile';
import NavBoxTips from './components/NavBoxTips';
import UserContext from '../../context/user-context';

export default ({ navigation }) => {
  const { userState } = useContext(UserContext);

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.screen}>
        <Header screenName="בית" navigation={navigation} />
        <View style={styles.screenContent}>
          <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        </View>
        <View style={{ flex: 3.5, flexDirection: "row-reverse" }}>
          <View style={styles.NavBox}>
            <NavBoxProfile navigation={navigation} />
            <NavBoxTreats navigation={navigation} />
            <NavBoxWalks navigation={navigation} />
            <NavBoxTips navigation={navigation} />
          </View>
        </View>
      </View>
    );
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
  NavBox: {
    flex: 1,
    padding: '5%',
  },
  logo: {
    flex: 1,
    width: '120%',
  },
  greeting: {
    flex: 0.25,
    alignItems: 'center'
  },
  greetingText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 20
  },
});