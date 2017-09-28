import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';

import ActionButton from '../common/ActionButton';
import CircleButton from '../common/CircleButton';
import Styles, {
  green1,
  green3,
  green4,
  gray2,
  yellow1,
  white,
} from '../../styles/common';

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  bigCircle: {
    borderColor: green1,
    borderRadius: (windowWidth * 0.872) / 2,
    borderWidth: 1,
    height: windowWidth * 0.872,
    width: windowWidth * 0.872,
  },
  breatheText: {
    color: gray2,
    fontFamily: 'muli-bold-italic',
    fontSize: 24,
    position: 'absolute',
    top: (windowHeight * 0.5) - 12,
  },
  circleButtonBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '10%',
    width: windowWidth * 0.68,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  littleCircle: {
    backgroundColor: yellow1,
    borderRadius: (windowWidth * 0.6) / 2,
    opacity: 0.75,
    height: windowWidth * 0.6,
    width: windowWidth * 0.6,
  },
  pauseBar: {
    position: 'absolute',
    backgroundColor: white,
    height: 150,
    width: '100%',
    opacity: 0.5,
  },
  pauseText: {
    position: 'absolute',
    top: windowHeight * 0.14,
    color: gray2,
    fontFamily: 'muli',
    fontSize: 18,
  },
  staticImage: {
    width: '100%',
  },
});

export default class Breathe extends React.Component {
  constructor(props) {
    super(props);
    const widthAnimValue = new Animated.Value(1);
    const widthAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(widthAnimValue, {
          toValue: 0,
          delay: 4000,
          duration: 4000,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(widthAnimValue, {
          toValue: 1,
          delay: 4000,
          duration: 4000,
          easing: Easing.out(Easing.ease),
        }),
      ]),
    );

    let previousValue = 1;
    widthAnimValue.addListener(({ value }) => {
      let breatheStatusText = '';
      if (value === 1 || value === 0) {
        breatheStatusText = 'hold';
      } else if (value < previousValue) {
        breatheStatusText = 'breathe out';
      } else if (value > previousValue) {
        breatheStatusText = 'breathe in';
      }
      previousValue = value;
      this.setState({ breatheStatusText });
    });

    this.state = {
      breatheStatusText: 'get ready...',
      isStarted: false,
      isBreathing: false,
      timerStart: null,
      timerStop: null,
      widthAnimValue,
      widthAnim,
    };

    this.startBreathing = this.startBreathing.bind(this);
    this.stopBreathing = this.stopBreathing.bind(this);
    this.toggleIsBreathing = this.toggleIsBreathing.bind(this);
  }

  startBreathing() {
    this.props.resetRecentBreathingTime();
    this.setState({ isStarted: true });
    this.toggleIsBreathing();
  }

  stopBreathing() {
    // TODO: navigate to Journey
    this.setState({ isStarted: false });
  }

  toggleIsBreathing() {
    const { isBreathing, timerStart, timerStop, widthAnim, widthAnimValue } = this.state;
    widthAnimValue.resetAnimation();

    if (!isBreathing) {
      /* continue breathing */
      widthAnim.start();

      // start timer
      this.setState({ timerStart: Date.now() });
      this.interval = setInterval(() => {
        this.setState({ timerStop: Date.now() });
      }, 30); // execute every 30ms
    } else {
      /* pause breathing */
      // update recent cycle with elapsed seconds
      const elapsedSeconds = (timerStop - timerStart) / 1000;
      this.props.updateBreathingTime(elapsedSeconds);
      // clear timer
      clearInterval(this.interval);
      this.setState({ breatheStatusText: 'get ready...' });
    }

    this.setState({ isBreathing: !isBreathing });
  }

  renderImage() {
    const { widthAnimValue, isBreathing } = this.state;
    if (isBreathing) {
      return (<Animated.View
        style={[styles.littleCircle, Styles.centerContents,
          {
            width: widthAnimValue.interpolate({
              inputRange: [0, 1],
              outputRange: [windowWidth * 0.15, windowWidth * 0.84],
            }),
            height: widthAnimValue.interpolate({
              inputRange: [0, 1],
              outputRange: [windowWidth * 0.15, windowWidth * 0.84],
            }),
            borderRadius: widthAnimValue.interpolate({
              inputRange: [0, 1],
              outputRange: [(windowWidth * 0.15) / 2, (windowWidth * 0.84) / 2],
            }),
          },
        ]}
      />);
    }

    return <View style={[styles.littleCircle, Styles.centerContents]} />;
  }

  render() {
    const { breatheStatusText, isStarted, isBreathing } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <LinearGradient
        colors={[green4, green3]}
        start={[0.1, 0.0]}
        end={[1.0, 0.9]}
        style={[Styles.bg, Styles.centerContents]}
      >
        <View style={[Styles.centerContents]}>
          <View style={[styles.bigCircle, Styles.centerContents]}>
            { this.renderImage() }
          </View>
        </View>

        { !isStarted && !isBreathing &&
          // Circle Buttons
          <View style={[Styles.container, styles.circleButtonBarContainer]}>
            <CircleButton onPress={() => navigate('Journey')} />
            <CircleButton onPress={() => navigate('Journey')} />
            <CircleButton onPress={() => navigate('Journey')} />
          </View>
        }


        { isStarted &&
          // pause reminder text
          <Text style={styles.pauseText}>
          tap to { isBreathing ? 'pause' : 'unpause' }
          </Text>
        }

        { isStarted && !isBreathing &&
          // pause status background bar
          <View style={styles.pauseBar} />
        }

        { isStarted &&
          // status text
          <Text onPress={this.toggleIsBreathing} style={styles.breatheText}>
            {isBreathing ? breatheStatusText : 'paused'}
          </Text>
        }

        { isStarted &&
          // pause click area, not sure of a better way to do a full screen
          // click area yet
          <TouchableOpacity
            onPress={this.toggleIsBreathing}
            style={[Styles.bg, { position: 'absolute' }]}
          />
        }

        { !isBreathing &&
          // Start/Done Button
          <ActionButton
            onPress={isStarted ? this.stopBreathing : this.startBreathing}
            text={isStarted ? 'DONE' : 'START'}
          />
        }
      </LinearGradient>
    );
  }
}

Breathe.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
