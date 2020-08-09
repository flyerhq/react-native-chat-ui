import * as React from 'react'
import { Text } from 'react-native'
import { MessageType } from '../../types'
import { UserContext } from '../../utils'
import styles from './styles'

export interface TextMessageProps {
  message: MessageType.Text
}

export const TextMessage = ({ message }: TextMessageProps) => {
  const user = React.useContext(UserContext)
  const { text } = styles({
    message,
    user,
  })

  return (
    <Text accessibilityRole='text' style={text}>
      {message.text}
    </Text>
  )
}
