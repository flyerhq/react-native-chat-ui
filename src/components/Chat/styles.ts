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
        color: theme.colors.subtitle2,
        marginBottom: 32,
        textAlign: 'center',
      },
    ]),
    emptyComponentContainer: {
      alignItems: 'center',
      marginHorizontal: 24,
    },
    emptyComponentTitle: {
      // Ignore because it is object
      // @ts-ignore
      ...theme.fonts.body1,
      textAlign: 'center',
      color: theme.colors.caption,
      transform: [{ rotateX: '180deg' }],
    },
    flatList: {
      backgroundColor: theme.colors.background,
      height: '100%',
    },
    flatListContentContainer: {
      flexGrow: 1,
    },
    footer: {
      height: 16,
    },
    keyboardAccessoryView: {
      backgroundColor: theme.colors.inputBackground,
      borderTopLeftRadius: theme.borders.inputBorderRadius,
      borderTopRightRadius: theme.borders.inputBorderRadius,
    },
  })
