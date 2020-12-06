import * as React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { MessageType } from '../../types'
import {
  formatBytes,
  L10nContext,
  ThemeContext,
  UserContext,
} from '../../utils'
import styles from './styles'

export interface FileMessageProps {
  message: MessageType.File
  onPress?: (message: MessageType.File) => void
}

export const FileMessage = ({ message, onPress }: FileMessageProps) => {
  const l10n = React.useContext(L10nContext)
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
      accessibilityLabel={l10n.fileButtonAccessibilityLabel}
      accessibilityRole='button'
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
          <Text style={name}>{message.fileName}</Text>
          <Text style={size}>{formatBytes(message.size)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
