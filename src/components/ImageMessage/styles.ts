import { StyleSheet } from 'react-native'
import { MessageType, User } from '../../types'

const styles = ({
  aspectRatio,
  isMinimized,
  message,
  messageWidth,
  user,
}: {
  aspectRatio: number
  isMinimized: boolean
  message: MessageType.Image
  messageWidth: number
  user?: User
}) =>
  StyleSheet.create({
    background: {
      flex: 1,
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor:
        isMinimized && user?.id === message.authorId ? '#6054c9' : '#f7f7f8',
    },
    image: {
      aspectRatio,
      maxHeight: messageWidth,
      minWidth: 170,
      width: messageWidth,
    },
    minimizedImage: {
      borderRadius: 20,
      height: 80,
      margin: 8,
      width: 80,
    },
    name: {
      color: user?.id === message.authorId ? '#fff' : '#2e2c2c',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
    },
    sizeText: {
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
