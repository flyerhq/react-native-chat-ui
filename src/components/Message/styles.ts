import { StyleSheet } from 'react-native'
import { MessageType, Size, User } from '../../types'

const styles = ({
  message,
  parentComponentSize,
  previousMessageSameAuthor,
  user,
}: {
  message: MessageType.Any
  parentComponentSize: Size
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
      maxWidth:
        parentComponentSize.width * 0.8 < 520
          ? parentComponentSize.width * 0.8
          : 520,
      overflow: 'hidden',
    },
  })

export default styles
