import { Theme } from './types'

export const defaultTheme: Theme = {
  colors: {
    background: '#fff',
    caption: '#9e9cab',
    error: '#ff6767',
    inputBackground: '#1d1d21',
    primary: '#6f61e8',
    primaryText: '#fff',
    secondary: '#f7f7f8',
    secondaryText: '#1d1d21',
  },
  fonts: {
    body1: {
      fontFamily: 'Avenir',
      fontWeight: '500',
      fontSize: 16,
      lineHeight: 22,
    },
    body2: {
      fontFamily: 'Avenir',
      fontWeight: '400',
      fontSize: 14,
      lineHeight: 20,
    },
    caption: {
      fontFamily: 'Avenir',
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16,
    },
    subtitle: {
      fontFamily: 'Avenir',
      fontWeight: '800',
      fontSize: 16,
      lineHeight: 22,
    },
  },
}
