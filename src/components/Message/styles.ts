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
      flex: 1,
      flexDirection: 'row',
      justifyContent: user?.id === message.authorId ? 'flex-end' : 'flex-start',
      marginBottom: previousMessageSameAuthor ? 8 : 24,
    },
    contentContainer: {
      backgroundColor:
        user?.id !== message.authorId || message.type === 'image'
          ? '#f7f7f8'
          : '#6054c9',
      borderBottomLeftRadius: user?.id === message.authorId ? 20 : 0,
      borderBottomRightRadius: user?.id === message.authorId ? 0 : 20,
      borderRadius: 20,
      marginHorizontal: 24,
      maxWidth: messageWidth,
      overflow: 'hidden',
    },
  })

export default styles
