import React from 'react';
import { Image, StyleSheet, TouchableHighlight, View } from 'react-native';

const circle = require('./circle.png');
const circle2 = require('./circle2.png');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBreathing: false,
    };
  }

  start() {
    this.setState({ isBreathing: true });
  }

  stop() {
    this.setState({ isBreathing: false });
  }

  render() {
    return (
      <View style={styles.container}>
        { !this.state.isBreathing &&
          <TouchableHighlight onPress={() => this.start()}>
            <Image source={circle} />
          </TouchableHighlight>
        }
        { this.state.isBreathing &&
          <TouchableHighlight onPress={() => this.stop()}>
            <Image source={circle2} />
          </TouchableHighlight>
        }
      </View>
    );
  }
}
