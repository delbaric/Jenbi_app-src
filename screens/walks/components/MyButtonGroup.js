import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../../constants/colors';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default ({ selectedIndex, setSelectedIndex }) => {

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.Container}>
        <TouchableOpacity
          onPress={() => setSelectedIndex(0)}
          activeOpacity={0.9}
        >
          <View style={[styles.Button, selectedIndex === 0 ? styles.ButtonActive : '']}>
            <Text style={selectedIndex === 0 ? styles.ButtonTextActive : styles.ButtonText}>השבוע</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedIndex(1)}
          activeOpacity={0.9}
        >
          <View style={[styles.Button, selectedIndex === 1 ? styles.ButtonActive : '']}>
            <Text style={selectedIndex === 1 ? styles.ButtonTextActive : styles.ButtonText}>החודש</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setSelectedIndex(2)}
          activeOpacity={0.9}
        >
          <View style={[styles.Button, selectedIndex === 2 ? styles.ButtonActive : '']}>
            <Text style={selectedIndex === 2 ? styles.ButtonTextActive : styles.ButtonText}>הכל</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row-reverse',
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Button: {
    marginHorizontal: 10,
    height: 35,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    opacity: 1,
    borderWidth: 1
  },
  ButtonActive: {
    backgroundColor: Colors.header,
    borderColor: Colors.header,
    height: 35,
    width: 90,
    elevation: 1
  },
  ButtonText: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    color: 'black'
  },
  ButtonTextActive: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
    color: 'white',
  }
});