import { StyleSheet } from 'react-native'

import { Theme } from '../../types'

export default ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    dateDivider: StyleSheet.flatten([
      theme.fonts.subtitle2,
      {
        color: theme.colors.secondaryText,
        marginBottom: 32,
        textAlign: 'center',
      },
    ]),
    flatList: {
      backgroundColor: theme.colors.background,
      height: '100%',
    },
    footer: {
      height: 16,
    },
    keyboardAccessoryView: {
      backgroundColor: theme.colors.inputBackground,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  })
