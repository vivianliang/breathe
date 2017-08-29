import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';

import JourneyItem from './JourneyItem';

export default class Journey extends React.Component {
  static getTotalBreathingText() {
    return 'You have taken a total of 1098 breaths.';
  }

  getSessionBreathingText() {
    return `You focused on breathing for ${this.props.sessionBreathingTime} seconds!`;
  }


  render() {
    return (
      <ScrollView>
        <JourneyItem text={this.getSessionBreathingText()} />
        <JourneyItem text={Journey.getTotalBreathingText()} />
        <JourneyItem />
        <JourneyItem />
        <JourneyItem />
      </ScrollView>
    );
  }
}

Journey.propTypes = {
  sessionBreathingTime: PropTypes.number,
};

Journey.defaultProps = {
  sessionBreathingTime: 0,
};
