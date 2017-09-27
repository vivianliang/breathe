import React from 'react';
import { shallow } from 'enzyme';

import Breathe from './index';

const getComponent = () => {
  const wrapper = shallow(
    <Breathe updateBreathingTime={jest.fn()} resetRecentBreathingTime={jest.fn()} />,
  );
  return { wrapper, instance: wrapper.instance() };
};

describe('<Breathe />', () => {
  it('should render', () => {
    const { wrapper } = getComponent();
    expect(wrapper.length).toEqual(1);
  });

  it('should have a default state', () => {
    const { instance } = getComponent();
    const { isStarted, isBreathing, widthAnim, widthAnimValue } = instance.state;
    expect(isStarted).toEqual(false);
    expect(isBreathing).toEqual(false);
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

  it('should startBreathing', () => {
    const mockReset = jest.fn();
    const wrapper = shallow(
      <Breathe updateBreathingTime={jest.fn()} resetRecentBreathingTime={mockReset} />,
    );
    const instance = wrapper.instance();
    instance.toggleIsBreathing = jest.fn();

    instance.startBreathing();
    expect(mockReset).toHaveBeenCalled();
    expect(instance.state.isStarted).toBe(true);
    expect(instance.toggleIsBreathing).toHaveBeenCalled();
  });

  it('should stopBreathing', () => {
    const { instance } = getComponent();
    instance.stopBreathing();
    expect(instance.state.isStarted).toBe(false);
  });

  it('should toggleIsBreathing', () => {
    const mockUpdate = jest.fn();
    const wrapper = shallow(
      <Breathe updateBreathingTime={mockUpdate} resetRecentBreathingTime={jest.fn()} />,
    );
    const instance = wrapper.instance();

    const { widthAnim, widthAnimValue } = instance.state;
    widthAnimValue.resetAnimation = jest.fn();
    widthAnim.start = jest.fn();

    const now = new Date('2017-01-01 00:00:00');
    const later = new Date('2017-01-01 00:00:10'); // 10 seconds later
    Date.now = jest.fn().mockReturnValueOnce(now);

    instance.toggleIsBreathing();
    expect(widthAnimValue.resetAnimation.mock.calls.length).toBe(1);
    expect(widthAnim.start).toHaveBeenCalled();
    expect(instance.state.isBreathing).toEqual(true);
    expect(mockUpdate).not.toHaveBeenCalled();
    expect(instance.state.timerStart).toEqual(now);
    expect(instance.interval).toBeDefined();

    instance.setState({ timerStop: later });

    instance.toggleIsBreathing();
    expect(widthAnimValue.resetAnimation.mock.calls.length).toBe(2);
    expect(widthAnim.start.mock.calls.length).toBe(1);
    expect(instance.state.isBreathing).toEqual(false);
    expect(mockUpdate).toHaveBeenCalledWith(10);
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
