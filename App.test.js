import React from 'react';
import { shallow } from 'enzyme';
import Swiper from 'react-native-swiper';
import App from './App';

import Breathe from './components/Breathe';
import Journey from './components/Journey';


describe('App', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.length).toEqual(1);
  });

  it('renders navigation slides', () => {
    const wrapper = shallow(<App />);

    setTimeout(() => { // this is a fun hack...
    // initial slide should be index 0
      expect(wrapper.find(Swiper).prop('index')).toEqual(0);
      // there should be 2 slides
      expect(wrapper.find(Breathe).length).toEqual(1);
      expect(wrapper.find(Journey).length).toEqual(1);
    });
  });
});
