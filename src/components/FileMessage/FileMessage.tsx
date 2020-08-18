import * as React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { MessageType } from '../../types'
import { formatBytes, UserContext } from '../../utils'
import styles from './styles'

export interface FileMessageProps {
  message: MessageType.File
  onPress?: (file: MessageType.File) => void
}

export const FileMessage = ({ message, onPress }: FileMessageProps) => {
  const user = React.useContext(UserContext)
  const {
    container,
    image,
    imageContainer,
    textContainer,
    title,
    size,
  } = styles({
    message,
    user,
  })

  const handlePress = () => {
    onPress?.(message)
  }

  return (
    <View style={container}>
      <View style={imageContainer}>
        <Image
          source={require('../../assets/icon-document.png')}
          style={image}
        />
      </View>
      <View style={textContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Text accessibilityRole='text' style={title}>
            {message.fileName}
          </Text>
        </TouchableOpacity>
        <Text style={size}>{formatBytes(message.size)}</Text>
      </View>
    </View>
  )
}
