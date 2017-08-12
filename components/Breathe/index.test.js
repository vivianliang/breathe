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
    expect(widthAnim).toEqual(Animated.Value(1));
  });
});
