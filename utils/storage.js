import { AsyncStorage } from 'react-native';

const STORE = '@BreatheApp';

export async function setItem(key, value) {
  try {
    await AsyncStorage.setItem(`${STORE}:${key}`, JSON.stringify(value));
  } catch (error) {
    // TODO: do something with this. crashlytics?
    // Error saving data
  }
}

export async function getItem(key) {
  try {
    const value = await AsyncStorage.getItem(`${STORE}:${key}`);
    // console.log('value', JSON.parse(value));
    return JSON.parse(value);
  } catch (error) {
    // TODO: do something with this. crashlytics?
    // Error retrieving data
  }
  return null;
}
