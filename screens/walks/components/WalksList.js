import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Colors from '../../../constants/colors';
import UserContext from '../../../context/user-context';
import MyButtonGroup from './MyButtonGroup';
import MakeStringTime from '../../../helpers/MakeStringTime';
import SummaryCalc from '../../../helpers/SummaryCalc';
import makeDateRange from '../../../helpers/MakeDateRange';
import WalksListItems from './WalksListItems';

export default props => {
  const { userState } = useContext(UserContext);
  const walks = userState.walks;
  const [timeClock, setTimeClock] = useState('');
  const [relevantWalks, setRelevantWalks] = useState([]);

  const selectedIndex = props.dateRangeIndex;
  const setSelectedIndex = props.setDateRangeIndex;

  useEffect(() => {
    const { matchedWalks, totalTimeInSeconds } = SummaryCalc(walks, makeDateRange(selectedIndex));
    setRelevantWalks(matchedWalks)
    const hours = Math.floor(totalTimeInSeconds / 3600);
    const minutes = Math.floor((totalTimeInSeconds - 3600 * hours) / 60);
    const seconds = totalTimeInSeconds - 3600 * hours - 60 * minutes;
    setTimeClock(`${hours} : ${minutes} : ${seconds}`);
  }, [userState, selectedIndex]);

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.container}>
        <MyButtonGroup
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
        <View style={{ ...styles.ItemsContainer, flex: 0.3 }}>
          <View style={styles.contentItem}>
            <Text style={styles.template}>הליכות נצברו:</Text>
            <Text style={styles.vars}>{relevantWalks.length}</Text>
          </View>
          <View style={styles.contentItem}>
            <Text style={styles.template}>סך הכל:</Text>
            <Text style={styles.vars}>{MakeStringTime(timeClock)}</Text>
          </View>
        </View>
        <View style={{ ...styles.walkList, width: '98%', flex: 0.9}}>
          <WalksListItems walks={relevantWalks} navigation={props.navigation} />
        </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ItemsContainer: {
    flexDirection: 'row-reverse',
  },
  contentItem: {
    alignItems: 'flex-end',
    marginRight: '10%',
    maxWidth: '50%',
  },
  template: {
    fontSize: 18,
    fontFamily: 'Rubik-Regular'
  },
  vars: {
    fontSize: 20,
    color: Colors.buttonDefault,
    fontFamily: 'Rubik-Bold'
  },
  walkList: {
    flex: 0.9,
    justifyContent: "center",
    alignItems: 'center'
  },
});