import * as React from 'react'
import { View } from 'react-native'
import { MessageType, Size } from '../../types'
import { UserContext } from '../../utils'
import { ImageMessage } from '../ImageMessage'
import { TextMessage } from '../TextMessage'
import styles from './styles'

export interface MessageProps {
  message: MessageType.Any
  onImagePress: (imageUrl: string) => void
  parentComponentSize: Size
  previousMessageSameAuthor: boolean
}

export const Message = ({
  message,
  onImagePress,
  parentComponentSize,
  previousMessageSameAuthor,
}: MessageProps) => {
  const user = React.useContext(UserContext)
  const { container, contentContainer } = styles({
    message,
    parentComponentSize,
    previousMessageSameAuthor,
    user,
  })

  const renderMessage = () => {
    switch (message.type) {
      case 'image':
        return <ImageMessage message={message} onPress={onImagePress} />
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
