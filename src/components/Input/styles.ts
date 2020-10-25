import { StyleSheet } from 'react-native'
import { Theme } from '../../types'

export default ({ theme }: { theme: Theme }) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 24,
      paddingVertical: 20,
    },
    input: StyleSheet.flatten([
      theme.fonts.body1,
      {
        color: theme.colors.primaryText,
        flex: 1,
        maxHeight: 100,
        // Fixes default paddings for Android
        paddingBottom: 0,
        paddingHorizontal: 16,
        paddingTop: 0,
      },
    ]),
    keyboardAccessoryView: {
      backgroundColor: theme.colors.inputBackground,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
  })
