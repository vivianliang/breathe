import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View } from 'react-native';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import Styles, { gray1, green3, green4 } from '../../styles/common';

const { width: windowWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    width: windowWidth * 0.872,
    alignItems: 'flex-start',
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
    alignSelf: 'center',
  },
  tipCard: {
    borderBottomWidth: 0,
  },
});

export default class Journey extends React.Component {
  constructor(props) {
    super(props);

    this.getTotalBreaths = this.getTotalBreaths.bind(this);
    this.getTotalBreathingText = this.getTotalBreathingText.bind(this);
  }

  getTotalBreaths() {
    // note: this returns a string
    return (this.props.breathingTimes.total / 16).toFixed(1);
  }

  getTotalBreathingText() {
    const totalBreaths = this.getTotalBreaths();
    if (totalBreaths < 10) {
      return `${totalBreaths} ${pluralize('gallon', totalBreaths)} of milk`;
    }
    const numVolleyballs = (totalBreaths / 10).toFixed(1);
    return `${numVolleyballs} ${pluralize('volleyballs', numVolleyballs)}`;
  }

  render() {
    return (
      <LinearGradient
        colors={[green4, green3]}
        start={[0.1, 0.0]}
        end={[1.0, 0.9]}
        style={[Styles.bg, Styles.centerContents]}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* recent cycle data */}
          { this.props.breathingTimes.recent === 0 && this.getTotalBreaths() === 0 &&
            <View style={styles.card}>
              <Text style={[styles.text, Styles.pushTop, Styles.pushBottom]}>
                You haven&apos;t taken any breaths yet!
              </Text>
            </View>
          }
          { this.props.breathingTimes.recent > 0 &&
            <View style={styles.card}>
              <Text style={[styles.titleText, Styles.pushTop, Styles.pushBottomHalf]}>
                Congrats!
              </Text>
              <Text style={[styles.text, Styles.pushBottom]}>
                You focused on breathing for {this.props.breathingTimes.recent.toFixed(1)} {pluralize('second', this.props.breathingTimes.recent)}!
              </Text>
            </View>
          }

          {/* total cycle data */}
          { this.getTotalBreaths() > 0 &&
            <View style={styles.card}>
              <Text style={[styles.text, Styles.pushTop, Styles.pushBottomHalf]}>
                You have taken a total of {this.getTotalBreaths()} breaths.
              </Text>
              <Text style={[styles.largeText, Styles.pushBottom]}>
                {this.getTotalBreathingText()}
              </Text>
            </View>
          }

          {/* tips */}
          <View style={[styles.card, styles.tipCard]}>
            <Text style={[styles.text, Styles.pushTop]}>
              Tip: Practice mindful breathing to connect your mind to your body.
            </Text>
          </View>

          {/* back home button */}
          <TouchableOpacity style={[Styles.actionButton, Styles.centerContents]}>
            <Text style={Styles.actionButtonText}>BACK HOME</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
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
