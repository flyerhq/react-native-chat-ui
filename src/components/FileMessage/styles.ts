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
      padding: 16,
      paddingRight: 24,
    },
    iconContainer: {
      alignItems: 'center',
      backgroundColor:
        user?.id === message.authorId ? '#ffffff33' : '#2e2c2c33',
      borderRadius: 21,
      height: 42,
      justifyContent: 'center',
      width: 42,
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
      marginTop: 4,
    },
    textContainer: {
      flexShrink: 1,
      marginLeft: 16,
    },
  })

export default styles
