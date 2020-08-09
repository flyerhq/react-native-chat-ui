import * as React from 'react'
import {
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

export interface SendButtonProps {
  onPress: () => void
  touchableOpacityProps?: TouchableOpacityProps
}

export const SendButton = ({
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
      {...touchableOpacityProps}
      onPress={handlePress}
    >
      {/* type-coverage:ignore-next-line */}
      <Image source={require('../../assets/icon-send.png')} />
    </TouchableOpacity>
  )
}
