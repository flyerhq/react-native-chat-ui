import * as React from 'react'
import { Image, ImageBackground, TouchableWithoutFeedback } from 'react-native'
import { MessageType, Size } from '../../types'
import styles from './styles'

export interface ImageMessageProps {
  message: MessageType.Image
  messageWidth: number
  onPress: (url: string) => void
}

export const ImageMessage = ({
  message,
  messageWidth,
  onPress,
}: ImageMessageProps) => {
  const defaultHeight = message.height ?? 0
  const defaultWidth = message.width ?? 0
  const [size, setSize] = React.useState<Size>({
    height: defaultHeight,
    width: defaultWidth,
  })
  const aspectRatio = size.height > 0 ? size.width / size.height : 1
  const isMinimized = aspectRatio < 0.1 || aspectRatio > 10
  const { background, image, minimizedImage } = styles({
    aspectRatio,
    messageWidth,
  })

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

  const renderImage = () => {
    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <Image
          accessibilityRole='image'
          resizeMode={isMinimized ? 'cover' : 'contain'}
          source={{ uri: message.url }}
          style={isMinimized ? minimizedImage : image}
        />
      </TouchableWithoutFeedback>
    )
  }

  return isMinimized ? (
    renderImage()
  ) : (
    <ImageBackground
      blurRadius={26}
      source={{ uri: message.url }}
      style={background}
    >
      {renderImage()}
    </ImageBackground>
  )
}
