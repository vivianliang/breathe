import React from 'react';
import { shallow } from 'enzyme';

import Journey from './index';

describe('<Journey />', () => {
  it('should render', () => {
    const wrapper = shallow(<Journey />);
    expect(wrapper.length).toEqual(1);
  });
});
