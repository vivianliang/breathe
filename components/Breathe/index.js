import React from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View } from 'react-native';
import { LinearGradient } from 'expo';

import startImage from '../../assets/images/circlePlay.png';
import breathingImage from '../../assets/images/circleBreathing.png';
import Styles, { green1, gray2, gray4, lightKhaki, lightSage } from '../../styles/common';

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
//   <TouchableHighlight
//   underlayColor={'#e6e9ec'}
//   style={styles.container}
//   onPress={this.toggleIsBreathing}
// >
//   { this.renderImage() }
// </TouchableHighlight>
//

  render() {
    return (
      <LinearGradient
        colors={[lightKhaki, lightSage]}
        start={[0.1, 0.0]}
        end={[1.0, 0.9]}
        style={[Styles.bg, Styles.centerContents]}
      >
        <View style={[Styles.bigCircle, Styles.centerContents]}>
          <View style={[Styles.littleCircle, Styles.centerContents]}>
            <Text style={{fontFamily: 'muli-italic', color: gray2, fontSize: 24}}>breathe in</Text>
          </View>
        </View>
        <TouchableOpacity style={[{width: '65%', height: 65, backgroundColor: green1, borderRadius: 10}, Styles.centerContents]}>
          <Text style={{fontFamily: 'open-sans-bold', fontSize: 24, color: gray4}}>START</Text>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}
