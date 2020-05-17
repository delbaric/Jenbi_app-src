import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import StopwatchButtonIcon from './StopwatchButtonIcon';

export default ({ isActive, enable, type, action }) => {

  if (type !== 'done') {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={action}>
        <StopwatchButtonIcon isActive={isActive} type={type} />
      </TouchableOpacity>
    )
  }
  else if (enable) {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={styles.button}
        onPress={action}>
        <StopwatchButtonIcon isActive={isActive} type='done-on' />
      </TouchableOpacity>
    )
  }
  else {
    return (
      <View style={styles.button}>
        <StopwatchButtonIcon isActive={isActive} type='done-off' />
      </View>
    )
  }
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    width: wp('19.5%'),
    height: hp('6%'),
    alignItems: 'center',
    marginHorizontal: 15,
  }
});