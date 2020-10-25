import { StyleSheet } from 'react-native'
import { MessageType, Theme, User } from '../../types'

const styles = ({
  message,
  theme,
  user,
}: {
  message: MessageType.Text
  theme: Theme
  user?: User
}) =>
  StyleSheet.create({
    descriptionText: StyleSheet.flatten([
      theme.fonts.body2,
      {
        color:
          user?.id === message.authorId ? theme.colors.primaryText : '#2e2c2c',
        marginTop: 4,
      },
    ]),
    titleText: StyleSheet.flatten([
      theme.fonts.subtitle,
      {
        color:
          user?.id === message.authorId ? theme.colors.primaryText : '#2e2c2c',
      },
    ]),
    text: StyleSheet.flatten([
      theme.fonts.body1,
      {
        color:
          user?.id === message.authorId ? theme.colors.primaryText : '#2e2c2c',
      },
    ]),
  })

export default styles
