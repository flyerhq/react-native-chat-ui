import * as React from 'react'
import {
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

export interface AttachmentButtonProps {
  onPress?: () => void
  touchableOpacityProps?: TouchableOpacityProps
}

export const AttachmentButton = ({
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
      {...touchableOpacityProps}
      onPress={handlePress}
    >
      <Image source={require('../../assets/icon-attachment.png')} />
    </TouchableOpacity>
  )
}
