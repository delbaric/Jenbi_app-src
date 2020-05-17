import React, { useState, useEffect } from 'react';
import { Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Colors from '../../../constants/colors';

export default ({ setPuppy, profilePuppy }) => {
  const [name, setName] = useState(profilePuppy.name);
  const [gender, setGender] = useState(profilePuppy.gender);
  const [birth, setBirth] = useState(profilePuppy.birth);
  const [_day, _month, _year] = birth.split('/');
  const [year, setYear] = useState(_year);
  const [month, setMonth] = useState(_month);
  const [day, setDay] = useState(_day);

  useEffect(() => {
    const date = `${day}/${month}/${year}`;
    setBirth(date);
  }, [day, month, year]);

  useEffect(() => {
    setPuppy({ name, birth, gender });
  }, [name, birth, gender])

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.line}>
          <Text style={styles.headline}>שם הגור: </Text>
          <TextInput
            onChangeText={(val) => setName(val)}
            value={name}
            style={{ ...styles.textInput, width: '30%', fontSize: 15, marginHorizontal: 10 }}
          />
          <View style={{ borderColor: Colors.header, borderWidth: 0.5, borderRadius: 10}}>
          <Picker
            selectedValue={gender}
            style={{width: 100, height: 30}}
            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}>
            <Picker.Item label="מין.." value="unknown" />
            <Picker.Item label="זכר" value="זכר" />
            <Picker.Item label="נקבה" value="נקבה" />
          </Picker>
          </View>

        </View>

        <View style={styles.line}>
          <Text style={styles.headline}>תאריך לידת הגור: </Text>
          <View style={styles.column}>
            <TextInput
              onChangeText={(val) => setYear(val)}
              value={year}
              keyboardType={'numeric'}
              maxLength={4}
              style={{ ...styles.textInput, width: 50 }}
            />
            <Text style={styles.fieldText}>שנה</Text>
          </View>

          <View style={styles.column}>
            <TextInput
              onChangeText={(val) => setMonth(val)}
              value={month}
              keyboardType={'numeric'}
              maxLength={2}
              style={styles.textInput}
            />
            <Text style={styles.fieldText}>חודש</Text>
          </View>

          <View style={styles.column}>
            <TextInput
              onChangeText={(val) => setDay(val)}
              value={day}
              keyboardType={'numeric'}
              maxLength={2}
              style={styles.textInput}
            />
            <Text style={styles.fieldText}>יום</Text>
          </View>

        </View>
      </View>
    );
  };
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: Colors.buttonBorderDefault,
    padding: 5,
    marginBottom: 15,
    marginTop: 10,
    width: '95%',
    alignItems: 'center'
  },
  line: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 15,
    width: '95%',

  },
  headline: {
    fontFamily: 'Rubik-Regular',
    fontSize: 15
  },
  column: {
    alignItems: 'center',
    marginHorizontal: 5
  },
  textInput: {
    width: 35,
    height: hp('5%'),
    borderColor: Colors.header,
    borderBottomWidth: 1,
    paddingHorizontal: wp('2.5%'),
    fontFamily: 'Rubik-Regular',
    fontSize: 11,
  },
  fieldText: {
    fontFamily: 'Rubik-Regular',
    fontSize: 11
  }
});