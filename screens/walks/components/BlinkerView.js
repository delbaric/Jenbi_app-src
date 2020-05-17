import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';

export default props => {
  const [blinker] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(100),
        Animated.timing(
            blinker,
            {
              toValue: 100,
              duration: 1200,
              useNativeDriver: true
            }
        ),
        Animated.timing(
          blinker,
            {
                toValue: 0,
                duration: 0,
                useNativeDriver: true
            }
        ),
    ]),
).start();
  }, []);

  return (
    <Animated.View style={{...props.style, opacity: blinker }}> 
      {props.children}
    </Animated.View>
  );
}