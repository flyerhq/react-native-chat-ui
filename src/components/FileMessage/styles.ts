import { StyleSheet } from 'react-native'
import { MessageType, Theme, User } from '../../types'

const styles = ({
  message,
  theme,
  user,
}: {
  message: MessageType.File
  theme: Theme
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
    name: StyleSheet.flatten([
      theme.fonts.caption,
      {
        color:
          user?.id === message.authorId ? theme.colors.primaryText : '#2e2c2c',
      },
    ]),
    size: StyleSheet.flatten([
      theme.fonts.caption,
      {
        color: user?.id === message.authorId ? '#ffffff66' : '#2e2c2c66',
        marginTop: 4,
      },
    ]),
    textContainer: {
      flexShrink: 1,
      marginLeft: 16,
    },
  })

export default styles
