import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import UserContext from '../../context/user-context';
import { startAddWalk } from '../../actions/walks';
import Header from "../../components/Header";
import MakeStringTime from '../../helpers/MakeStringTime';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import moment from 'moment';
import WalkFormInput from './components/WalkFormInput';

export default props => {
  const userContext = useContext(UserContext);
  const [createdAt, setCreatedAt] = useState(0);
  const [timeClock, setTimeClock] = useState('');
  const [description, setDescription] = useState();
  const [plannedBizi, setPlannedBizi] = useState(0);
  const [unPlannedBizi, setUnPlannedBizi] = useState(0);
  const [wasCompany, setWasCompany] = useState(0);
  const [wasHalti, setWasHalti] = useState(0);
  const [pulls, setPulls] = useState(0);
  const [rank, setRank] = useState(0);
  const [includeItems, setIncludeItems] = useState([]);

  useEffect(() => {
    setCreatedAt(props.route.params.createdAt);
    setTimeClock(props.route.params.timeClock);
  }, []);

  useEffect(() => {
    const currHour = Number(moment(createdAt).format('HH'));
    if (currHour > 4 && currHour < 12)
      setDescription("הליכת בוקר");
    else if (currHour < 17)
      setDescription("הליכת צהריים");
    else if (currHour < 21)
      setDescription("הליכת ערב");
    else setDescription("הליכת לילה");
  }, [createdAt]);

  const handleSave = () => {
    const includesArray = includeItems.map(item => {
      switch (item) {
        case 'ביזי מתוכננים':
          return { plannedBizi: String(plannedBizi) };
        case 'ביזי לא מתוכננים':
          return { unPlannedBizi: String(unPlannedBizi) };
        case 'הלכנו עם עוד גורים':
          if (wasCompany !== -1) return { wasCompany: "כן" }; else return { wasCompany: "לא" };
        case 'הלכנו עם האלטי':
          if (wasHalti !== -1) return { wasHalti: "כן" }; else return { wasHalti: "לא" };
        case 'דירוג לכמות המשיכות':
          return { pulls: String(pulls) };
        case 'דירוג כללי להליכה':
          return { rank: String(rank) };
        default: return -1;
      }
    });
    let includesObj;
    for (let index = 0; index < 6; index++) {
      includesObj = { ...includesObj, ...includesArray[index] };
    }
    const data = {
      description,
      createdAt: createdAt,
      duration: timeClock,
      ...includesObj
    };
    startAddWalk(userContext, data);
    setDescription('');
    props.navigation.pop(2);
  }

  const jsx = (
    <View style={styles.content}>
      <View style={styles.duration}>
        <Text style={styles.durationText}>הלכתם {MakeStringTime(timeClock)}</Text>
      </View>

      <View style={styles.itemsFrame}>
        <View style={{ ...styles.contentItem, justifyContent: 'center' }}>
          <Text style={styles.contentItemText}>כותרת: </Text>
          <TextInput
            onChangeText={(desc) => setDescription(desc)}
            value={description}
            style={{ ...styles.textInput, marginHorizontal: 20 }}
          />
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              setDescription('');
            }}>
            <MaterialIcons name="clear" color={Colors.buttonBorderDefault} size={20} />
          </TouchableOpacity>
        </View>

        <WalkFormInput title="ביזי מתוכננים"
          type="counter"
          stateSetter={setPlannedBizi}
          stateVal={plannedBizi}
          stateInit={0}
          includeItems={includeItems}
          setIncludeItems={setIncludeItems} />

        <WalkFormInput title="ביזי לא מתוכננים"
          type="counter"
          stateSetter={setUnPlannedBizi}
          stateVal={unPlannedBizi}
          stateInit={0}
          includeItems={includeItems}
          setIncludeItems={setIncludeItems} />

        <WalkFormInput title="הלכנו עם עוד גורים"
          type="boolean"
          stateSetter={setWasCompany}
          stateVal={wasCompany}
          stateInit={0}
          includeItems={includeItems}
          setIncludeItems={setIncludeItems} />

        <WalkFormInput title="הלכנו עם האלטי"
          type="boolean"
          stateSetter={setWasHalti}
          stateVal={wasHalti}
          stateInit={0}
          includeItems={includeItems}
          setIncludeItems={setIncludeItems} />

        <WalkFormInput title="דירוג לכמות המשיכות"
          type="scale"
          stateSetter={setPulls}
          stateVal={pulls}
          stateInit={0}
          includeItems={includeItems}
          setIncludeItems={setIncludeItems} />

        <WalkFormInput title="דירוג כללי להליכה"
          type="scale"
          stateSetter={setRank}
          stateVal={rank}
          stateInit={0}
          includeItems={includeItems}
          setIncludeItems={setIncludeItems} />
      </View>

      <View style={{ flexDirection: 'row-reverse', marginTop: 10 }}>
        <TouchableOpacity activeOpacity={0.9} onPress={() => {
          handleSave();
        }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>שמירה</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} onPress={() => {
          setDescription('');
          props.navigation.pop(2);
        }}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>ביטול</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
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
        <Header screenName="הוספת הליכה" navigation={props.navigation} />
        {jsx}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.screenBackground
  },
  content: {
    paddingTop: hp('3%'),
    alignItems: 'center',
  },
  itemsFrame: {
    borderWidth: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 15,
    borderColor: Colors.buttonDefault,
    borderRadius: 5
  },
  contentItem: {
    margin: 10,
    width: '80%',
    flexDirection: 'row-reverse',
    alignItems: 'center'
  },
  contentItemText: {
    fontSize: 15,
    fontFamily: 'Rubik-Regular',
  },
  duration: {
    marginVertical: hp('1.5%'),
  },
  durationText: {
    fontSize: 22,
    fontFamily: 'Rubik-Regular',
  },
  textInput: {
    minWidth: wp('45%'),
    height: hp('5.5%'),
    borderColor: Colors.header,
    borderBottomWidth: 1,
    paddingHorizontal: wp('2.5%'),
    fontFamily: 'Rubik-Regular',
    fontSize: 17,
  },
  button: {
    marginVertical: hp('1.5%'),
    marginHorizontal: wp('2.5%'),
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('1.2%'),
    minWidth: wp('33%'),
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: Colors.buttonDefault
  },
  buttonText: {
    fontSize: hp('4.5%'),
    fontFamily: 'Rubik-Regular',
    color: 'white'
  },
  adjuster: {
    flexDirection: 'row-reverse',
    borderColor: Colors.buttonBorderDefault,
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'space-around'
  },
  adjusterText: {
    fontSize: 17,
    fontFamily: 'Rubik-Regular',
    color: Colors.buttonBorderDefault
  }
});