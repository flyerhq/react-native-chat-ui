import { StyleSheet } from 'react-native'
import { MessageType, User } from '../../types'

const styles = ({
  message,
  messageWidth,
  previousMessageSameAuthor,
  user,
}: {
  message: MessageType.Any
  messageWidth: number
  previousMessageSameAuthor: boolean
  user?: User
}) =>
  StyleSheet.create({
    container: {
      alignSelf: user?.id === message.authorId ? 'flex-end' : 'flex-start',
      flex: 1,
      marginBottom: previousMessageSameAuthor ? 8 : 16,
      marginHorizontal: 24,
    },
    contentContainer: {
      backgroundColor:
        user?.id !== message.authorId || message.type === 'image'
          ? '#f7f7f8'
          : '#6054c9',
      borderBottomLeftRadius: user?.id === message.authorId ? 20 : 0,
      borderBottomRightRadius: user?.id === message.authorId ? 0 : 20,
      borderColor: 'transparent',
      borderRadius: 20,
      maxWidth: messageWidth,
      overflow: 'hidden',
    },
    status: {
      tintColor: '#6054c9',
    },
    statusContainer: {
      alignItems: 'center',
      alignSelf: 'flex-end',
      flexDirection: 'row',
      marginTop: 8,
    },
    time: {
      color: '#9e9cab',
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16,
      marginRight: user?.id === message.authorId ? 8 : 16,
    },
  })

export default styles
