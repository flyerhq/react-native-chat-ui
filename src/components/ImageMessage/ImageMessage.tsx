import * as React from 'react'
import {
  Image,
  ImageBackground,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import { MessageType, Size } from '../../types'
import { formatBytes, ThemeContext, UserContext } from '../../utils'
import styles from './styles'

export interface ImageMessageProps {
  message: MessageType.DerivedImage
  messageWidth: number
  onPress?: (uri: string) => void
}

export const ImageMessage = ({
  message,
  messageWidth,
  onPress,
}: ImageMessageProps) => {
  const theme = React.useContext(ThemeContext)
  const user = React.useContext(UserContext)
  const defaultHeight = message.height ?? 0
  const defaultWidth = message.width ?? 0
  const [size, setSize] = React.useState<Size>({
    height: defaultHeight,
    width: defaultWidth,
  })
  const aspectRatio = size.width / (size.height || 1)
  const isMinimized = aspectRatio < 0.1 || aspectRatio > 10
  const {
    image,
    minimizedImage,
    minimizedImageContainer,
    nameText,
    sizeText,
    textContainer,
  } = styles({
    aspectRatio,
    message,
    messageWidth,
    theme,
    user,
  })

  React.useEffect(() => {
    if (defaultHeight <= 0 || defaultWidth <= 0)
      Image.getSize(
        message.uri,
        (width, height) => setSize({ height, width }),
        () => setSize({ height: 0, width: 0 })
      )
  }, [defaultHeight, defaultWidth, message.uri])

  const handlePress = () => onPress?.(message.uri)

  const renderImage = () => {
    return (
      <Image
        accessibilityRole='image'
        resizeMode={isMinimized ? 'cover' : 'contain'}
        source={{ uri: message.uri }}
        style={isMinimized ? minimizedImage : image}
      />
    )
  }

  return isMinimized ? (
    <View style={minimizedImageContainer}>
      <TouchableWithoutFeedback onPress={handlePress}>
        {renderImage()}
      </TouchableWithoutFeedback>
      <View style={textContainer}>
        <Text style={nameText}>{message.name}</Text>
        <Text style={sizeText}>{formatBytes(message.size)}</Text>
      </View>
    </View>
  ) : (
    <ImageBackground blurRadius={26} source={{ uri: message.uri }} style={{}}>
      <TouchableWithoutFeedback onPress={handlePress}>
        {renderImage()}
      </TouchableWithoutFeedback>
    </ImageBackground>
  )
}
