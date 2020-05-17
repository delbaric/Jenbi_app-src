import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons, Entypo, MaterialCommunityIcons, MaterialIcons, AntDesign, Foundation, Feather } from '@expo/vector-icons';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Colors from '../constants/colors';
import UserContext from '../context/user-context';
import HomeScreen from '../screens/home/HomeScreen';
import TipsCenter from './TipsRouter';
import WalksRouter from './WalksRouter';
import TreatsRouter from './TreatsRouter';
import ProfileRouter from './ProfileRouter';
import TrainsScreen from '../screens/TrainsScreen';
import SosScreen from '../screens/sos/SosScreen';
import LogoutScreen from '../screens/LogoutScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View>
        <DrawerItem
          label={() => <Text style={styles.usernameText}>{props.username}</Text>}
          focused='false'
          style={styles.username}
        />
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

export default () => {
  const { userState } = useContext(UserContext);

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} username={!!userState.profile.name ? userState.profile.name : userState.profile.facebook.facebookName} />}
        initialRouteName="HomeScreen"
        drawerPosition="right"
        drawerStyle={{ width: wp('60%'), backgroundColor: '#ffead9'}}
      >

        <Drawer.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            drawerLabel: (() =>
              <View style={styles.labelContainer}>
                <View style={styles.labelLeft}>
                  <Text style={styles.labelText}>בית</Text>
                </View>
                <View style={styles.labelRight}>
                  <Entypo name="home" size={hp('3.1%')} />
                </View>
              </View>
            )
          }}
        />
        <Drawer.Screen
          name="ProfileRouter"
          component={ProfileRouter}
          options={{
            drawerLabel: (() =>
              <View style={styles.labelContainer}>
                <View style={styles.labelLeft}>
                  <Text style={styles.labelText}>פרופיל</Text>
                </View>
                <View style={styles.labelRight}>
                  <MaterialIcons name="person" size={hp('3.1%')} />
                </View>
              </View>
            )
          }}
        />
        <Drawer.Screen
          name="TipsCenter"
          component={TipsCenter}
          options={{
            drawerLabel: (() =>
              <View style={styles.labelContainer}>
                <View style={styles.labelLeft}>
                  <Text style={styles.labelText}>טיפים</Text>
                </View>
                <View style={styles.labelRight}>
                  <MaterialCommunityIcons name="comment-multiple" size={hp('3.1%')} />
                </View>
              </View>
            )
          }}
        />
        <Drawer.Screen
          name="WalksCenter"
          component={WalksRouter}
          options={{
            drawerLabel: (() =>
              <View style={styles.labelContainer}>
                <View style={styles.labelLeft}>
                  <Text style={styles.labelText}>הליכות</Text>
                </View>
                <View style={styles.labelRight}>
                  <Foundation name="guide-dog" size={hp('3.4%')} />
                </View>
              </View>
            )
          }}
        />

        <Drawer.Screen
          name="TreatsScreen"
          component={TreatsRouter}
          options={{
            drawerLabel: (() =>
              <View style={styles.labelContainer}>
                <View style={styles.labelLeft}>
                  <Text style={styles.labelText}>טיפולים</Text>
                </View>
                <View style={styles.labelRight}>
                  <AntDesign name="heart" size={hp('3.1%')} />
                </View>
              </View>
            )
          }}
        />
        <Drawer.Screen
          name="TrainsScreen"
          component={TrainsScreen}
          options={{
            drawerLabel: (() =>
              <View style={styles.labelContainer}>
                <View style={styles.labelLeft}>
                  <Text style={styles.labelText}>אילוף</Text>
                </View>
                <View style={styles.labelRight}>
                  <MaterialCommunityIcons name="whistle" size={hp('3.1%')} />
                </View>
              </View>
            )
          }}
        />
        <Drawer.Screen
          name="SosScreen"
          component={SosScreen}
          options={{
            drawerLabel: (() =>
              <View style={styles.labelContainer}>
                <View style={styles.labelLeft}>
                  <Text style={styles.labelText}>חירום</Text>
                </View>
                <View style={styles.labelRight}>
                  <MaterialIcons name="phone-in-talk" size={hp('3.1%')} />
                </View>
              </View>
            )
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={LogoutScreen}
          options={{
            drawerLabel: (() =>
              <View style={styles.labelContainer}>
                <View style={styles.labelLeft}>
                  <Text style={styles.labelText}>התנתקות</Text>
                </View>
                <View style={styles.labelRight}>
                  <Ionicons name="ios-exit" size={hp('3.1%')} />
                </View>
              </View>
            )
          }}
        />
      </Drawer.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelLeft: {
    width: '70%',
  },
  labelRight: {
    alignItems: 'flex-end',
    width: '35%'
  },
  labelText: {
    fontFamily: 'Rubik-Regular',
    fontSize: hp('2.3%'),
  },
  username: {
    opacity: 1,
    backgroundColor: Colors.header,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('70%'),
    height: hp('9.15%'),
    marginTop: hp('-0.7%'),
    marginHorizontal: wp('-1.8%')
  },
  usernameText: {
    fontFamily: 'Rubik-Regular',
    color: 'white'
  },
  seperator: {
    backgroundColor: 'white',
  }
});
