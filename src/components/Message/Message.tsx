import { oneOf } from '@flyerhq/react-native-link-preview'
import * as React from 'react'
import { Pressable, Text, View } from 'react-native'

import { MessageType } from '../../types'
import { ThemeContext, UserContext } from '../../utils'
import { Avatar } from '../Avatar'
import { FileMessage } from '../FileMessage'
import { ImageMessage } from '../ImageMessage'
import { ImageStatusIcon } from '../ImageStatusIcon'
import { TextMessage, TextMessageTopLevelProps } from '../TextMessage'
import styles from './styles'

export interface MessageTopLevelProps
  extends TextMessageTopLevelProps<MessageType.CalculatedText> {
  onFilePress?: (message: MessageType.File) => void

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
  renderCustomMessage?: (
    message: MessageType.Text,
    messageWidth: number
  ) => React.ReactNode
}

export interface MessageProps<T> extends MessageTopLevelProps {
  buildCustomMessage?: (message: T) => React.ReactNode
  disableImageGallery?: boolean
  message: T
  messageWidth: number
  onImagePress: (uri: string) => void
  onMessageLongPress?: (message: MessageType.Derived) => void
  onMessagePress?: (message: MessageType.Derived) => void
  showAvatar: boolean
}

export const Message = React.memo(
  ({
    buildCustomMessage,
    disableImageGallery,
    message,
    messageWidth,
    onFilePress,
    onImagePress,
    onMessagePress,
    onMessageLongPress,
    onPreviewDataFetched,
    renderFileMessage,
    renderImageMessage,
    renderTextMessage,
    showAvatar,
  }: MessageProps<MessageType.Derived>) => {
    const theme = React.useContext(ThemeContext)
    const user = React.useContext(UserContext)

    const currentUserIsAuthor =
      message.type !== 'dateHeader' && user?.id === message.author.id

    const { container, contentContainer, dateDivider, dateHeader, status } =
      styles({
        message,
        messageWidth,
        theme,
        currentUserIsAuthor,
      })

    if (message.type === 'dateHeader') {
      return (
        <View style={dateHeader}>
          <Text style={dateDivider}>{message.text}</Text>
        </View>
      )
    }

    const renderMessage = () => {
      switch (message.type) {
        case 'custom':
          return buildCustomMessage?.(message) ?? undefined
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
                onPress: !disableImageGallery ? onImagePress : undefined,
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
        default:
          return
      }
    }

    return (
      <View style={container}>
        <Avatar author={message.author} showAvatar={showAvatar} />
        <Pressable
          testID='ContentContainer'
          style={contentContainer}
          onPress={() => onMessagePress?.(message)}
          onLongPress={() => onMessageLongPress?.(message)}
        >
          {renderMessage()}
        </Pressable>
        <ImageStatusIcon
          {...{
            currentUserIsAuthor,
            status: message.status,
            style: status,
            theme,
          }}
        />
      </View>
    )
  }
)
