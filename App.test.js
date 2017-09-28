import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

// import Breathe from './components/Breathe';
// import Journey from './components/Journey';
import { getStorageItem, setStorageItem } from './utils/storage';

const getComponent = () => {
  const wrapper = shallow(<App />);
  return { wrapper, instance: wrapper.instance() };
};

describe('App', () => {
  it('renders without crashing', () => {
    const { wrapper } = getComponent();
    expect(wrapper.length).toEqual(1);
  });

  // it('renders navigation slides', () => {
  //   const { wrapper } = getComponent();

  //   setTimeout(() => { // this is a fun hack...
  //     // initial slide should be index 0
  //     expect(wrapper.find(Swiper).prop('index')).toEqual(0);
  //     // there should be 2 slides
  //     expect(wrapper.find(Breathe).length).toEqual(1);
  //     expect(wrapper.find(Journey).length).toEqual(1);
  //   });
  // });

  it('should get breathingTimes from storage at componentWillMount()', async () => {
    await setStorageItem('recentBreathingTime', 10);
    await setStorageItem('totalBreathingTime', 20);
    const { instance } = getComponent();
    setTimeout(() => {
      expect(instance.state.breathingTimes.recent).toEqual(10);
      expect(instance.state.breathingTimes.total).toEqual(20);
    });
  });

  it('should resetRecentBreathingTime()', async () => {
    await setStorageItem('recentBreathingTime', 10);
    const { instance } = getComponent();
    instance.state.breathingTimes.recent = 10;

    instance.resetRecentBreathingTime();
    expect(instance.state.breathingTimes.recent).toEqual(0);
    expect(await getStorageItem('recentBreathingTime')).toEqual(0);
  });

  it('should updateBreathingTime()', async () => {
    const { instance } = getComponent();

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
