import { StyleSheet } from 'react-native'
import { Theme } from '../../types'

export default ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
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
    },
    footer: {
      height: 16,
    },
  })
