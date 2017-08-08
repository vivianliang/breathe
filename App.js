import React from 'react';
import { Image, StyleSheet, TouchableHighlight } from 'react-native';

import startImage from './circle.png';
import breathingImage from './circle2.png';

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBreathing: false,
    };

    this.toggleIsBreathing = this.toggleIsBreathing.bind(this);
  }

  toggleIsBreathing() {
    this.setState({ isBreathing: !this.state.isBreathing });
  }

  render() {
    const circleImage = this.state.isBreathing ? breathingImage : startImage;
    return (
      <TouchableHighlight style={styles.image} onPress={this.toggleIsBreathing}>
        <Image source={circleImage} />
      </TouchableHighlight>
    );
  }
}
