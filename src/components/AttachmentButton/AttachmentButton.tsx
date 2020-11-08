import * as React from 'react'
import {
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { L10nContext, ThemeContext } from '../../utils'

export interface AttachmentButtonAdditionalProps {
  touchableOpacityProps?: TouchableOpacityProps
}

export interface AttachmentButtonProps extends AttachmentButtonAdditionalProps {
  onPress?: () => void
}

export const AttachmentButton = ({
  onPress,
  touchableOpacityProps,
}: AttachmentButtonProps) => {
  const l10n = React.useContext(L10nContext)
  const theme = React.useContext(ThemeContext)

  const handlePress = (event: GestureResponderEvent) => {
    onPress?.()
    touchableOpacityProps?.onPress?.(event)
  }

  return (
    <TouchableOpacity
      accessibilityLabel={l10n.attachmentButtonAccessibilityLabel}
      accessibilityRole='button'
      {...touchableOpacityProps}
      onPress={handlePress}
    >
      <Image
        source={require('../../assets/icon-attachment.png')}
        style={{ tintColor: theme.colors.inputText }}
      />
    </TouchableOpacity>
  )
}
