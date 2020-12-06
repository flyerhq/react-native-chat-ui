import { oneOf } from '@flyerhq/react-native-link-preview'
import dayjs from 'dayjs'
import * as React from 'react'
import { Image, Text, View } from 'react-native'
import { MessageType } from '../../types'
import { ThemeContext, UserContext } from '../../utils'
import { CircularActivityIndicator } from '../CircularActivityIndicator'
import { FileMessage } from '../FileMessage'
import { ImageMessage } from '../ImageMessage'
import { TextMessage, TextMessageTopLevelProps } from '../TextMessage'
import styles from './styles'

export interface MessageTopLevelProps extends TextMessageTopLevelProps {
  messageTimeFormat?: string
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
}

export interface MessageProps extends MessageTopLevelProps {
  message: MessageType.Any
  messageWidth: number
  onImagePress: (url: string) => void
  previousMessageSameAuthor: boolean
  shouldRenderTime: boolean
}

export const Message = React.memo(
  ({
    message,
    messageTimeFormat = 'h:mm a',
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
    const theme = React.useContext(ThemeContext)
    const user = React.useContext(UserContext)
    const {
      container,
      contentContainer,
      status,
      statusContainer,
      time,
    } = styles({
      message,
      messageWidth,
      previousMessageSameAuthor,
      theme,
      user,
    })

    const renderMessage = React.useCallback(() => {
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
    }, [
      message,
      messageWidth,
      onFilePress,
      onImagePress,
      onPreviewDataFetched,
      renderFileMessage,
      renderImageMessage,
      renderTextMessage,
    ])

    return (
      <View style={container}>
        <View style={contentContainer}>{renderMessage()}</View>
        {shouldRenderTime && (
          <View style={statusContainer}>
            <Text style={time}>
              {dayjs.unix(message.timestamp).format(messageTimeFormat)}
            </Text>
            {user?.id === message.authorId && (
              <>
                {message.status === 'sending' && (
                  <CircularActivityIndicator
                    color={theme.colors.primary}
                    size={12}
                  />
                )}
                {(message.status === 'read' || message.status === 'sent') && (
                  <Image
                    source={
                      message.status === 'read'
                        ? require('../../assets/icon-read.png')
                        : require('../../assets/icon-sent.png')
                    }
                    style={status}
                  />
                )}
              </>
            )}
          </View>
        )}
      </View>
    )
  }
)
