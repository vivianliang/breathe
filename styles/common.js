import { Dimensions, StyleSheet } from 'react-native';

// COMMON COLORS
export const lightKhaki = '#e8f5cb';
export const lightSage = '#daf2e2';

// WIP names
export const gray1 = '#667a80';
export const gray2 = '#9daeb3';
export const gray3 = '#ced2d4';
export const gray4 = '#fdfbf5';
export const green1 = '#5fb0a7';
export const green2 = '#8bccc4';
export const green3 = '#daf2e2'; // lightSage
export const green4 = '#e8f5cb'; // lightKhaki
export const yellow1 = '#fbf4e4';

const { width: windowWidth } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContents: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigCircle: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.9,
    borderColor: green1,
    borderRadius: (windowWidth * 0.9) / 0.5,
    borderWidth: 1,
  },
  littleCircle: {
    width: windowWidth * 0.6,
    height: windowWidth * 0.6,
    borderRadius: (windowWidth * 0.6) / 0.5,
    backgroundColor: yellow1,
    opacity: 0.75,
  },
});
