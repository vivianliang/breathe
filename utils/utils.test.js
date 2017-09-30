import { getRandomInt } from './utils';

describe('utils/utils', () => {
  it('should get random integer', () => {
    Math.random = jest.fn()
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.2)
      .mockReturnValueOnce(0.4)
      .mockReturnValueOnce(0.6)
      .mockReturnValueOnce(0.8);

    expect(getRandomInt(0, 5)).toBe(0);
    expect(getRandomInt(0, 5)).toBe(1);
    expect(getRandomInt(0, 5)).toBe(2);
    expect(getRandomInt(0, 5)).toBe(3);
    expect(getRandomInt(0, 5)).toBe(4);
  });
});
