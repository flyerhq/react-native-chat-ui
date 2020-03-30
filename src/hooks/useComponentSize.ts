import * as React from 'react'
import { LayoutChangeEvent } from 'react-native'
import { Size } from '../types'

export const useComponentSize = () => {
  const [size, setSize] = React.useState<Size>({ height: 0, width: 0 })

  const onLayout = React.useCallback((event: LayoutChangeEvent) => {
    const { height, width } = event.nativeEvent.layout
    setSize({ height, width })
  }, [])

  return { onLayout, size }
}
