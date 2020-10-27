import * as React from 'react'
import {
  GestureResponderEvent,
  Image,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import { ThemeContext } from '../../utils'

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
  const theme = React.useContext(ThemeContext)

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
      <Image
        source={require('../../assets/icon-send.png')}
        style={{ tintColor: theme.colors.inputText }}
      />
    </TouchableOpacity>
  )
}
