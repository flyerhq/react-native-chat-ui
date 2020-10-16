import * as React from 'react'
import { View } from 'react-native'
import { MessageType } from '../../types'
import { UserContext } from '../../utils'
import { FileMessage } from '../FileMessage'
import { ImageMessage } from '../ImageMessage'
import { TextMessage } from '../TextMessage'
import styles from './styles'

export interface MessageTopLevelProps {
  renderFileMessage?: (
    message: MessageType.File,
    messageWidth: number
  ) => React.ReactNode
  renderImageMessage?: (
    message: MessageType.Image,
    messageWidth: number
  ) => React.ReactNode
  renderTextMessage?: (
    message: MessageType.Text,
    messageWidth: number
  ) => React.ReactNode
  onFilePress?: (file: MessageType.File) => void
}
export interface MessageAdditionalProps {
  message: MessageType.Any
  messageWidth: number
  onImagePress: (url: string) => void
  previousMessageSameAuthor: boolean
}

export type MessageProps = MessageTopLevelProps & MessageAdditionalProps

export const Message = ({
  message,
  messageWidth,
  onFilePress,
  onImagePress,
  previousMessageSameAuthor,
  renderFileMessage,
  renderImageMessage,
  renderTextMessage,
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
        return renderFileMessage ? (
          renderFileMessage(message, messageWidth)
        ) : (
          <FileMessage message={message} onPress={onFilePress} />
        )
      case 'image':
        return renderImageMessage ? (
          renderImageMessage(message, messageWidth)
        ) : (
          <ImageMessage
            message={message}
            messageWidth={messageWidth}
            onPress={onImagePress}
          />
        )
      case 'text':
        return renderTextMessage ? (
          renderTextMessage(message, messageWidth)
        ) : (
          <TextMessage message={message} messageWidth={messageWidth} />
        )
    }
  }

  return (
    <View style={container}>
      <View style={contentContainer}>{renderMessage()}</View>
    </View>
  )
}
