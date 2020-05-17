import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Header from '../../components/Header';
import Colors from '../../constants/colors';
import StopwatchButton from './components/StopwatchButton';
import BlinkerView from './components/BlinkerView';

export default ({ navigation }) => {
  const [ticker, setTicker] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [totalTimeAcc, setTotalTimeAcc] = useState(0);
  const [prevTimeAcc, setPrevTimeAcc] = useState(0);
  const timeZoneDiff = 7200000;

  function save() {
    const totalTime = String(moment(totalTimeAcc - timeZoneDiff).format('HH : mm : ss'));
    navigation.navigate('CreateWalkScreen', { createdAt: Date.now(), timeClock: totalTime});
  }

  function reset() {
    setIsActive(false);
    setStartTime(Date.now());
    setTotalTimeAcc(0);
    setPrevTimeAcc(0);
  }

  function toggle() {
    if (!isActive) {
      setStartTime(Date.now());
    } else {
      setPrevTimeAcc(totalTimeAcc);
    }
    setIsActive(!isActive)
  }

  useEffect(() => {
    let interval;
    if (isActive) {
      setTotalTimeAcc(prevTimeAcc + Date.now() - startTime);
      interval = setInterval(() => {
        setTicker(ticker => ticker + 1);
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, ticker]);

  const activeJSX = (
    <View>
      <Text style={styles.timeText}>{moment(totalTimeAcc - timeZoneDiff).format('HH:mm:ss')}</Text>
    </View>
  );

  const inactiveJSX = (
    <BlinkerView>
      <Text style={styles.timeText}>{moment(totalTimeAcc - timeZoneDiff).format('HH:mm:ss')}</Text>
    </BlinkerView>
  );

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.screen}>
        <Header screenName="הליכה חדשה" navigation={navigation} />
        <View style={styles.circleWrapper}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={toggle}
          >
            <View style={styles.circle}>
              {isActive ? activeJSX : totalTimeAcc !== 0 ? inactiveJSX : <Text style={styles.timeText}>00:00:00</Text>}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={{ flexDirection: 'row-reverse' }}>

            <StopwatchButton
              isActive={isActive}
              enable={true}
              type='reset'
              action={reset}
            />

            <StopwatchButton
              isActive={isActive}
              enable={!isActive && totalTimeAcc > 0}
              type='done'
              action={save}
            />

            <StopwatchButton
              isActive={isActive}
              enable={true}
              type='play-pause'
              action={toggle}
            />

          </View>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.screenBackground
  },
  timeText: {
    fontSize: hp('6%'),
    fontFamily: 'Rubik-Regular',
    color: Colors.buttonDefault,
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 280,
    height: 280,
    borderRadius: 280 / 2,
    backgroundColor: Colors.stopwatch1,
    borderColor: Colors.stopwatch2,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleWrapper: {
    height: hp('71%'),
    justifyContent: 'center',
  },
  buttonsWrapper: {
    height: hp('10%'),
  }
});