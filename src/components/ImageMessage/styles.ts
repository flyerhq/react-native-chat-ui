import { StyleSheet } from 'react-native'
import { MessageType, Theme, User } from '../../types'

const styles = ({
  aspectRatio,
  message,
  messageWidth,
  theme,
  user,
}: {
  aspectRatio: number
  message: MessageType.Image
  messageWidth: number
  theme: Theme
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
      backgroundColor:
        user?.id === message.authorId ? '#6054c9' : theme.colors.secondary,
      flexDirection: 'row',
    },
    nameText: StyleSheet.flatten([
      theme.fonts.caption,
      {
        color:
          user?.id === message.authorId ? theme.colors.primaryText : '#2e2c2c',
      },
    ]),
    sizeText: StyleSheet.flatten([
      theme.fonts.caption,
      {
        color: user?.id === message.authorId ? '#ffffff66' : '#2e2c2c66',
        marginTop: 4,
      },
    ]),
    textContainer: {
      flexShrink: 1,
      marginRight: 24,
      marginVertical: 16,
    },
  })

export default styles
