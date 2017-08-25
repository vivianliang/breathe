import React from 'react';
import { ScrollView } from 'react-native';
import JourneyItem from './JourneyItem';

const Journey = function Journey() {
  return (
    <ScrollView>
      <JourneyItem />
      <JourneyItem />
      <JourneyItem />
      <JourneyItem />
      <JourneyItem />
    </ScrollView>
  );
};

export default Journey;
