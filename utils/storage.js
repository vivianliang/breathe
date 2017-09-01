import { AsyncStorage } from 'react-native';

const STORE = '@BreatheApp';

export async function setStorageItem(key, value) {
  try {
    await AsyncStorage.setItem(`${STORE}:${key}`, JSON.stringify(value));
  } catch (error) {
    // TODO: do something with this. crashlytics?
    // Error saving data
  }
}

export async function getStorageItem(key) {
  try {
    const value = await AsyncStorage.getItem(`${STORE}:${key}`);
    return JSON.parse(value);
  } catch (error) {
    // TODO: do something with this. crashlytics?
    // Error retrieving data
  }
  return null;
}
