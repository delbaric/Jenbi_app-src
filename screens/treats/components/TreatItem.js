import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Colors from '../../../constants/colors';
import TreatModal from './TreatModal';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default props => {
  const [modalVisible, setModalVisible] = useState(false);
  const desc = props.description.replace(' ', '\n');

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.itemContainer}>

        <TreatModal
          modalState={modalVisible}
          setModalState={setModalVisible}
          treat={props} />
        <TouchableOpacity
          style={{ alignItems: 'center', justifyContent: 'center' }}
          activeOpacity={0.9}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.propDesc}><Text style={styles.description}>{desc}</Text></View>
          <View style={styles.propValidTo}><Text style={styles.validToHeadline}>בתוקף עד</Text></View>
          <View style={styles.propValidToVal}><Text style={styles.validToValue}>{props.validTo}</Text></View>
          <View style={styles.propIcon}><Image style={styles.ImageIconStyle} source={require('../../../../assets/finger.png')} /></View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    borderColor: Colors.buttonBorderDefault,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: hp('0.5%'),
    marginHorizontal: hp('0.5%'),
    height: hp('28.5%'),
    width: wp('29%'),
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white'
  },
  validToHeadline: {
    fontSize: hp('1.8%'),
    fontFamily: 'Rubik-Regular',
  },
  validToValue: {
    fontSize: hp('2%'),
    fontFamily: 'Rubik-Regular',
  },
  description: {
    fontSize: 17,
    textAlign:'center',
    fontFamily: 'Rubik-Bold',
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },
  propDesc: {
    height: '40%'
  },
  propValidTo: {
    height: '15%'
  },
  propValidToVal: {
    height: '20%'
  },
  propIcon: {
    height: '15%'
  }
});