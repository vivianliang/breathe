import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

import Styles, { green1, gray4 } from '../../../styles/common';

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: green1,
    borderRadius: 10,
    height: 65,
    position: 'absolute',
    top: '80%',
    width: '65%',
  },
  actionButtonText: {
    color: gray4,
    fontFamily: 'open-sans-bold',
    fontSize: 24,
  },
});

const ActionButton = function ActionButton(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.actionButton, Styles.centerContents]}
    >
      <Text style={styles.actionButtonText}>{props.text}</Text>
    </TouchableOpacity>
  );
};

ActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default ActionButton;
