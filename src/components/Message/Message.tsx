import { oneOf } from '@flyerhq/react-native-link-preview'
import * as React from 'react'
import { Pressable, Text, View } from 'react-native'

import { MessageType } from '../../types'
import {
  excludeDerivedMessageProps,
  ThemeContext,
  UserContext,
} from '../../utils'
import { Avatar } from '../Avatar'
import { FileMessage } from '../FileMessage'
import { ImageMessage } from '../ImageMessage'
import { StatusIcon } from '../StatusIcon'
import { TextMessage, TextMessageTopLevelProps } from '../TextMessage'
import styles from './styles'

export interface MessageTopLevelProps extends TextMessageTopLevelProps {
  onMessageLongPress?: (message: MessageType.Any) => void
  onMessagePress?: (message: MessageType.Any) => void
  renderCustomMessage?: (
    message: MessageType.Custom,
    messageWidth: number
  ) => React.ReactNode
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
  showUserAvatars?: boolean
}

export interface MessageProps extends MessageTopLevelProps {
  enableAnimation?: boolean
  message: MessageType.DerivedAny
  messageWidth: number
  roundBorder: boolean
  showAvatar: boolean
  showName: boolean
  showStatus: boolean
}

export const Message = React.memo(
  ({
    enableAnimation,
    message,
    messageWidth,
    onMessagePress,
    onMessageLongPress,
    onPreviewDataFetched,
    renderCustomMessage,
    renderFileMessage,
    renderImageMessage,
    renderTextMessage,
    roundBorder,
    showAvatar,
    showName,
    showStatus,
    showUserAvatars,
    usePreviewData,
  }: MessageProps) => {
    const theme = React.useContext(ThemeContext)
    const user = React.useContext(UserContext)

    const currentUserIsAuthor =
      message.type !== 'dateHeader' && user?.id === message.author.id

    const { container, contentContainer, dateHeader } = styles({
      currentUserIsAuthor,
      message,
      messageWidth,
      roundBorder,
      theme,
    })

    if (message.type === 'dateHeader') {
      return (
        <View style={dateHeader}>
          <Text style={theme.fonts.dateDividerTextStyle}>{message.text}</Text>
        </View>
      )
    }

    const renderMessage = () => {
      switch (message.type) {
        case 'custom':
          return (
            renderCustomMessage?.(
              // It's okay to cast here since we checked message type above
              // type-coverage:ignore-next-line
              excludeDerivedMessageProps(message) as MessageType.Custom,
              messageWidth
            ) ?? null
          )
        case 'file':
          return oneOf(renderFileMessage, <FileMessage message={message} />)(
            message,
            messageWidth
          )
        case 'image':
          return oneOf(
            renderImageMessage,
            <ImageMessage
              {...{
                message,
                messageWidth,
              }}
            />
          )(message, messageWidth)
        case 'text':
          return oneOf(
            renderTextMessage,
            <TextMessage
              {...{
                enableAnimation,
                message,
                messageWidth,
                onPreviewDataFetched,
                showName,
                usePreviewData,
              }}
            />
          )(message, messageWidth)
        default:
          return null
      }
    }

    return (
      <View style={container}>
        <Avatar
          {...{
            author: message.author,
            currentUserIsAuthor,
            showAvatar,
            showUserAvatars,
            theme,
          }}
        />
        <Pressable
          onLongPress={() =>
            onMessageLongPress?.(excludeDerivedMessageProps(message))
          }
          onPress={() => onMessagePress?.(excludeDerivedMessageProps(message))}
          style={contentContainer}
          testID='ContentContainer'
        >
          {renderMessage()}
        </Pressable>
        <StatusIcon
          {...{
            currentUserIsAuthor,
            showStatus,
            status: message.status,
            theme,
          }}
        />
      </View>
    )
  }
)
