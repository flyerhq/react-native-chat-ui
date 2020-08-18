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
      flexDirection: 'row',
    },
    image: {
      height: 20,
      width: 18,
    },
    imageContainer: {
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
    size: {
      color: user?.id === message.authorId ? '#fff' : '#2e2c2c',
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16,
      marginBottom: 18,
      marginTop: 2,
      opacity: 0.4,
    },
    textContainer: {
      flexShrink: 1,
      marginLeft: 12,
      marginRight: 24,
    },
    title: {
      color: user?.id === message.authorId ? '#fff' : '#2e2c2c',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
      marginTop: 16,
    },
  })

export default styles
