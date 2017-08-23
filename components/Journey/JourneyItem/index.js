import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'powderblue',
    borderColor: 'white',
    borderWidth: 0.5,
    height: 150,
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
  },
});

const JourneyItem = function JourneyItem() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>i still love you</Text>
    </View>
  );
};

export default JourneyItem;
