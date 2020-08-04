import * as React from 'react'
import { View } from 'react-native'
import { MessageType, Size, User } from '../../types'
import { ImageMessage } from '../ImageMessage'
import { TextMessage } from '../TextMessage'
import styles from './styles'

export interface MessageProps {
  message: MessageType.Any
  parentComponentSize: Size
  previousMessageSameAuthor: boolean
  user: User
}

export const Message = ({
  message,
  parentComponentSize,
  previousMessageSameAuthor,
  user,
}: MessageProps) => {
  const { container, contentContainer } = styles({
    message,
    parentComponentSize,
    previousMessageSameAuthor,
    user,
  })

  const renderMessage = () => {
    switch (message.type) {
      case 'image':
        return <ImageMessage message={message} />
      case 'text':
        return <TextMessage message={message} user={user} />
    }
  }

  return (
    <View style={container}>
      <View style={contentContainer}>{renderMessage()}</View>
    </View>
  )
}
