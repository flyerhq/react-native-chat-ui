import {
  useComponentSize,
  usePanResponder,
} from '@flyerhq/react-native-keyboard-accessory-view'
import * as React from 'react'
import { FlatList, SafeAreaView, StatusBar, View } from 'react-native'
import ImageView from 'react-native-image-viewing'
import { MessageType, User } from '../../types'
import { Input, InputProps } from '../Input'
import { Message } from '../Message'
import styles from './styles'

export interface ChatProps extends InputProps {
  messages: MessageType.Any[]
  user: User
}

export const Chat = ({
  messages,
  onAttachmentPress,
  onSendPress,
  user,
}: ChatProps) => {
  const { onLayout, size } = useComponentSize()
  const { panHandlers, positionY } = usePanResponder()
  const [contentBottomInset, setContentBottomInset] = React.useState(0)
  const [isImageViewVisible, setIsImageViewVisible] = React.useState(false)
  const [imageViewIndex, setImageViewIndex] = React.useState(0)
  const images = messages
    .filter((message) => message.type === 'image')
    .map((message) => ({
      uri: message.type === 'image' ? message.imageUrl : undefined,
    }))
    .reverse()

  const list = React.useRef<FlatList<MessageType.Any>>(null)

  const handleSendPress = (message: MessageType.Any) => {
    onSendPress(message)
    list.current?.scrollToOffset({
      animated: true,
      offset: -contentBottomInset,
    })
  }

  const keyExtractor = (item: MessageType.Any) => item.id

  const renderItem = ({
    item,
    index,
  }: {
    item: MessageType.Any
    index: number
  }) => {
    const previousMessageSameAuthor =
      messages[index - 1]?.authorId === item.authorId

    return (
      <Message
        message={item}
        onImagePress={(imageUrl) => {
          setImageViewIndex(images.findIndex((image) => image.uri === imageUrl))
          setIsImageViewVisible(true)
          StatusBar.setHidden(true, 'slide')
        }}
        parentComponentSize={size}
        previousMessageSameAuthor={previousMessageSameAuthor}
        user={user}
      />
    )
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayout}>
      <FlatList
        ref={list}
        contentContainerStyle={{ paddingTop: contentBottomInset }}
        style={styles.list}
        data={messages}
        renderItem={renderItem}
        automaticallyAdjustContentInsets={false}
        inverted
        keyboardDismissMode='interactive'
        keyExtractor={keyExtractor}
        scrollIndicatorInsets={{ top: contentBottomInset }}
        ListFooterComponent={<View />}
        ListFooterComponentStyle={styles.footer}
        {...panHandlers}
      />
      <Input
        onAttachmentPress={onAttachmentPress}
        onContentBottomInsetUpdate={setContentBottomInset}
        onSendPress={handleSendPress}
        panResponderPositionY={positionY}
        user={user}
      />
      <ImageView
        images={images}
        imageIndex={imageViewIndex}
        onRequestClose={() => {
          setIsImageViewVisible(false)
          StatusBar.setHidden(false, 'slide')
        }}
        visible={isImageViewVisible}
      />
    </SafeAreaView>
  )
}
