import * as React from 'react'
import { Image, TouchableWithoutFeedback } from 'react-native'
import { MessageType, Size } from '../../types'
import styles from './styles'

export interface ImageMessageProps {
  message: MessageType.Image
  onPress: (url: string) => void
}

export const ImageMessage = ({ message, onPress }: ImageMessageProps) => {
  const defaultHeight = message.height ?? 0
  const defaultWidth = message.width ?? 0
  const [size, setSize] = React.useState<Size>({
    height: defaultHeight,
    width: defaultWidth,
  })
  const { image } = styles({ size })

  React.useEffect(() => {
    if (defaultHeight <= 0 || defaultWidth <= 0)
      Image.getSize(
        message.url,
        (width, height) => setSize({ height, width }),
        () => setSize({ height: 0, width: 0 })
      )
  }, [defaultHeight, defaultWidth, message.url])

  const handlePress = () => {
    onPress(message.url)
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Image
        accessibilityRole='image'
        source={{ uri: message.url }}
        style={image}
      />
    </TouchableWithoutFeedback>
  )
}
