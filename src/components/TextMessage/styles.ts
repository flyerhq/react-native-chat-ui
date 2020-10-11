import { StyleSheet } from 'react-native'
import { MessageType, User } from '../../types'

const styles = ({
  message,
  user,
}: {
  message: MessageType.Text
  user?: User
}) =>
  StyleSheet.create({
    descriptionText: {
      color: user?.id === message.authorId ? '#fff' : '#2e2c2c',
      fontSize: 14,
      lineHeight: 18,
      marginTop: 4,
    },
    titleText: {
      color: user?.id === message.authorId ? '#fff' : '#2e2c2c',
      fontSize: 16,
      fontWeight: 'bold',
      lineHeight: 20,
    },
    text: {
      color: user?.id === message.authorId ? '#fff' : '#2e2c2c',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
    },
  })

export default styles
