
import React from 'react';
import { shallow } from 'enzyme';

import CircleButton from './index';


describe('<CircleButton />', () => {
  it('should render', () => {
    const mockOnPress = jest.fn();
    const wrapper = shallow(<CircleButton onPress={mockOnPress} image={0} label="Label" />);

    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('TouchableOpacity').length).toEqual(1);
    expect(wrapper.find('Text').length).toEqual(1);
    expect(wrapper.find('Image').length).toEqual(1);
    expect(wrapper.find('TouchableOpacity').props().onPress).toEqual(mockOnPress);
    expect(wrapper.find('Text').props().children).toEqual('Label');
  });
});
