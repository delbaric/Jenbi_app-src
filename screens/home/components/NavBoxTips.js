import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { AntDesign, EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Colors from '../../../constants/colors';
import TipsContext from '../../../context/tips-context';
import { startSetTips } from '../../../actions/tips';

export default ({ navigation }) => {
  const { tipsDispatch } = useContext(TipsContext);

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.Right}>
          <Text style={styles.itemTitle}>טיפים</Text>
          <Text style={styles.itemText}>יש לכם שאלה? או שאולי יש לכם את התשובה? הצטרפו למאמץ שימור המידע.</Text>
        </View>
        <View style={styles.Left}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              startSetTips(tipsDispatch);
              navigation.jumpTo('TipsCenter');
            }}
          >
            <View style={styles.Button}>
              <Text style={styles.buttonText}>לטיפים</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.header,
    borderRadius: 20,
    paddingVertical: '2.5%',
    paddingHorizontal: '5%',
    flexDirection: 'row-reverse',
  },
  Right: {
    flex: 1.8,
    alignSelf: 'flex-start'

  },
  Left: {
    flex: 1,
    marginTop: '5%',
    alignSelf: 'center'
  },
  itemTitle: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: 'Rubik-Bold',
  },
  itemText: {
    fontSize: 13,
    fontFamily: 'Rubik-Regular',
  },
  Button: {
    backgroundColor: Colors.buttonDefault,
    height: 35,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    opacity: 1,
  },
  buttonText: {
    color: 'white'
  }
});