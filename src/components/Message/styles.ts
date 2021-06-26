import { StyleSheet } from 'react-native'

import { MessageType, Theme, User } from '../../types'

const styles = ({
  message,
  messageWidth,
  previousMessageSameAuthor,
  theme,
  user,
}: {
  message: MessageType.Any
  messageWidth: number
  previousMessageSameAuthor: boolean
  theme: Theme
  user?: User
}) =>
  StyleSheet.create({
    container: {
      alignSelf: user?.id === message.author.id ? 'flex-end' : 'flex-start',
      flex: 1,
      marginBottom: previousMessageSameAuthor ? 8 : 16,
      marginHorizontal: 24,
    },
    contentContainer: {
      backgroundColor:
        user?.id !== message.author.id || message.type === 'image'
          ? theme.colors.secondary
          : theme.colors.primary,
      borderBottomLeftRadius:
        user?.id === message.author.id ? theme.borders.messageBorderRadius : 0,
      borderBottomRightRadius:
        user?.id === message.author.id ? 0 : theme.borders.messageBorderRadius,
      borderColor: 'transparent',
      borderRadius: theme.borders.messageBorderRadius,
      maxWidth: messageWidth,
      overflow: 'hidden',
    },
    status: {
      tintColor: theme.colors.primary,
    },
    statusContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      flexDirection: 'row',
      marginTop: 8,
    },
    time: StyleSheet.flatten([
      theme.fonts.caption,
      {
        color: theme.colors.caption,
        marginRight: user?.id === message.author.id ? 8 : 16,
      },
    ]),
  })

export default styles
