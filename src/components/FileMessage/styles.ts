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
          ? theme.colors.sentMessageDocumentIconColor
          : theme.colors.receivedMessageDocumentIconColor,
    },
    iconContainer: {
      alignItems: 'center',
      backgroundColor:
        user?.id === message.author.id
          ? `${String(theme.colors.sentMessageDocumentIconColor)}33`
          : `${String(theme.colors.receivedMessageDocumentIconColor)}33`,
      borderRadius: 21,
      height: 42,
      justifyContent: 'center',
      width: 42,
    },
    name:
      user?.id === message.author.id
        ? theme.fonts.sentMessageBodyTextStyle
        : theme.fonts.receivedMessageBodyTextStyle,
    size: {
      ...(user?.id === message.author.id
        ? theme.fonts.sentMessageCaptionTextStyle
        : theme.fonts.receivedMessageCaptionTextStyle),
      marginTop: 4,
    },
    textContainer: {
      flexShrink: 1,
      marginLeft: 16,
    },
  })

export default styles
