import { oneOf } from '@flyerhq/react-native-link-preview'
import dayjs from 'dayjs'
import * as React from 'react'
import { Text, View } from 'react-native'
import { MessageType } from '../../types'
import { UserContext } from '../../utils'
import { FileMessage } from '../FileMessage'
import { ImageMessage } from '../ImageMessage'
import { TextMessage, TextMessageTopLevelProps } from '../TextMessage'
import styles from './styles'

export interface MessageTopLevelProps extends TextMessageTopLevelProps {
  onFilePress?: (file: MessageType.File) => void
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
}

export interface MessageProps extends MessageTopLevelProps {
  message: MessageType.Any
  messageWidth: number
  onImagePress: (url: string) => void
  previousMessageSameAuthor: boolean
  shouldRenderTime: boolean
}

export const Message = ({
  message,
  messageWidth,
  onFilePress,
  onImagePress,
  onPreviewDataFetched,
  previousMessageSameAuthor,
  renderFileMessage,
  renderImageMessage,
  renderTextMessage,
  shouldRenderTime,
}: MessageProps) => {
  const user = React.useContext(UserContext)
  const { container, contentContainer, statusContainer, time } = styles({
    message,
    messageWidth,
    previousMessageSameAuthor,
    user,
  })

  const renderMessage = () => {
    switch (message.type) {
      case 'file':
        return oneOf(
          renderFileMessage,
          <FileMessage message={message} onPress={onFilePress} />
        )(message, messageWidth)
      case 'image':
        return oneOf(
          renderImageMessage,
          <ImageMessage
            {...{
              message,
              messageWidth,
              onPress: onImagePress,
            }}
          />
        )(message, messageWidth)
      case 'text':
        return oneOf(
          renderTextMessage,
          <TextMessage
            {...{
              message,
              messageWidth,
              onPreviewDataFetched,
            }}
          />
        )(message, messageWidth)
    }
  }

  return (
    <View style={container}>
      <View style={contentContainer}>{renderMessage()}</View>
      {shouldRenderTime && (
        <View style={statusContainer}>
          <Text style={time}>
            {dayjs.unix(message.timestamp).format('h:mm a')}
          </Text>
        </View>
      )}
    </View>
  )
}
