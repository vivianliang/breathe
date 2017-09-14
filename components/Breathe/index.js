import React from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo';
import PropTypes from 'prop-types';

import CircleButton from '../common/CircleButton';
import startImage from '../../assets/images/circlePlay.png';
import breathingImage from '../../assets/images/circleBreathing.png';
import Styles, {
  green1,
  green3,
  green4,
  gray2,
  gray4,
  yellow1,
} from '../../styles/common';

const { width: windowWidth } = Dimensions.get('window');

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
    fontFamily: 'muli-italic',
    fontSize: 24,
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
  startButton: {
    backgroundColor: green1,
    borderRadius: 10,
    height: 65,
    position: 'absolute',
    top: '80%',
    width: '65%',
  },
  startButtonText: {
    color: gray4,
    fontFamily: 'open-sans-bold',
    fontSize: 24,
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
          delay: 500,
          duration: 4000,
          easing: Easing.linear,
        }),
        Animated.timing(widthAnimValue, {
          toValue: 1,
          delay: 500,
          duration: 4000,
          easing: Easing.linear,
        }),
      ]),
    );
    this.state = {
      isBreathing: false,
      widthAnimValue,
      widthAnim,
    };

    this.toggleIsBreathing = this.toggleIsBreathing.bind(this);
  }

  toggleIsBreathing() {
    const { isBreathing, widthAnim, widthAnimValue } = this.state;
    widthAnimValue.resetAnimation();

    if (!isBreathing) {
      widthAnim.start();
      // TODO: start timer
    } else {
      // TODO: stop timer (also start timer if we leave this page)
      this.props.updateBreathingTime(10);
    }

    this.setState({ isBreathing: !isBreathing });
  }

  renderImage() {
    const { widthAnimValue, isBreathing } = this.state;
    if (isBreathing) {
      return (<Animated.Image
        style={{
          width: widthAnimValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['75%', '100%'],
          }),
          height: widthAnimValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['75%', '100%'],
          }),
          marginTop: widthAnimValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['25%', '0%'],
          }),
          marginLeft: widthAnimValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['12.5%', '0%'],
          }),
          marginRight: widthAnimValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['12.5%', '0%'],
          }),
        }}
        resizeMode={Image.resizeMode.contain}
        source={breathingImage}
      />);
    }

    return (<Image
      style={styles.staticImage}
      resizeMode={Image.resizeMode.contain}
      source={startImage}
    />);
  }

  render() {
    const { isBreathing } = this.state;
    return (
      <LinearGradient
        colors={[green4, green3]}
        start={[0.1, 0.0]}
        end={[1.0, 0.9]}
        style={[Styles.bg, Styles.centerContents]}
      >
        <View style={[Styles.centerContents]}>
          <View style={[styles.bigCircle, Styles.centerContents]}>
            <View style={[styles.littleCircle, Styles.centerContents]}>
              { isBreathing &&
                <Text onPress={this.toggleIsBreathing} style={styles.breatheText}>breathe in</Text>
              }
            </View>
          </View>
        </View>
        { !isBreathing &&
          // Circle Buttons
          <View style={[Styles.container, styles.circleButtonBarContainer]}>
            <CircleButton onPress={() => null} />
            <CircleButton onPress={() => null} />
            <CircleButton onPress={() => null} />
          </View>
        }

        { !isBreathing &&
          // Start Button
          <TouchableOpacity
            onPress={this.toggleIsBreathing}
            style={[styles.startButton, Styles.centerContents]}
          >
            <Text style={styles.startButtonText}>START</Text>
          </TouchableOpacity>
        }
      </LinearGradient>
    );
  }
}

Breathe.propTypes = {
  updateBreathingTime: PropTypes.func.isRequired,
};
