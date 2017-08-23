import { StackNavigator } from 'react-navigation';

import Breathe from './components/Breathe';
import Journey from './components/Journey';

const App = StackNavigator({
  Home: { screen: Breathe },
  Journey: { screen: Journey },
});

export default App;
