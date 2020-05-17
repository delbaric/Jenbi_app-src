import React from 'react';
import { Image } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Entypo, AntDesign } from '@expo/vector-icons';

export default ({ isActive, type }) => {
  switch (type) {
    case 'play-pause':
      if (isActive)
        return <AntDesign color="#ffb97e" name="pausecircleo" size={hp('5%')} />;
      else
        return <AntDesign color="#ffb97e" name="playcircleo" size={hp('5%')} />;
    case 'reset':
      return <Entypo color="#ffb97e" name="back-in-time" size={hp('5%')} />;
    case 'done-on':
      return <Image
        style={{ width: 85, height: 85 }}
        source={require('../../../../assets/endwalk.png')}
      />
    case 'done-off':
      return <Image
        style={{ opacity: 0.3, width: 65, height: 65 }}
        source={require('../../../../assets/endwalk.png')}
      />
    default:
      return null;
  }
}