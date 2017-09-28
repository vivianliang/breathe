import React from 'react';
import { shallow } from 'enzyme';

import Journey from './index';
import { setStorageItem } from '../../utils/storage';

const getComponent = () => {
  const navigation = { goBack: jest.fn() };
  const wrapper = shallow(
    <Journey navigation={navigation} />,
  );
  return { wrapper, instance: wrapper.instance() };
};

describe('<Journey />', () => {
  it('should render', () => {
    const { wrapper } = getComponent();
    expect(wrapper.length).toEqual(1);
  });

  it('should get breathingTimes from storage at componentWillMount()', async () => {
    await setStorageItem('recentBreathingTime', 10);
    await setStorageItem('totalBreathingTime', 20);
    const { instance } = getComponent();
    setTimeout(() => {
      expect(instance.state.breathingTimes.recent).toEqual(10);
      expect(instance.state.breathingTimes.total).toEqual(20);
    });
  });

  it('should getTotalBreaths', () => {
    const { instance } = getComponent();
    instance.state.breathingTimes.total = 32;
    expect(instance.getTotalBreaths()).toEqual(2);
  });

  it('should getTotalBreathingText', () => {
    const { instance } = getComponent();
    instance.state.breathingTimes.total = 32;
    expect(instance.getTotalBreathingText()).toEqual('2 gallons of milk');

    instance.state.breathingTimes.total = 16;
    expect(instance.getTotalBreathingText()).toEqual('1 gallon of milk');

    instance.state.breathingTimes.total = 320;
    expect(instance.getTotalBreathingText()).toEqual('2 volleyballs');
  });

  it('should render breathingTimes data', async () => {
    await setStorageItem('recentBreathingTime', 5);
    await setStorageItem('totalBreathingTime', 32);
    const { wrapper } = getComponent();

    setTimeout(() => {
      expect(wrapper.find('View').length).toEqual(3);

      expect(wrapper.find('Text').length).toEqual(5);
      expect(wrapper.find('Text').at(1).props().children).toEqual(
        ['You focused on breathing for ', 5, ' ', 'seconds', '!']);
      expect(wrapper.find('Text').at(2).props().children).toEqual(
        ['You have taken a total of ', 2, ' ', 'breaths', '.']);
      expect(wrapper.find('Text').at(3).props().children).toEqual('2 gallons of milk');
    });
  });

  it('should render back home button', () => {
    const { wrapper } = getComponent();
    expect(wrapper.find('ActionButton').length).toBe(1);
    expect(wrapper.find('ActionButton').props().text).toBe('BACK HOME');
  });
});
