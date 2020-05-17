import React, { useContext } from 'react';
import { ScrollView, Text, Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import Colors from '../../constants/colors';
import UserContext from '../../context/user-context';
import TreatItem from './components/TreatItem';
import Header from "../../components/Header";

export default ({ navigation }) => {
  const { userState } = useContext(UserContext);
  const treats = userState.treats;

  return (
    <View style={styles.screen}>
      <Header screenName="טיפולים" navigation={navigation} />

      <View style={[styles.container, treats.length > 6 ? { borderBottomWidth: 0.5, borderColor: '#444a54' } : '']}>
        {treats.length === 0 ? (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>עדיין לא הוספתם טיפולים. </Text>
          </View>
        ) :
          (
            <ScrollView>
              <View style={styles.treatItems}>
                {treats.sort((a, b) => {
                  if (moment(a.validTo, 'DD/MM/YYYY')
                    .isSameOrBefore(
                      (moment(b.validTo, 'DD/MM/YYYY'))))
                    return -1;
                  return 1;
                })
                  .map((treat) =>
                    <TreatItem key={treat.id} {...treat} />
                  )}
              </View>
            </ScrollView>
          )}
      </View>
      <View style={{ backgroundColor: 'transparent', width: '30%' }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('CreateTreatScreen')}
        >
          <Image style={styles.ImageButtonStyle} source={require('../../../assets/plus.png')} />
        </TouchableOpacity>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBackground
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: hp('1%'),
    marginHorizontal: wp('1%'),
    backgroundColor: Colors.screenBackground,
  },
  treatItems: {
    paddingHorizontal: wp('3%'),
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    alignItems: 'center',
    width: wp('100%')
  },
  ImageButtonStyle: {
    padding: 10,
    margin: 20,
    height: 95,
    width: 95,
    resizeMode: 'stretch',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyListText: {
    fontSize: 20,
    fontFamily: 'Rubik-Regular',
  },
});