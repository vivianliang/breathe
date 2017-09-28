import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

const getComponent = () => {
  const wrapper = shallow(<App />);
  return { wrapper, instance: wrapper.instance() };
};

describe('App', () => {
  it('renders without crashing', () => {
    const { wrapper } = getComponent();
    expect(wrapper.length).toEqual(1);
  });
});
