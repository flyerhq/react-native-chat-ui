import { StyleSheet } from 'react-native'
import { Message, Size, User } from '../../types'

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
      marginVertical: 8,
      justifyContent: user.id === message.authorId ? 'flex-end' : 'flex-start',
    },
    messageContainer: {
      paddingHorizontal: 24,
      marginHorizontal: 24,
      paddingVertical: 20,
      borderRadius: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderBottomLeftRadius: user.id === message.authorId ? 16 : 0,
      borderBottomRightRadius: user.id === message.authorId ? 0 : 16,
      borderColor: user.id === message.authorId ? '#00cdbd' : '#72738e1f',
      backgroundColor: user.id === message.authorId ? '#00cdbd' : '#fff',
      maxWidth:
        parentComponentSize.width * 0.9 < 520
          ? parentComponentSize.width * 0.9
          : 520,
    },
    message: {
      fontSize: 16,
      fontWeight: '500',
      color: user.id === message.authorId ? '#fff' : '#2e2c2c',
    },
  })

export default styles
