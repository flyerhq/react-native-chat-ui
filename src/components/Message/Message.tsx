import * as React from 'react'
import { View } from 'react-native'
import { MessageType, Size } from '../../types'
import { UserContext } from '../../utils'
import { FileMessage } from '../FileMessage'
import { ImageMessage } from '../ImageMessage'
import { TextMessage } from '../TextMessage'
import styles from './styles'

export interface MessageProps {
  message: MessageType.Any
  onFilePress?: (file: MessageType.File) => void
  onImagePress: (url: string) => void
  parentComponentSize: Size
  previousMessageSameAuthor: boolean
}

export const Message = ({
  message,
  onFilePress,
  onImagePress,
  parentComponentSize,
  previousMessageSameAuthor,
}: MessageProps) => {
  const user = React.useContext(UserContext)
  const messageWidth = Math.min(parentComponentSize.width * 0.77, 440)
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
        return <TextMessage message={message} />
    }
  }

  return (
    <View style={container}>
      <View style={contentContainer}>{renderMessage()}</View>
    </View>
  )
}
