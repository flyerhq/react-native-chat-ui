import * as React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { MessageType } from '../../types'
import { UserContext } from '../../utils'
import styles from './styles'

export interface FileMessageProps {
  message: MessageType.File
  onPress: (fileUrl: string) => void
}

export const FileMessage = ({ message, onPress }: FileMessageProps) => {
  const user = React.useContext(UserContext)
  const { text } = styles({
    message,
    user,
  })

  const handlePress = () => {
    onPress(message.fileUrl)
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={text}>{message.fileName}</Text>
    </TouchableOpacity>
  )
}
