import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import WalkModal from './WalkModal';
import MakeStringTime from '../../../helpers/MakeStringTime';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

export default props => {
  const [modalVisible, setModalVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setModalVisible(true)}
      >
        <View style={styles.itemContainer}>
          <WalkModal
            navigation={props.navigation}
            modalState={modalVisible}
            setModalState={setModalVisible}
            walk={props.walk} />

          <View style={{marginLeft: 2, width: '10%'}}><Ionicons name="ios-expand" size={20} /></View>

          <View style={styles.leftSide}>
            <Text style={styles.duration}>{MakeStringTime(props.walk.duration)}</Text>
          </View>
          <View style={styles.rightSide}>
            <Text style={styles.createdAt}>{moment(props.walk.createdAt).format('DD/MM/YYYY')}</Text>
            <Text style={styles.description}>{props.walk.description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: '1%',
    paddingBottom: '3%',
    paddingHorizontal: '1%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderColor: Colors.buttonBorderDefault
  },
  leftSide: {
    justifyContent: 'center',
    width: '37.5%',
    alignItems: 'flex-end'
  },
  createdAt: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
  },
  duration: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
  },
  rightSide: {
    width: '47.5%',
    alignItems: 'flex-end'
  }
  ,
  description: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular',
  },
  buttons: {
    justifyContent: 'center',
    width: '15%'
  },
  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  }
});