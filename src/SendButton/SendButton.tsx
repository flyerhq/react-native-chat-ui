import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import styles from './styles'

export interface SendButtonProps {
  onPress: () => void
}

export const SendButton = ({ onPress }: SendButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text>Send</Text>
    </TouchableOpacity>
  )
}
