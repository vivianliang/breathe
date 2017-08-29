import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#E8F5CB',
    borderColor: 'white',
    borderWidth: 0.5,
    height: 150,
    justifyContent: 'center',
  },
  text: {
    fontSize: 10,
  },
});

const JourneyItem = function JourneyItem({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

JourneyItem.propTypes = {
  text: PropTypes.string,
};

JourneyItem.defaultProps = {
  text: '',
};

export default JourneyItem;
