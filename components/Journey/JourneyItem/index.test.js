import React from 'react';
import { shallow } from 'enzyme';

import JourneyItem from './index';

describe('<JourneyItem />', () => {
  it('should render', () => {
    const wrapper = shallow(<JourneyItem />);
    expect(wrapper.length).toEqual(1);
  });
});
