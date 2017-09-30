export function getRandomInt(min, max) {
  // The maximum is exclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min)) + min;
}

export default getRandomInt;
