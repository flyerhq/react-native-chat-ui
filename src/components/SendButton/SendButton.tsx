import * as React from 'react'
import {
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

import { L10nContext, ThemeContext } from '../../utils'
import styles from './styles'

export interface SendButtonPropsAdditionalProps {
  touchableOpacityProps?: TouchableOpacityProps
}

export interface SendButtonProps extends SendButtonPropsAdditionalProps {
  onPress: () => void
}

export const SendButton = ({
  onPress,
  touchableOpacityProps,
}: SendButtonProps) => {
  const l10n = React.useContext(L10nContext)
  const theme = React.useContext(ThemeContext)

  const handlePress = (event: GestureResponderEvent) => {
    onPress()
    touchableOpacityProps?.onPress?.(event)
  }

  return (
    <TouchableOpacity
      accessibilityLabel={l10n.sendButtonAccessibilityLabel}
      accessibilityRole='button'
      {...touchableOpacityProps}
      onPress={handlePress}
      style={styles.sendButton}
    >
      <Image
        source={
          theme.icons?.sendButtonIcon ?? require('../../assets/icon-send.png')
        }
        style={{ tintColor: theme.colors.inputText }}
      />
    </TouchableOpacity>
  )
}
