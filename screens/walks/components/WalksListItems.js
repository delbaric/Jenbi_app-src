import React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Colors from '../../../constants/colors';
import WalkListItem from './WalkListItem';

export default props => {

  const walks = props.walks;

  let [fontsLoaded] = useFonts({
    'Rubik-Regular': require('../../../../assets/fonts/Rubik-Regular.ttf'),
    'Rubik-Bold': require('../../../../assets/fonts/Rubik-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <View style={styles.screen}>
        <View style={styles.container}>

          <View style={{backgroundColor: Colors.screenBackground}}>
            <FlatList
              data={walks.sort((a, b) => b.createdAt - a.createdAt)}
              keyExtractor={item => item.id}
              renderItem={itemData => (
                <WalkListItem
                  walk={itemData.item} navigation={props.navigation}
                />
              )}
            />
          </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 4,
    paddingHorizontal: '2%',
    paddingBottom: '2%',
    borderRadius: 5,
     borderWidth: 0.75,
      borderColor: Colors.buttonBorderDefault,
    backgroundColor: Colors.screenBackground
  },
  walksContainer: {
    width: '90%',
    padding: 5,
    marginBottom: 10,
  },
  button: {
    padding: '3%',
    marginVertical: '3%',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 1,
    backgroundColor: Colors.buttonDefault,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Rubik-Regular',
    color: 'white'
  }
});