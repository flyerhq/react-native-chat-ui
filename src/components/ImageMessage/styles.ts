import { StyleSheet } from 'react-native'
import { MessageType, User } from '../../types'

const styles = ({
  aspectRatio,
  message,
  messageWidth,
  user,
}: {
  aspectRatio: number
  message: MessageType.Image
  messageWidth: number
  user?: User
}) =>
  StyleSheet.create({
    image: {
      aspectRatio,
      maxHeight: messageWidth,
      minWidth: 170,
      width: messageWidth,
    },
    minimizedImage: {
      borderRadius: 15,
      height: 64,
      margin: 16,
      width: 64,
    },
    minimizedImageContainer: {
      alignItems: 'center',
      backgroundColor: user?.id === message.authorId ? '#6054c9' : '#f7f7f8',
      flexDirection: 'row',
    },
    nameText: {
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
      marginTop: 4,
    },
    textContainer: {
      flexShrink: 1,
      marginRight: 24,
      marginVertical: 16,
    },
  })

export default styles
