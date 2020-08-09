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
    text: {
      color: user?.id === message.authorId ? '#fff' : '#2e2c2c',
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 20,
      marginHorizontal: 24,
      marginVertical: 16,
    },
  })

export default styles
