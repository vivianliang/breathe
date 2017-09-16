import React from 'react';
import { Animated } from 'react-native';
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
    expect(widthAnimValue).toEqual(new Animated.Value(1));
    expect(widthAnim).toHaveProperty('start');
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

    instance.toggleIsBreathing();
    expect(widthAnimValue.resetAnimation.mock.calls.length).toBe(1);
    expect(widthAnim.start).toHaveBeenCalled();
    expect(instance.state.isBreathing).toEqual(true);
    expect(mockUpdate).not.toHaveBeenCalled();

    instance.toggleIsBreathing();
    expect(widthAnimValue.resetAnimation.mock.calls.length).toBe(2);
    expect(widthAnim.start.mock.calls.length).toBe(1);
    expect(instance.state.isBreathing).toEqual(false);
    expect(mockUpdate).toHaveBeenCalled();
  });
});
