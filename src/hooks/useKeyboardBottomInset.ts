import * as React from 'react'
import {
  Dimensions,
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const useKeyboardBottomInset = () => {
  const [bottomInset, setBottomInset] = React.useState(0)
  const { bottom: safeAreaBottomInset } = useSafeAreaInsets()

  React.useEffect(() => {
    Keyboard.addListener('keyboardWillChangeFrame', updateBottomInset)

    return () => {
      Keyboard.removeAllListeners('keyboardWillChangeFrame')
    }
  })

  const updateBottomInset = (event: KeyboardEvent) => {
    const { height } = Dimensions.get('screen')
    const { duration, easing, endCoordinates } = event

    const newBottomInset = height - endCoordinates.screenY - safeAreaBottomInset

    if (newBottomInset === bottomInset) {
      return
    }

    if (duration && easing) {
      LayoutAnimation.configureNext({
        // We have to pass the duration equal to minimal accepted duration defined here: RCTLayoutAnimation.m
        duration: duration > 10 ? duration : 10,
        update: {
          duration: duration > 10 ? duration : 10,
          type: LayoutAnimation.Types[easing],
        },
      })
    }

    setBottomInset(newBottomInset)
  }

  return { bottomInset, updateBottomInset }
}
