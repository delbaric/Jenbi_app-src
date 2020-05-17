import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Header from "../../components/Header";
import Colors from '../../constants/colors';
import UserContext from '../../context/user-context';
import WalksList from './components/WalksList';

export default ({ navigation }) => {
  const { userState } = useContext(UserContext);
  const [dateRangeIndex, setDateRangeIndex] = useState(0);

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.screen}>
        <Header screenName="הליכות" navigation={navigation} />
        <View style={{ ...styles.screenContent, justifyContent:'center', flex: 0.75 }}>
          {userState.walks.length === 0 ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Rubik-Regular', fontSize: 20 }}>עדיין לא תיעדתם הליכות. </Text>
            </View>
          ) : (
              <WalksList
                dateRangeIndex={dateRangeIndex}
                setDateRangeIndex={setDateRangeIndex}
                navigation={navigation}
              />
            )}
        </View>

        <View style={{ ...styles.screenContent, flex: 0.25 }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => navigation.navigate('StopwatchScreen')}
          >
            <View style={styles.bigButton}>
              <Text style={styles.bigButtonText}>
                בואו נלך!
          </Text>
            </View>
          </TouchableOpacity>
        </View>
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
    justifyContent: "center",
    alignItems: 'center'
  },
  bigButton: {
    backgroundColor: Colors.letsGoButton,
    paddingHorizontal: '20%',
    paddingVertical: '2%',
    alignItems: 'center',
    borderColor: '#e0d0c3',
    borderWidth: 2,
    borderRadius: 20
  },
  bigButtonText: {
    fontSize: 50,
    fontFamily: 'Rubik-Regular',
    color: 'white'
  }
});