import React from 'react';
import { shallow } from 'enzyme';

import Journey from './index';
import { setStorageItem } from '../../utils/storage';

const utils = require('../../utils/utils');
const tips = require('./tips');

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

  it('should have a default state', () => {
    const { instance } = getComponent();
    const { breathingTimes } = instance.state;
    expect(breathingTimes.recent).toEqual(0);
    expect(breathingTimes.total).toEqual(0);
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

  it('should render null state for no breaths', async () => {
    await setStorageItem('recentBreathingTime', 0);
    await setStorageItem('totalBreathingTime', 0);
    const { wrapper } = getComponent();

    setTimeout(() => {
      expect(wrapper.find('Text').length).toEqual(2); // null text and tip text
      expect(wrapper.find('Text').at(0).props().children).toEqual(
        "You haven't taken any breaths yet!");
    });
  });

  it('should not render recent breaths if recent is zero when total is non-zero', async () => {
    await setStorageItem('recentBreathingTime', 0);
    await setStorageItem('totalBreathingTime', 16); // note: less than 16 rounds down to 0
    const { wrapper } = getComponent();

    setTimeout(() => {
      expect(wrapper.find('Text').at(0).props().children).toEqual(
        ['You have taken a total of ', 1, ' ', 'breath', '.']);
    });
  });

  it('should not render total breaths if total is zero when recent is non-zero', async () => {
    await setStorageItem('recentBreathingTime', 1);
    await setStorageItem('totalBreathingTime', 0);
    const { wrapper } = getComponent();

    setTimeout(() => {
      expect(wrapper.find('Text').at(0).props().children).toEqual('Congrats!');
    });
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

  it('should render tips', async () => {
    // hide recent cycle and total data Views
    await setStorageItem('recentBreathingTime', 0);
    await setStorageItem('totalBreathingTime', 0);
    const { wrapper } = getComponent();

    utils.getRandomInt = jest.fn();
    utils.getRandomInt.mockReturnValueOnce(1);
    tips.tips = ['tip1', 'tip2', 'tip3'];

    setTimeout(() => {
      expect(wrapper.find('Text').at(1).props().children).toEqual('tip2');
      expect(utils.getRandomInt).toHaveBeenCalledWith(0, 3); // 3 = length of tips
    });
  });

  it('should render back home button', () => {
    const { wrapper } = getComponent();
    expect(wrapper.find('ActionButton').length).toBe(1);
    expect(wrapper.find('ActionButton').props().text).toBe('BACK HOME');
  });
});
