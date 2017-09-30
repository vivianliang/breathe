import React from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View } from 'react-native';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';

import { getStorageItem } from '../../utils/storage';
import { getRandomInt } from '../../utils/utils';
import ActionButton from '../common/ActionButton';
import Styles, { gray1, green3, green4 } from '../../styles/common';
import { tips } from './tips';

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

    this.state = {
      breathingTimes: {
        recent: 0,
        total: 0,
      },
    };

    this.getTotalBreaths = this.getTotalBreaths.bind(this);
    this.getTotalBreathingText = this.getTotalBreathingText.bind(this);
  }

  async componentWillMount() {
    const breathingTimes = { ...this.state.breathingTimes };
    breathingTimes.recent = await getStorageItem('recentBreathingTime');
    breathingTimes.total = await getStorageItem('totalBreathingTime');
    this.setState({ breathingTimes });
  }

  getTotalBreaths() {
    return Math.floor(this.state.breathingTimes.total / 16);
  }

  getTotalBreathingText() {
    const totalBreaths = this.getTotalBreaths();
    if (totalBreaths < 10) {
      return `${totalBreaths} ${pluralize('gallon', totalBreaths)} of milk`;
    }
    const numVolleyballs = Math.floor(totalBreaths / 10);
    return `${numVolleyballs} ${pluralize('volleyball', numVolleyballs)}`;
  }

  render() {
    const { goBack } = this.props.navigation;
    const recentBreaths = Math.floor(this.state.breathingTimes.recent);
    const totalBreaths = this.getTotalBreaths();
    return (
      <LinearGradient
        colors={[green4, green3]}
        start={[0.1, 0.0]}
        end={[1.0, 0.9]}
        style={[Styles.bg, Styles.centerContents]}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* recent cycle data */}
          { recentBreaths === 0 && totalBreaths === 0 &&
            <View style={styles.card}>
              <Text style={[styles.text, Styles.pushTop, Styles.pushBottom]}>
                You haven&apos;t taken any breaths yet!
              </Text>
            </View>
          }
          { recentBreaths > 0 &&
            <View style={styles.card}>
              <Text style={[styles.titleText, Styles.pushTop, Styles.pushBottomHalf]}>
                Congrats!
              </Text>
              <Text style={[styles.text, Styles.pushBottom]}>
                You focused on breathing for {recentBreaths} {pluralize('second', recentBreaths)}!
              </Text>
            </View>
          }

          {/* total cycle data */}
          { totalBreaths > 0 &&
            <View style={styles.card}>
              <Text style={[styles.text, Styles.pushTop, Styles.pushBottomHalf]}>
                You have taken a total of {totalBreaths} {pluralize('breath', totalBreaths)}.
              </Text>
              <Text style={[styles.largeText, Styles.pushBottom]}>
                {this.getTotalBreathingText()}
              </Text>
            </View>
          }

          {/* tips */}
          <View style={[styles.card, styles.tipCard]}>
            <Text style={[styles.text, Styles.pushTop]}>
              {tips[getRandomInt(0, tips.length)]}
            </Text>
          </View>

          {/* back home button */}
          <ActionButton onPress={() => goBack()} text="BACK HOME" />
        </ScrollView>
      </LinearGradient>
    );
  }
}

Journey.propTypes = {
  navigation: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
