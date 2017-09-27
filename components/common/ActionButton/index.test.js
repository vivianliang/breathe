import React from 'react';
import { shallow } from 'enzyme';

import ActionButton from './index';

describe('<ActionButton />', () => {
  it('should render', () => {
    const mockOnPress = jest.fn();
    const wrapper = shallow(<ActionButton onPress={mockOnPress} text="START" />);

    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('TouchableOpacity').length).toEqual(1);
    expect(wrapper.find('Text').length).toEqual(1);
    expect(wrapper.find('TouchableOpacity').props().onPress).toEqual(mockOnPress);
    expect(wrapper.find('Text').props().children).toEqual('START');
  });
});
