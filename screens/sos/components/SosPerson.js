import React, { useState } from 'react';
import { TouchableOpacity, Clipboard, Linking, Text, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';

export default ({ name, address, phone }) => {

  const [show, setShow] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setShow((curr) => !curr)}
    >
      <View style={styles.container}>
        <View style={styles.item}>
          <Text style={styles.name}>{name}</Text>
        </View>
        {show && <View>
          {address &&
            <View style={styles.item}>
              <Text style={styles.address}>{address}</Text>
            </View>
          }
          <View style={styles.item}>
            <TouchableOpacity 
            onPress={() => Clipboard.setString(String(phone))}>
              <MaterialIcons name="content-copy" size={hp('3%')} />
            </TouchableOpacity>
            <View style={styles.phoneItem}>
              <Text
                style={styles.phone}
                onPress={() => Linking.openURL(`tel:${phone}`)}
              >
                {phone}
              </Text>
            </View>
          </View>
        </View>
        }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '97.5%',
    paddingHorizontal: '1%',
    marginVertical: hp('0.5%'),
    marginHorizontal: wp('1%'),
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    borderColor: Colors.buttonBorderDefault
  },
  item: {
    flexDirection: 'row-reverse',
    paddingVertical: '0.5%'
  },
  phoneItem: {
    marginRight: wp('3%'),
  },
  name: {
    fontSize: 16,
    fontFamily: 'Rubik-Regular'
  },
  address: {
    fontSize: 13,
    fontFamily: 'Rubik-Regular'
  },
  phone: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
    color: 'blue',
    textDecorationLine: 'underline'
  }
});
