import React from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleSheet,
  TouchableHighlight } from 'react-native';

import startImage from './circle.png';
import breathingImage from './circle2.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      widthAnim: new Animated.Value(1),
      isBreathing: false,
    };

    this.toggleIsBreathing = this.toggleIsBreathing.bind(this);
  }

  componentDidMount() {
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.state.widthAnim, {
          toValue: 0,
          delay: 500,
          duration: 4000,
          easing: Easing.linear,
        }),
        Animated.timing(this.state.widthAnim, {
          toValue: 1,
          delay: 500,
          duration: 4000,
          easing: Easing.linear,
        }),
      ]),
    ).start();
  }

  toggleIsBreathing() {
    const { isBreathing } = this.state;
    this.setState({ isBreathing: !isBreathing });
  }

  render() {
    const { widthAnim, isBreathing } = this.state;
    const circleImage = isBreathing ? breathingImage : startImage;
    return (
      <TouchableHighlight
        underlayColor={'white'}
        style={styles.container}
        onPress={this.toggleIsBreathing}
      >
        <Animated.Image
          style={{
            width: widthAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['75%', '100%'],
            }),
          }}
          resizeMode={Image.resizeMode.center}
          source={circleImage}
        />
      </TouchableHighlight>
    );
  }
}
