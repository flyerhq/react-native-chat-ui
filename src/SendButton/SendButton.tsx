import * as React from 'react'
import {
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import styles from './styles'

export interface SendButtonProps {
  disabled?: boolean
  onPress: () => void
  touchableOpacityProps?: TouchableOpacityProps
}

export const SendButton = ({
  disabled,
  onPress,
  touchableOpacityProps,
}: SendButtonProps) => {
  const handlePress = (event: GestureResponderEvent) => {
    onPress()
    touchableOpacityProps?.onPress?.(event)
  }

  return (
    <TouchableOpacity
      accessibilityRole='button'
      accessibilityLabel='Send a message'
      accessibilityState={{ disabled }}
      disabled={disabled}
      {...touchableOpacityProps}
      onPress={handlePress}
    >
      <Text style={styles.button}>Send</Text>
    </TouchableOpacity>
  )
}
