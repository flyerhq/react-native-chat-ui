import * as React from 'react'
import { Text } from 'react-native'
import { MessageType, User } from '../../types'
import styles from './styles'

export interface TextMessageProps {
  message: MessageType.Text
  user: User
}

export const TextMessage = ({ message, user }: TextMessageProps) => {
  const { message: messageStyle } = styles({
    message,
    user,
  })

  return (
    <Text accessibilityRole='text' style={messageStyle}>
      {message.text}
    </Text>
  )
}
