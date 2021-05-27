import { oneOf } from '@flyerhq/react-native-link-preview'
import dayjs from 'dayjs'
import * as React from 'react'
import { Image, ImageSourcePropType, Pressable, Text, View } from 'react-native'

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
  onImagePress: (uri: string) => void
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
    removeMessage,
  }: MessageProps) => {
    const theme = React.useContext(ThemeContext)
    const user = React.useContext(UserContext)
    const { container, contentContainer, status, statusContainer, time } =
      styles({
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

    const readIcon: ImageSourcePropType =
      theme.icons?.readIcon ?? require('../../assets/icon-read.png')

    const deliveredIcon: ImageSourcePropType =
      theme.icons?.deliveredIcon ?? require('../../assets/icon-delivered.png')

    return (
      <Pressable style={container} onPress={() => removeMessage(message.id)}>
        <View style={contentContainer}>{renderMessage()}</View>
        {shouldRenderTime && (
          <View style={statusContainer}>
            <Text style={time}>
              {/* `shouldRenderTime` will only be true if timestamp exists, so we can safely force unwrap it */}
              {/* type-coverage:ignore-next-line */}
              {dayjs.unix(message.timestamp!).format(messageTimeFormat)}
            </Text>
            {user?.id === message.authorId && (
              <>
                {message.status === 'sending' && (
                  <CircularActivityIndicator
                    color={theme.colors.primary}
                    size={12}
                  />
                )}
                {(message.status === 'read' ||
                  message.status === 'delivered') && (
                  <Image
                    source={
                      message.status === 'read' ? readIcon : deliveredIcon
                    }
                    style={status}
                  />
                )}
              </>
            )}
          </View>
        )}
      </Pressable>
    )
  }
)
