import React from 'react';
import Swiper from 'react-native-swiper';
import { Font } from 'expo';

import Breathe from './components/Breathe';
import Journey from './components/Journey';

import { getStorageItem, setStorageItem } from './utils/storage';

import Muli from './assets/fonts/Muli/Muli-Regular.ttf';
import MuliItalic from './assets/fonts/Muli/Muli-Italic.ttf';
import OpenSans from './assets/fonts/Open_Sans/OpenSans-Regular.ttf';
import OpenSansBold from './assets/fonts/Open_Sans/OpenSans-Bold.ttf';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
      breathingTimes: {
        recent: 0,
        total: 0,
      },
    };

    this.resetRecentBreathingTime = this.resetRecentBreathingTime.bind(this);
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

    const breathingTimes = { ...this.state.breathingTimes };
    breathingTimes.recent = await getStorageItem('recentBreathingTime');
    breathingTimes.total = await getStorageItem('totalBreathingTime');
    this.setState({ breathingTimes });
  }

  async resetRecentBreathingTime() {
    const breathingTimes = { ...this.state.breathingTimes };
    breathingTimes.recent = 0;
    this.setState({ breathingTimes });
    await setStorageItem('recentBreathingTime', breathingTimes.recent);
  }

  async updateBreathingTime(newBreathingTime) {
    const breathingTimes = { ...this.state.breathingTimes };
    breathingTimes.recent += newBreathingTime;
    breathingTimes.total += newBreathingTime;
    this.setState({ breathingTimes });
    await setStorageItem('recentBreathingTime', breathingTimes.recent);
    await setStorageItem('totalBreathingTime', breathingTimes.total);
  }

  render() {
    const fontLoaded = this.state.fontLoaded;
    if (!fontLoaded) {
      return null;
    }
    return (
      <Swiper loop={false} showsPagination={false} index={0}>
        <Breathe
          updateBreathingTime={this.updateBreathingTime}
          resetRecentBreathingTime={this.resetRecentBreathingTime}
        />
        <Journey breathingTimes={this.state.breathingTimes} />
      </Swiper>
    );
  }
}
