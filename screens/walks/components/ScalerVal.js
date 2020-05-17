import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Colors from '../../../constants/colors';

export default ({ id, isChecked, setIsChecked, scaleVal, setScaler }) => {
  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        {(scaleVal === 0 || scaleVal === id) && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              if (!isChecked) {
                setIsChecked(true);
              }
              setScaler(val => val === 0 ? id : 0);
            }}>
            <Text style={[styles.adjusterText, isChecked ? styles.adjusterTextActive : '']}>{id}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };
};

const styles = StyleSheet.create({
  adjusterText: {
    fontSize: 13,
    fontFamily: 'Rubik-Regular',
    color: 'grey'
  },
  adjusterTextActive: {
    color: Colors.buttonBorderDefault
  }
})