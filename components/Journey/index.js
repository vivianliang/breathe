import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View } from 'react-native';
import PropTypes from 'prop-types';

import { gray1, green3 } from '../../styles/common';

const { width: windowWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: green3,
    alignItems: 'center',
  },
  card: {
    height: windowWidth * 0.5,
    width: windowWidth * 0.9,
    alignItems: 'center',
    borderColor: gray1,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 32,
    lineHeight: 40,
    color: gray1,
  },
  text: {
    fontSize: 18,
    lineHeight: 32,
    color: gray1,
  },
  largeText: {
    color: gray1,
    fontSize: 40,
  },
});

export default class Journey extends React.PureComponent {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* recent cycle data */}
        <View style={styles.card}>
          <Text style={styles.titleText}>
            Congrats!
          </Text>
          <Text style={styles.text}>
            You focused on breathing for {this.props.breathingTimes.recent} seconds!
          </Text>
        </View>

        {/* total cycle data */}
        <View style={styles.card}>
          <Text style={styles.text}>
            You have breathed a total of {this.props.breathingTimes.total} seconds.
          </Text>
          <Text style={styles.largeText}>
            1.1k = 1 house
          </Text>
        </View>

        {/* tips */}
        <View style={styles.card}>
          <Text style={styles.text}>
            Tip: Practice mindful breathing to connect your mind to your body.
          </Text>
        </View>
      </ScrollView>
    );
  }
}

Journey.propTypes = {
  breathingTimes: PropTypes.shape({
    recent: PropTypes.number,
    total: PropTypes.number,
  }),
};

Journey.defaultProps = {
  breathingTimes: {
    recent: 0,
    total: 0,
  },
};
