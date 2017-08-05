import React from 'react';
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isBreathing: false,
    }
  }

  start() {
    this.setState({isBreathing: true})
  }

  stop() {
    this.setState({isBreathing: false})
  }

  render() {
    return (
      <View style={styles.container}>
        { !this.state.isBreathing &&
          <TouchableHighlight onPress={() => this.start()}>
            <Image source={require('./circle.png')} />
          </TouchableHighlight>
        }
        { this.state.isBreathing &&
          <TouchableHighlight onPress={() => this.stop()}>
            <Image source={require('./circle2.png')} />
          </TouchableHighlight>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
