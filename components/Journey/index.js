import React from 'react';
import { View } from 'react-native';
import JourneyItem from './JourneyItem';

export default class Journey extends React.Component {
  render() {
    return (
      <View>
        <JourneyItem />
        <JourneyItem />
        <JourneyItem />
        <JourneyItem />
      </View>
    );
  }
}
