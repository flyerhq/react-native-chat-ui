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
  const { container, iconContainer, name, size, textContainer } = styles({
    message,
    user,
  })

  const handlePress = () => onPress?.(message)

  return (
    <TouchableOpacity
      accessibilityRole='button'
      accessibilityLabel='Open a file'
      onPress={handlePress}
    >
      <View style={container}>
        <View style={iconContainer}>
          <Image source={require('../../assets/icon-document.png')} />
        </View>
        <View style={textContainer}>
          <Text accessibilityRole='text' style={name}>
            {message.fileName}
          </Text>
          <Text style={size}>{formatBytes(message.size)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
