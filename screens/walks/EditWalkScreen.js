import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../constants/colors';
import UserContext from '../../context/user-context';
import { startEditWalk } from '../../actions/walks';
import Header from "../../components/Header";
import MakeStringTime from '../../helpers/MakeStringTime';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import moment from 'moment';
import WalkFormInput from './components/WalkFormInput';

export default props => {
  const userContext = useContext(UserContext);
  const { id, createdAt, duration, description,
    plannedBizi, pulls, rank, unPlannedBizi, wasCompany, wasHalti } = props.route.params.walk;

    console.log(id);

    const [descriptionState, setDescription] = useState(description);
    const [plannedBiziState, setPlannedBizi] = useState(!!plannedBizi ? Number(plannedBizi) : 0);
    const [unPlannedBiziState, setUnPlannedBizi] = useState(!!unPlannedBizi ? Number(unPlannedBizi) : 0);
    const [wasCompanyState, setWasCompany] = useState(!!wasCompany ? (wasCompany === 'כן' ? 1 : -1) : 0);
    const [wasHaltiState, setWasHalti] = useState(!!wasHalti ? (wasHalti === 'כן' ? 1 : -1) : 0);
    const [pullsState, setPulls] = useState(!!pulls ? Number(pulls) : 0);
    const [rankState, setRank] = useState(!!rank ? Number(rank) : 0);
    const [includeItems, setIncludeItems] = useState([]);

    useEffect(() => {
      const tmp = []
      if (plannedBiziState) tmp.push('ביזי מתוכננים');
      if (unPlannedBiziState) tmp.push('ביזי לא מתוכננים');
      if (wasCompanyState) tmp.push('הלכנו עם עוד גורים');
      if (wasHaltiState) tmp.push('הלכנו עם האלטי');
      if (pullsState) tmp.push('דירוג לכמות המשיכות');
      if (rankState) tmp.push('דירוג כללי להליכה');
      setIncludeItems(tmp);
    },[])

    const handleSave = () => {
      const includesArray = includeItems.map(item => {
        switch (item) {
          case 'ביזי מתוכננים':
            return { plannedBizi: String(plannedBiziState) };
          case 'ביזי לא מתוכננים':
            return { unPlannedBizi: String(unPlannedBiziState) };
          case 'הלכנו עם עוד גורים':
            if (wasCompanyState !== -1) return { wasCompany: "כן" }; else return { wasCompany: "לא" };
          case 'הלכנו עם האלטי':
            if (wasHaltiState !== -1) return { wasHalti: "כן" }; else return { wasHalti: "לא" };
          case 'דירוג לכמות המשיכות':
            return { pullsState: String(pulls) };
          case 'דירוג כללי להליכה':
            return { rankState: String(rank) };
          default: return -1;
        }
      });
      let includesObj;
      for (let index = 0; index < 6; index++) {
        includesObj = { ...includesObj, ...includesArray[index] };
      }
      const data = {
        description : descriptionState,
        createdAt,
        duration,
        ...includesObj
      };
      startEditWalk(userContext, id, data);
      props.navigation.navigate('WalksCenter');
    }

    const jsx = (
      <View style={styles.content}>
        <View style={styles.duration}>
          <Text style={styles.durationText}>הלכתם {MakeStringTime(duration)}</Text>
        </View>

        <View style={styles.itemsFrame}>
          <View style={{ ...styles.contentItem, justifyContent: 'center' }}>
            <Text style={styles.contentItemText}>כותרת: </Text>
            <TextInput
              onChangeText={(desc) => setDescription(desc)}
              value={descriptionState}
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
            stateVal={plannedBiziState}
            stateInit={plannedBiziState || 0}
            includeItems={includeItems}
            setIncludeItems={setIncludeItems} />

          <WalkFormInput title="ביזי לא מתוכננים"
            type="counter"
            stateSetter={setUnPlannedBizi}
            stateVal={unPlannedBiziState}
            stateInit={unPlannedBiziState || 0}
            includeItems={includeItems}
            setIncludeItems={setIncludeItems} />

          <WalkFormInput title="הלכנו עם עוד גורים"
            type="boolean"
            stateSetter={setWasCompany}
            stateVal={wasCompanyState}
            stateInit={wasCompanyState || 0}
            includeItems={includeItems}
            setIncludeItems={setIncludeItems} />

          <WalkFormInput title="הלכנו עם האלטי"
            type="boolean"
            stateSetter={setWasHalti}
            stateVal={wasHaltiState}
            stateInit={wasHaltiState || 0}
            includeItems={includeItems}
            setIncludeItems={setIncludeItems} />

          <WalkFormInput title="דירוג לכמות המשיכות"
            type="scale"
            stateSetter={setPulls}
            stateVal={pullsState}
            stateInit={pullsState || 0}
            includeItems={includeItems}
            setIncludeItems={setIncludeItems} />

          <WalkFormInput title="דירוג כללי להליכה"
            type="scale"
            stateSetter={setRank}
            stateVal={rankState}
            stateInit={rankState || 0}
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
            props.navigation.navigate('WalksCenter');
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
          <Header screenName="עריכת הליכה" navigation={props.navigation} />
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