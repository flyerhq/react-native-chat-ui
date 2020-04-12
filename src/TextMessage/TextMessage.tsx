import * as React from 'react'
import { Text, View } from 'react-native'
import { Message, Size, User } from '../types'
import styles from './styles'

export interface TextMessageProps {
  message: Message
  parentComponentSize: Size
  user: User
}

export const TextMessage = ({
  message,
  parentComponentSize,
  user,
}: TextMessageProps) => {
  const { container, message: messageStyle, messageContainer } = styles({
    message,
    parentComponentSize,
    user,
  })

  return (
    <View style={container}>
      <View style={messageContainer}>
        <Text accessibilityRole='text' style={messageStyle}>
          {message.text}
        </Text>
      </View>
    </View>
  )
}
