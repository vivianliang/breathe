import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import { LinearGradient } from 'expo';

import Breathe from './components/Breathe';
import Journey from './components/Journey';
import Styles, { lightKhaki, lightSage } from './styles/common';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
//           <Breathe />

const App = function App() {
  return (
    <Swiper loop={false} showsPagination={false} index={0}>
      <View style={[Styles.container, Styles.centerContents]}>
        <LinearGradient
          colors={[lightKhaki, lightSage]}
          start={[0.1, 0.0]}
          end={[1.0, 0.9]}
          style={[{ width: '100%', height: '100%' }, styles.view]}
        >
          <View style={[Styles.bigCircle, Styles.centerContents]}>
            <View style={[Styles.littleCircle, Styles.centerContents]}>
              <Text>Breathe in</Text>
            </View>
          </View>
        </LinearGradient>
      </View>
      <View>
        <Journey />
      </View>
    </Swiper>
  );
};

export default App;
