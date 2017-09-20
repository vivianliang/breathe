import React from 'react';
import { shallow } from 'enzyme';

import Journey from './index';

describe('<Journey />', () => {
  it('should render', () => {
    const wrapper = shallow(<Journey breathingTimes={{ recent: 0, total: 0 }} />);
    expect(wrapper.length).toEqual(1);
  });

  it('should render breathingTimes data', () => {
    const wrapper = shallow(<Journey breathingTimes={{ recent: 5, total: 32 }} />);
    expect(wrapper.find('View').length).toEqual(3);

    expect(wrapper.find('Text').length).toEqual(6);
    expect(wrapper.find('Text').at(1).props().children).toEqual(
      ['You focused on breathing for ', 5, ' seconds!']);
    expect(wrapper.find('Text').at(2).props().children).toEqual(
      ['You have taken a total of ', 2, ' breaths.']);
  });
});
