import { Theme } from './types'

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
  },
  fonts: {
    body1: {
      fontFamily: 'Avenir',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 22,
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
  },
}
