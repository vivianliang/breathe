import React from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableHighlight } from 'react-native';

import startImage from '../../assets/images/circlePlay.png';
import breathingImage from '../../assets/images/circleBreathing.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: '#e6e9ec',
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
    return (
      <TouchableHighlight
        underlayColor={'#e6e9ec'}
        style={styles.container}
        onPress={this.toggleIsBreathing}
      >
        { this.renderImage() }
      </TouchableHighlight>
    );
  }
}
