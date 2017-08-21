import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'powderblue',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 0.5,
  },
  text: {
    fontSize: 10,
  },
});

export default class JourneyItem extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>i still love you</Text>
      </View>
    );
  }
}

