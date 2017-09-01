require('react-native-mock/mock');


jest.mock('AsyncStorage', () => {
  const itemStore = {};
  return ({
    setItem: jest.fn((item, value) =>
      new Promise((resolve) => {
        itemStore[item] = value;
        resolve(value);
      }),
    ),
    multiSet: jest.fn((item, value) =>
      new Promise((resolve) => {
        itemStore[item] = value;
        resolve(value);
      }),
    ),
    getItem: jest.fn(item =>
      new Promise((resolve) => {
        resolve(itemStore[item]);
      }),
    ),
    multiGet: jest.fn(item =>
      new Promise((resolve) => {
        resolve(itemStore[item]);
      }),
    ),
    removeItem: jest.fn(item =>
      new Promise((resolve) => {
        resolve(delete itemStore[item]);
      }),
    ),
    getAllKeys: jest.fn(items =>
      new Promise((resolve) => {
        resolve(items.keys());
      }),
    ),
  });
});
