import { StyleSheet } from 'react-native'
import { MessageType, User } from '../../types'

const styles = ({
  message,
  messageWidth,
  previousMessageSameAuthor,
  previousMessageWithinTimeRange,
  user,
}: {
  message: MessageType.Any
  messageWidth: number
  previousMessageSameAuthor: boolean
  previousMessageWithinTimeRange: boolean
  user?: User
}) =>
  StyleSheet.create({
    container: {
      alignSelf: user?.id === message.authorId ? 'flex-end' : 'flex-start',
      flex: 1,
      marginBottom:
        previousMessageSameAuthor || previousMessageWithinTimeRange ? 8 : 16,
      marginHorizontal: 24,
    },
    contentContainer: {
      backgroundColor:
        user?.id !== message.authorId || message.type === 'image'
          ? '#f7f7f8'
          : '#6054c9',
      borderBottomLeftRadius: user?.id === message.authorId ? 20 : 0,
      borderBottomRightRadius: user?.id === message.authorId ? 0 : 20,
      borderRadius: 20,
      maxWidth: messageWidth,
      overflow: 'hidden',
    },
    statusContainer: {
      alignSelf: 'flex-end',
      marginRight: 8,
      marginTop: 8,
    },
    time: {
      color: '#9e9cab',
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16,
    },
  })

export default styles
