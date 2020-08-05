import * as React from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { MessageType, Size } from '../../types'

export interface ImageMessageProps {
  message: MessageType.Image
  onPress: (imageUrl: string) => void
}

export const ImageMessage = ({ message, onPress }: ImageMessageProps) => {
  const defaultHeight = message.height ?? 0
  const defaultWidth = message.width ?? 0
  const [size, setSize] = React.useState<Size>({
    height: defaultHeight,
    width: defaultWidth,
  })

  React.useEffect(() => {
    if (defaultHeight || defaultWidth <= 0)
      Image.getSize(
        message.imageUrl,
        (width, height) => setSize({ height, width }),
        () => setSize({ height: 0, width: 0 })
      )
  }, [defaultHeight, defaultWidth, message.imageUrl])

  const handlePress = () => {
    onPress(message.imageUrl)
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Image
        accessibilityRole='image'
        source={{ uri: message.imageUrl }}
        style={StyleSheet.flatten([
          { aspectRatio: size.height > 0 ? size.width / size.height : 1 },
          { width: size.width < 520 ? size.width : '100%' },
        ])}
      />
    </TouchableWithoutFeedback>
  )
}
