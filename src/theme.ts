import { ColorValue } from 'react-native'

import { Theme } from './types'

// For internal usage only. Use values from theme itself.
export const colors: ColorValue[] = [
  '#ff6767',
  '#66e0da',
  '#f5a2d9',
  '#f0c722',
  '#6a85e5',
  '#fd9a6f',
  '#92db6e',
  '#73b8e5',
  '#fd7590',
  '#c78ae5',
]

export const defaultTheme: Theme = {
  borders: {
    inputBorderRadius: 20,
    messageBorderRadius: 20,
  },
  colors: {
    background: '#ffffff',
    caption: '#9e9cab',
    error: '#ff6767',
    inputBackground: '#1d1d21',
    inputText: '#ffffff',
    primary: '#6f61e8',
    primaryText: '#ffffff',
    secondary: '#f7f7f8',
    secondaryText: '#1d1d21',
    subtitle2: '#1d1d21',
  },
  fonts: {
    body1: {
      fontFamily: 'Avenir',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    body2: {
      fontFamily: 'Avenir',
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    caption: {
      fontFamily: 'Avenir',
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16,
    },
    subtitle1: {
      fontFamily: 'Avenir',
      fontSize: 16,
      fontWeight: '800',
      lineHeight: 22,
    },
    subtitle2: {
      fontFamily: 'Avenir',
      fontSize: 12,
      fontWeight: '800',
      lineHeight: 16,
    },
  },
}

export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: '#1f1c38',
    inputBackground: '#2b2250',
    secondary: '#2b2250',
    secondaryText: '#ffffff',
    subtitle2: '#ffffff',
  },
}
