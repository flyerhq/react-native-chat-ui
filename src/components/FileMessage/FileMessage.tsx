import * as React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { MessageType } from '../../types'
import { formatBytes, ThemeContext, UserContext } from '../../utils'
import styles from './styles'

export interface FileMessageProps {
  message: MessageType.File
  onPress?: (file: MessageType.File) => void
}

export const FileMessage = ({ message, onPress }: FileMessageProps) => {
  const theme = React.useContext(ThemeContext)
  const user = React.useContext(UserContext)
  const { container, icon, iconContainer, name, size, textContainer } = styles({
    message,
    theme,
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
          <Image
            source={require('../../assets/icon-document.png')}
            style={icon}
          />
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
