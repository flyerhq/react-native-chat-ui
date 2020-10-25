import { StyleSheet } from 'react-native'
import { Theme } from '../../types'

export default ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    dateDivider: StyleSheet.flatten([
      theme.fonts.caption,
      {
        fontWeight: 'bold',
        marginBottom: 32,
        color: '#1d1c21',
        textAlign: 'center',
      },
    ]),
    footer: {
      height: 16,
    },
    flatList: {
      backgroundColor: theme.colors.background,
    },
  })
