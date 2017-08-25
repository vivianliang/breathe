import renderer from 'react-test-renderer';
import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import Swiper from 'react-native-swiper';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('renders navigation slides', () => {
    const wrapper = shallow(<App />);
    // initial slide should be index 0
    expect(wrapper.find(Swiper).prop('index')).toEqual(0);
    // there should be 2 slides
    expect(wrapper.find(View).length).toEqual(2);
  });
});
