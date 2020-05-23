import * as React from 'react'
import {
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

export interface AttachmentButtonProps {
  disabled?: boolean
  onPress?: () => void
  touchableOpacityProps?: TouchableOpacityProps
}

export const AttachmentButton = ({
  disabled,
  onPress,
  touchableOpacityProps,
}: AttachmentButtonProps) => {
  const handlePress = (event: GestureResponderEvent) => {
    onPress?.()
    touchableOpacityProps?.onPress?.(event)
  }

  return (
    <TouchableOpacity
      accessibilityRole='button'
      accessibilityLabel='Add an attachment'
      accessibilityState={{ disabled }}
      disabled={disabled}
      {...touchableOpacityProps}
      onPress={handlePress}
    >
      {/* type-coverage:ignore-next-line */}
      <Image source={require('../../assets/icon-attachment.png')} />
    </TouchableOpacity>
  )
}
