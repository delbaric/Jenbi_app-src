import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Colors from '../../../constants/colors';
import ScalerVal from './ScalerVal';

export default ({ title, type, stateSetter, stateVal, stateInit, includeItems, setIncludeItems }) => {
  const [isChecked, setIsChecked] = useState(stateInit);

  const restoreDefaultState = () => {
    stateSetter(stateInit);
  }

  useEffect(() => {
    const tmp = includeItems;
    if (isChecked) {
      tmp.push(title);
    }
    else {
      tmp.filter(item => item != title);
    }
    setIncludeItems(tmp);
   
  }, [isChecked]);

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View>
        <View style={styles.contentItem}>
          <View style={{ width: '7%' }}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => {
                if (!isChecked) {
                  setIsChecked(true);
                }
                else {
                  setIsChecked(false);
                  restoreDefaultState();
                }
              }}>
              {isChecked ? (
                <MaterialIcons name="radio-button-checked" color={Colors.buttonBorderDefault} size={11} />
              ) : (
                  <MaterialIcons name="radio-button-unchecked" color={Colors.buttonBorderDefault} size={11} />
                )}
            </TouchableOpacity>
          </View>
          <View style={{ marginRight: 10, width: '55%' }}>
            <Text style={styles.contentItemText}>{title}</Text>
          </View>
          <View style={{ width: '40%' }}>

            {type === "counter" ? (
              <View style={[styles.adjuster, isChecked ? styles.adjusterActive : '']}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (!isChecked) {
                      setIsChecked(true);
                    }
                    stateSetter(amount => amount + 1)
                  }}>
                  {isChecked ? (
                    <AntDesign name="plus" color={Colors.buttonBorderDefault} size={11} />
                  ) : (
                      <AntDesign name="plus" color='grey' size={11} />

                    )}
                </TouchableOpacity>
                <Text style={[styles.adjusterText, isChecked ? styles.adjusterTextActive : '']}>{stateVal}</Text>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    if (!isChecked) {
                      setIsChecked(true);
                    }
                    stateSetter(amount => amount - 1)
                  }}>
                  {isChecked ? (
                    <AntDesign name="minus" color={Colors.buttonBorderDefault} size={11} />
                  ) : (
                      <AntDesign name="minus" color='grey' size={11} />
                    )}
                </TouchableOpacity>
              </View>
            ) : type === "boolean" ? (
              <View style={[styles.adjuster, isChecked ? styles.adjusterActive : '']}>
                {stateVal !== -1 && (<TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    if (!isChecked) {
                      setIsChecked(true);
                    }
                    stateSetter(val => val === 0 ? 1 : 0)
                  }}>
                  <Text style={[styles.adjusterText, isChecked ? styles.adjusterTextActive : '']}>כן</Text>
                </TouchableOpacity>
                )}
                {stateVal !== 1 && (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                      if (!isChecked) {
                        setIsChecked(true);
                      }
                      stateSetter(val => val === 0 ? -1 : 0)
                    }}>
                    <Text style={[styles.adjusterText, isChecked ? styles.adjusterTextActive : '']}>לא</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (<View></View>)}
          </View>
        </View>
        {type === "scale" && (
          <View style={{marginTop: 5}}>
            <View style={[styles.adjuster, isChecked ? styles.adjusterActive : '']}>
              <ScalerVal id={1}
                isChecked={isChecked} setIsChecked={setIsChecked}
                scaleVal={stateVal} setScaler={stateSetter} />
              <ScalerVal id={2}
                isChecked={isChecked} setIsChecked={setIsChecked}
                scaleVal={stateVal} setScaler={stateSetter} />
              <ScalerVal id={3}
                isChecked={isChecked} setIsChecked={setIsChecked}
                scaleVal={stateVal} setScaler={stateSetter} />
              <ScalerVal id={4}
                isChecked={isChecked} setIsChecked={setIsChecked}
                scaleVal={stateVal} setScaler={stateSetter} />
              <ScalerVal id={5}
                isChecked={isChecked} setIsChecked={setIsChecked}
                scaleVal={stateVal} setScaler={stateSetter} />
            </View>
          </View>
        )}
      </View>
    );
  };
};

const styles = StyleSheet.create({
  contentItem: {
    marginTop: 15,
    width: '80%',
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  contentItemText: {
    fontSize: 14,
    fontFamily: 'Rubik-Regular',
  },
  adjuster: {
    flexDirection: 'row-reverse',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-around'
  },
  adjusterActive: {
    borderColor: Colors.buttonBorderDefault,
  },
  adjusterText: {
    fontSize: 13,
    fontFamily: 'Rubik-Regular',
    color: 'grey'
  },
  adjusterTextActive: {
    color: Colors.buttonBorderDefault
  }
});