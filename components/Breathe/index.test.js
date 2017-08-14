import React from 'react';
import { Animated } from 'react-native';
import { shallow } from 'enzyme';

import Breathe from './index';

describe('<Breathe />', () => {
  it('should render', () => {
    const wrapper = shallow(<Breathe />);
    expect(wrapper.length).toEqual(1);
  });

  it('should have a default state', () => {
    const wrapper = shallow(<Breathe />);
    const instance = wrapper.instance();

    const { isBreathing, widthAnim, widthAnimValue } = instance.state;
    expect(isBreathing).toEqual(false);
    expect(widthAnimValue).toEqual(new Animated.Value(1));
    expect(widthAnim).toHaveProperty('start');
  });

  it('toggleIsBreathing', () => {
    const wrapper = shallow(<Breathe />);
    const instance = wrapper.instance();

    const { widthAnim, widthAnimValue } = instance.state;
    widthAnimValue.resetAnimation = jest.fn();
    widthAnim.start = jest.fn();

    instance.toggleIsBreathing();
    expect(widthAnimValue.resetAnimation.mock.calls.length).toBe(1);
    expect(widthAnim.start).toHaveBeenCalled();
    expect(instance.state.isBreathing).toEqual(true);

    instance.toggleIsBreathing();
    expect(widthAnimValue.resetAnimation.mock.calls.length).toBe(2);
    expect(widthAnim.start.mock.calls.length).toBe(1);
    expect(instance.state.isBreathing).toEqual(false);
  });
});