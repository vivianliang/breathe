import React from 'react';
import { shallow } from 'enzyme';
import Swiper from 'react-native-swiper';

import App from './App';
import Breathe from './components/Breathe';
import Journey from './components/Journey';
import { getStorageItem, setStorageItem } from './utils/storage';

describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toEqual(1);
  });

  it('renders navigation slides', () => {
    const wrapper = shallow(<App />);

    setTimeout(() => { // this is a fun hack...
      // initial slide should be index 0
      expect(wrapper.find(Swiper).prop('index')).toEqual(0);
      // there should be 2 slides
      expect(wrapper.find(Breathe).length).toEqual(1);
      expect(wrapper.find(Journey).length).toEqual(1);
    });
  });

  it('should get breathingTimes from storage at componentWillMount()', async () => {
    await setStorageItem('recentBreathingTime', 10);
    await setStorageItem('totalBreathingTime', 20);
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    setTimeout(() => {
      expect(instance.state.breathingTimes.recent).toEqual(10);
      expect(instance.state.breathingTimes.total).toEqual(20);
    });
  });

  it('should updateBreathingTime()', async () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    expect(instance.state.breathingTimes.recent).toEqual(0);
    expect(instance.state.breathingTimes.total).toEqual(0);
    instance.state.breathingTimes.total = 5;

    instance.updateBreathingTime(10);
    expect(instance.state.breathingTimes.recent).toEqual(10);
    expect(instance.state.breathingTimes.total).toEqual(15);

    expect(await getStorageItem('recentBreathingTime')).toEqual(10);
    expect(await getStorageItem('totalBreathingTime')).toEqual(15);
  });
});
