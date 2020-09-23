import { StyleSheet } from 'react-native'
import { MessageType, User } from '../../types'

const styles = ({
  message,
  user,
}: {
  message: MessageType.File
  user?: User
}) =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    iconContainer: {
      alignItems: 'center',
      backgroundColor:
        user?.id === message.authorId ? '#ffffff33' : '#2e2c2c33',
      borderRadius: 22,
      height: 44,
      justifyContent: 'center',
      marginLeft: 16,
      marginVertical: 16,
      width: 44,
    },
    name: {
      color: user?.id === message.authorId ? '#fff' : '#2e2c2c',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
    },
    size: {
      color: user?.id === message.authorId ? '#ffffff66' : '#2e2c2c66',
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16,
      marginTop: 2,
    },
    textContainer: {
      flexShrink: 1,
      marginLeft: 12,
      marginRight: 24,
      marginVertical: 16,
    },
  })

export default styles
