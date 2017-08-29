import React from 'react';
import Swiper from 'react-native-swiper';
import { Font } from 'expo';

import Breathe from './components/Breathe';
import Journey from './components/Journey';

import Muli from './assets/fonts/Muli/Muli-Regular.ttf';
import MuliItalic from './assets/fonts/Muli/Muli-Italic.ttf';
import OpenSans from './assets/fonts/Open_Sans/OpenSans-Regular.ttf';
import OpenSansBold from './assets/fonts/Open_Sans/OpenSans-Bold.ttf';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      sessionBreathingTime: 0,
    };

    this.updateBreathingTime = this.updateBreathingTime.bind(this);
  }

  async componentWillMount() {
    await Font.loadAsync({
      muli: Muli,
      'muli-italic': MuliItalic,
      'open-sans': OpenSans,
      'open-sans-bold': OpenSansBold,
    });

    this.setState({ fontLoaded: true });
  }

  updateBreathingTime(newBreathingTime) {
    this.setState({ sessionBreathingTime: this.state.sessionBreathingTime + newBreathingTime });
  }

  render() {
    const fontLoaded = this.state.fontLoaded;
    if (!fontLoaded) {
      return null;
    }
    return (
      <Swiper loop={false} showsPagination={false} index={0}>
        <Breathe updateBreathingTime={this.updateBreathingTime} />
        <Journey sessionBreathingTime={this.state.sessionBreathingTime} />
      </Swiper>
    );
  }
}
