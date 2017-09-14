import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import { yellow1 } from '../../../styles/common';

const { width: windowWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  circle: {
    borderRadius: (windowWidth * 0.128) / 2,
    height: windowWidth * 0.128,
    width: windowWidth * 0.128,
    backgroundColor: yellow1,
  },
});

const CircleButton = function CircleButton(props) {
  return <TouchableOpacity style={styles.circle} onPress={props.onPress} />;
};

CircleButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

export default CircleButton;
