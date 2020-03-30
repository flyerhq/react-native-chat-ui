import { StyleSheet } from 'react-native'
import { Message, Size, User } from '../types'

const styles = ({
  message,
  parentComponentSize,
  user,
}: {
  message: Message
  parentComponentSize: Size
  user: User
}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      marginVertical: 4,
      justifyContent: user.id === message.authorId ? 'flex-end' : 'flex-start',
    },
    message: {
      paddingHorizontal: 16,
      marginHorizontal: 8,
      paddingVertical: 8,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: user.id === message.authorId ? '#7fd' : '#eee',
      maxWidth:
        parentComponentSize.width * 0.9 < 520
          ? parentComponentSize.width * 0.9
          : 520,
    },
  })

export default styles
