import React from 'react';
import { shallow } from 'enzyme';

import Breathe from './index';
import { getStorageItem, setStorageItem } from '../../utils/storage';

const getComponent = () => {
  const navigation = { navigate: jest.fn() };
  const wrapper = shallow(<Breathe navigation={navigation} />);
  return { wrapper, instance: wrapper.instance() };
};

describe('<Breathe />', () => {
  it('should render', () => {
    const { wrapper } = getComponent();
    expect(wrapper.length).toEqual(1);
  });

  it('should have a default state', () => {
    const { instance } = getComponent();
    const {
      breatheStatusText,
      isStarted,
      isBreathing,
      breathingTimes,
      timerStart,
      timerStop,
      widthAnimValue,
      widthAnim } = instance.state;

    expect(breatheStatusText).toEqual('get ready...');
    expect(isStarted).toEqual(false);
    expect(isBreathing).toEqual(false);
    expect(timerStart).toEqual(null);
    expect(timerStop).toEqual(null);
    expect(breathingTimes.recent).toEqual(0);
    expect(breathingTimes.total).toEqual(0);
    expect(widthAnimValue).toBeDefined();
    expect(widthAnim).toHaveProperty('start');
  });

  it('should update the breatheStatusText on animation change', () => {
    const { instance } = getComponent();
    const { widthAnimValue } = instance.state;
    expect(instance.state.breatheStatusText).toEqual('get ready...');

    widthAnimValue.setValue(1);
    expect(instance.state.breatheStatusText).toEqual('hold');

    widthAnimValue.setValue(0.5);
    expect(instance.state.breatheStatusText).toEqual('breathe out');

    widthAnimValue.setValue(0);
    expect(instance.state.breatheStatusText).toEqual('hold');

    widthAnimValue.setValue(0.5);
    expect(instance.state.breatheStatusText).toEqual('breathe in');
  });


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

  it('should startBreathing', () => {
    const { instance } = getComponent();
    instance.toggleIsBreathing = jest.fn();
    instance.resetRecentBreathingTime = jest.fn();

    instance.startBreathing();
    expect(instance.resetRecentBreathingTime).toHaveBeenCalled();
    expect(instance.state.isStarted).toBe(true);
    expect(instance.toggleIsBreathing).toHaveBeenCalled();
  });

  it('should stopBreathing', () => {
    const { instance } = getComponent();
    instance.stopBreathing();
    expect(instance.state.isStarted).toBe(false);
    expect(instance.props.navigation.navigate).toHaveBeenCalledWith('Journey');
  });

  it('should toggleIsBreathing', () => {
    const { instance } = getComponent();

    const { widthAnim, widthAnimValue } = instance.state;
    widthAnimValue.resetAnimation = jest.fn();
    widthAnim.start = jest.fn();

    instance.updateBreathingTime = jest.fn();

    const now = new Date('2017-01-01 00:00:00');
    const later = new Date('2017-01-01 00:00:10'); // 10 seconds later
    Date.now = jest.fn().mockReturnValueOnce(now);

    instance.toggleIsBreathing();
    expect(widthAnimValue.resetAnimation.mock.calls.length).toBe(1);
    expect(widthAnim.start).toHaveBeenCalled();
    expect(instance.state.isBreathing).toEqual(true);
    expect(instance.updateBreathingTime).not.toHaveBeenCalled();
    expect(instance.state.timerStart).toEqual(now);
    expect(instance.interval).toBeDefined();

    instance.setState({ timerStop: later });

    instance.toggleIsBreathing();
    expect(widthAnimValue.resetAnimation.mock.calls.length).toBe(2);
    expect(widthAnim.start.mock.calls.length).toBe(1);
    expect(instance.state.isBreathing).toEqual(false);
    expect(instance.updateBreathingTime).toHaveBeenCalledWith(10);
  });

  it('should render text inside circle', () => {
    const { wrapper, instance } = getComponent();

    instance.setState({ isStarted: false });
    expect(wrapper.find('Text').length).toEqual(0);

    instance.setState({ isStarted: true });
    instance.setState({ isBreathing: true });
    expect(wrapper.find('Text').at(1).props().children).toEqual('get ready...');

    instance.setState({ isBreathing: false });
    expect(wrapper.find('Text').at(1).props().children).toEqual('paused');
  });

  it('should render circle buttons', () => {
    const { wrapper, instance } = getComponent();

    instance.setState({ isStarted: false });
    instance.setState({ isBreathing: false });
    expect(wrapper.find('CircleButton').length).toEqual(3);

    instance.setState({ isStarted: true });
    expect(wrapper.find('CircleButton').length).toEqual(0);

    instance.setState({ isStarted: false });
    instance.setState({ isBreathing: true });
    expect(wrapper.find('CircleButton').length).toEqual(0);
  });

  it('should render start and stop buttons', () => {
    const { wrapper, instance } = getComponent();

    instance.setState({ isBreathing: true });
    expect(wrapper.find('ActionButton').length).toBe(0);

    instance.setState({ isStarted: false });
    instance.setState({ isBreathing: false });
    expect(wrapper.find('ActionButton').length).toBe(1);
    expect(wrapper.find('ActionButton').props().onPress).toEqual(instance.startBreathing);
    expect(wrapper.find('ActionButton').props().text).toBe('START');

    instance.setState({ isStarted: true });
    expect(wrapper.find('ActionButton').props().onPress).toEqual(instance.stopBreathing);
    expect(wrapper.find('ActionButton').props().text).toBe('DONE');
  });
});
