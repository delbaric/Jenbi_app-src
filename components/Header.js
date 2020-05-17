import React from "react";
import { ImageBackground, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default props => {
  const { screenName, navigation } = props;
  let [fontsLoaded] = useFonts({
    'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../assets/headerScheme.png')} style={styles.backgroundScheme}>
          <View style={styles.header}>
            <Feather name="menu" color='transparent' size={hp('6%')} />
            <Text style={styles.screenName}>{screenName}</Text>
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
              if (!!navigation)
                navigation.openDrawer()
            }}>
              <Feather name="menu" color='white' size={hp('6%')} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: hp('12.5%'),
    flexDirection: 'row',
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: wp('5.3%'),
    paddingTop: hp('5.3%'),
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  screenName: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'Rubik-Bold',
  },
  backgroundScheme: {
    flex: 1
  }
});