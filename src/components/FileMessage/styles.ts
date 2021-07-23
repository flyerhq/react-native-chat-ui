import { StyleSheet } from 'react-native'

import { MessageType, Theme, User } from '../../types'

const styles = ({
  message,
  theme,
  user,
}: {
  message: MessageType.DerivedFile
  theme: Theme
  user?: User
}) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      padding: 16,
      paddingRight: 24,
    },
    icon: {
      tintColor:
        user?.id === message.author.id
          ? theme.colors.primaryText
          : theme.colors.primary,
    },
    iconContainer: {
      alignItems: 'center',
      backgroundColor:
        user?.id === message.author.id
          ? `${String(theme.colors.primaryText)}33`
          : `${String(theme.colors.primary)}33`,
      borderRadius: 21,
      height: 42,
      justifyContent: 'center',
      width: 42,
    },
    name: StyleSheet.flatten([
      theme.fonts.body1,
      {
        color:
          user?.id === message.author.id
            ? theme.colors.primaryText
            : theme.colors.secondaryText,
      },
    ]),
    size: StyleSheet.flatten([
      theme.fonts.caption,
      {
        color:
          user?.id === message.author.id
            ? `${String(theme.colors.primaryText)}80`
            : theme.colors.caption,
        marginTop: 4,
      },
    ]),
    textContainer: {
      flexShrink: 1,
      marginLeft: 16,
    },
  })

export default styles
