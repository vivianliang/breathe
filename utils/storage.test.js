import { AsyncStorage } from 'react-native';

import { getStorageItem, setStorageItem } from './storage';

const STORE = '@BreatheApp';

describe('utils/storage', () => {
  it('should get storage item', async () => {
    await AsyncStorage.setItem(`${STORE}:test`, JSON.stringify('foo'));
    const val = await getStorageItem('test');
    expect(val).toEqual('foo');
  });

  it('should set storage item', async () => {
    await setStorageItem('test', 'bar');
    let val = await AsyncStorage.getItem(`${STORE}:test`);
    val = JSON.parse(val);
    expect(val).toEqual('bar');
  });

  it('should handle non string types', () => {
    const testObjects = [
      1, // int
      0, // falsy int
      3.14, // float
      true, // bool
      [1, 2, 3], // list
      { foo: 'bar' }, // object
    ];
    testObjects.forEach(async (val, idx) => {
      await setStorageItem(`test${idx}`, testObjects[idx]);
      const result = await getStorageItem(`test${idx}`);
      expect(result).toBe(testObjects[idx]);
      expect(typeof result).toBe(typeof testObjects[idx]);
    });
  });
});
