import React from 'react';
import { shallow } from 'enzyme';

import Journey from './index';

const getComponent = () => {
  const wrapper = shallow(
    <Journey breathingTimes={{ recent: 5, total: 32 }} />,
  );
  return { wrapper, instance: wrapper.instance() };
};

describe('<Journey />', () => {
  it('should render', () => {
    const { wrapper } = getComponent();
    expect(wrapper.length).toEqual(1);
  });

  it('should getTotalBreaths', () => {
    const { instance } = getComponent();
    expect(instance.getTotalBreaths()).toEqual('2.0');
  });

  it('should getTotalBreathingText', () => {
    const { instance } = getComponent();
    expect(instance.getTotalBreathingText()).toEqual('2.0 gallons of milk');

    instance.props.breathingTimes.total = 16;
    // if we get rid of the decimal place, this will be singular 'gallon'
    expect(instance.getTotalBreathingText()).toEqual('1.0 gallons of milk');

    instance.props.breathingTimes.total = 320;
    expect(instance.getTotalBreathingText()).toEqual('2.0 volleyballs');
  });

  it('should render breathingTimes data', () => {
    const { wrapper } = getComponent();
    expect(wrapper.find('View').length).toEqual(3);

    expect(wrapper.find('Text').length).toEqual(6);
    expect(wrapper.find('Text').at(1).props().children).toEqual(
      ['You focused on breathing for ', '5.0', ' ', 'seconds', '!']);
    expect(wrapper.find('Text').at(2).props().children).toEqual(
      ['You have taken a total of ', '2.0', ' breaths.']);
    expect(wrapper.find('Text').at(3).props().children).toEqual('2.0 gallons of milk');
  });
});
