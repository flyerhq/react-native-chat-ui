import * as React from 'react'
import { Text, View } from 'react-native'
import styles from './styles'

export interface TextMessageProps {
  text: string
}

export const TextMessage = ({ text }: TextMessageProps) => {
  return (
    <View style={styles.container}>
      <Text accessibilityRole='text' style={styles.message}>
        {text}
      </Text>
    </View>
  )
}
