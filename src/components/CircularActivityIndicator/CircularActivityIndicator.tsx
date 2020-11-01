import * as React from 'react'
import {
  Animated,
  ColorValue,
  Easing,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native'
import styles from './styles'

export interface CircularActivityIndicatorProps {
  color: ColorValue
  size?: number
  style?: StyleProp<ViewStyle>
}

export const CircularActivityIndicator = ({
  color,
  size = 24,
  style,
}: CircularActivityIndicatorProps) => {
  const { current } = React.useRef(new Animated.Value(0))
  const { circle } = styles({ color, size })

  React.useEffect(() => {
    Animated.loop(
      Animated.timing(current, {
        toValue: 1,
        duration: 600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Animated.View
      style={StyleSheet.flatten([
        {
          transform: [
            {
              rotate: current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        },
        circle,
        style,
      ])}
      testID='CircularActivityIndicator'
    />
  )
}
