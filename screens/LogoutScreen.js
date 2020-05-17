import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import Colors from '../constants/colors';
import UserContext from '../context/user-context';
import { startLogout } from '../actions/auth';
import Header from '../components/Header';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default ({ navigation }) => {
  const { userDispatch } = useContext(UserContext);

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.screen}>
        <Header screenName="התנתקות" navigation={navigation} />
        <View style={styles.container}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.button}
            onPress={() => {
              startLogout(userDispatch);
            }}
          ><View>
              <Text style={styles.buttonText}>התנתקות</Text>
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
  },
  container: {
    flex: 4,
    paddingHorizontal: '2%',
    paddingBottom: '2%',
    backgroundColor: Colors.screenBackground,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    padding: '6%',
    minWidth: '33%',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1,
    backgroundColor: '#dd4b39',
    marginBottom: 100
  },
  buttonText: {
    fontSize: 30,
    fontFamily: 'Rubik-Regular',
    color: 'white'
  }
});