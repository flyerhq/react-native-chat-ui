import * as React from 'react'
import { Animated, Easing, ViewStyle } from 'react-native'
import styles from './styles'

export interface CircularSpinnerProps {
  color?: string
  size?: number
  style?: ViewStyle
}

export const CircularSpinner = ({
  color,
  size,
  style,
}: CircularSpinnerProps) => {
  const spinValue = new Animated.Value(0)

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 750,
      easing: Easing.linear,
      useNativeDriver: false,
    })
  ).start()

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  const { circle } = styles({ color, size })

  return (
    <Animated.View
      accessibilityLabel='Spinner'
      style={[{ transform: [{ rotate: spin }] }, circle, style]}
    />
  )
}
