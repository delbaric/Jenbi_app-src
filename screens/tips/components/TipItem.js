import React, { useContext, useState } from 'react';
import { Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SimpleLineIcons } from '@expo/vector-icons';
import Colors from '../../../constants/colors';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import UserContext from '../../../context/user-context';
import TipModal from './TipModal';

export default props => {
  const { userState } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <TipModal
          modalState={modalVisible}
          setModalState={setModalVisible}
          tip={props} />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setShow((curr) => !curr)}
        >
          <View style={styles.container}>
            <View style={[styles.item, show ? { borderBottomWidth: 0.5 } : '']}>
              <View style={{ justifyContent: 'space-between', alignItems: 'flex-end', width: '40%' }}>
                <Text style={styles.name}>{props.author.name}</Text>
                {props.author.puppy && <Text style={styles.puppy}>{props.author.puppy}</Text>}
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'flex-end', width: '55%' }}>
                <Text style={styles.title}>{props.title}</Text>
              </View>
              {props.author.uid === userState.uid && (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => setModalVisible(true)}
                >
                  <SimpleLineIcons name="pencil" size={14} />
                </TouchableOpacity>
              )}

            </View>
            {show &&
              <View>
                <View style={{ ...styles.body, alignItems: "flex-end", flexDirection: "column" }}>
                  <Text style={styles.bodyText}>{props.body}</Text>
                </View>
                <View style={{ ...styles.body, borderTopWidth: 0.5 }}>
                  <View>
                    <Text style={styles.infoText}>גיל: {props.age}</Text>
                    <Text style={styles.infoText}>תיוג: {props.label}</Text>
                  </View>
                  <Text style={styles.infoText}>{props.createdAt.substring(0, 10)}</Text>

                </View>
              </View>
            }
          </View>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginBottom: '1%',
    marginHorizontal: '1%',
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.buttonBorderDefault
  },
  item: {
    flexDirection: 'row-reverse',
  },
  name: {
    fontFamily: 'Rubik-Regular',
    fontSize: 18
  },
  puppy: {
    fontFamily: 'Rubik-Bold',
    fontSize: 12,
    color: Colors.buttonDefault
  },
  title: {
    fontFamily: 'Rubik-Regular',
    fontSize: 16
  },
  body: {
    marginVertical: 10,
    marginHorizontal: 5,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between'
  },
  bodyText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 14
  },
  infoText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 10
  }
});
