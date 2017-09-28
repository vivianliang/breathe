import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Font } from 'expo';

import Breathe from './components/Breathe';
import Journey from './components/Journey';

import Muli from './assets/fonts/Muli/Muli-Regular.ttf';
import MuliItalic from './assets/fonts/Muli/Muli-Italic.ttf';
import MuliBoldItalic from './assets/fonts/Muli/Muli-BoldItalic.ttf';
import OpenSans from './assets/fonts/Open_Sans/OpenSans-Regular.ttf';
import OpenSansBold from './assets/fonts/Open_Sans/OpenSans-Bold.ttf';

const AppNavigator = StackNavigator({
  Breathe: { screen: Breathe },
  Journey: { screen: Journey },
}, {
  headerMode: 'none',
  cardStyle: {backgroundColor: 'transparent'},
});

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fontLoaded: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      muli: Muli,
      'muli-italic': MuliItalic,
      'muli-bold-italic': MuliBoldItalic,
      'open-sans': OpenSans,
      'open-sans-bold': OpenSansBold,
    });

    this.setState({ fontLoaded: true });
  }

  render() {
    const fontLoaded = this.state.fontLoaded;
    if (!fontLoaded) {
      return null;
    }
    return (
      <AppNavigator />
    );
  }
}
