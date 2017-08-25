import React from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

import Breathe from './components/Breathe';
import Journey from './components/Journey';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = function App() {
  return (
    <Swiper loop={false} showsPagination={false} index={0}>
      <View style={styles.view}>
        <Breathe />
      </View>
      <View>
        <Journey />
      </View>
    </Swiper>

  );
};

export default App;
