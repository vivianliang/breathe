import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import { green1, yellow1 } from '../../../styles/common';

const { width: windowWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  circle: {
    borderRadius: (windowWidth * 0.128) / 2,
    height: windowWidth * 0.128,
    width: windowWidth * 0.128,
    backgroundColor: yellow1,
  },
  label: {
    color: green1,
  },
});

const CircleButton = function CircleButton(props) {
  return (
    <View>
      <TouchableOpacity style={styles.circle} onPress={props.onPress}>
        <Image source={props.image} />
      </TouchableOpacity>
      <Text style={styles.label}>{props.label}</Text>
    </View>
  );
};

CircleButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  image: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default CircleButton;
