import * as React from 'react'
import { View } from 'react-native'
import { MessageType } from '../../types'
import { UserContext } from '../../utils'
import { FileMessage } from '../FileMessage'
import { ImageMessage } from '../ImageMessage'
import { TextMessage } from '../TextMessage'
import styles from './styles'

export interface MessageProps {
  message: MessageType.Any
  messageWidth: number
  onFilePress?: (file: MessageType.File) => void
  onImagePress: (url: string) => void
  previousMessageSameAuthor: boolean
}

export const Message = ({
  message,
  messageWidth,
  onFilePress,
  onImagePress,
  previousMessageSameAuthor,
}: MessageProps) => {
  const user = React.useContext(UserContext)
  const { container, contentContainer } = styles({
    message,
    messageWidth,
    previousMessageSameAuthor,
    user,
  })

  const renderMessage = () => {
    switch (message.type) {
      case 'file':
        return <FileMessage message={message} onPress={onFilePress} />
      case 'image':
        return (
          <ImageMessage
            message={message}
            messageWidth={messageWidth}
            onPress={onImagePress}
          />
        )
      case 'text':
        return <TextMessage message={message} messageWidth={messageWidth} />
    }
  }

  return (
    <View style={container}>
      <View style={contentContainer}>{renderMessage()}</View>
    </View>
  )
}
