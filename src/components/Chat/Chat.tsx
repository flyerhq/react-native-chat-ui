import {
  useComponentSize,
  usePanResponder,
} from '@flyerhq/react-native-keyboard-accessory-view'
import * as React from 'react'
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StatusBarProps,
  View,
} from 'react-native'
import ImageView from 'react-native-image-viewing'
import { MessageType, User } from '../../types'
import { UserContext } from '../../utils'
import { Input, InputProps } from '../Input'
import { Message } from '../Message'
import styles from './styles'

export interface ChatProps extends InputProps {
  messages: MessageType.Any[]
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
  user: User
}

export const Chat = ({
  isAttachmentUploading,
  messages,
  onAttachmentPress,
  onFilePress,
  onSendPress,
  renderFileMessage,
  renderImageMessage,
  renderTextMessage,
  textInputProps,
  user,
}: ChatProps) => {
  const { onLayout, size } = useComponentSize()
  const { panHandlers, positionY } = usePanResponder()
  const [contentBottomInset, setContentBottomInset] = React.useState(0)
  const [isImageViewVisible, setIsImageViewVisible] = React.useState(false)
  const [imageViewIndex, setImageViewIndex] = React.useState(0)
  const [stackEntry, setStackEntry] = React.useState<StatusBarProps>({})
  const images = messages
    .filter((message): message is MessageType.Image => message.type === 'image')
    .map((message) => ({ uri: message.url }))
    .reverse()

  const list = React.useRef<FlatList<MessageType.Any>>(null)

  const handleImagePress = (url: string) => {
    setImageViewIndex(images.findIndex((image) => image.uri === url))
    setIsImageViewVisible(true)
    setStackEntry(
      StatusBar.pushStackEntry({
        barStyle: 'light-content',
        animated: true,
      })
    )
  }

  const handleRequestClose = () => {
    setIsImageViewVisible(false)
    StatusBar.popStackEntry(stackEntry)
  }

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
    const messageWidth = Math.floor(Math.min(size.width * 0.77, 440))
    const previousMessageSameAuthor =
      messages[index - 1]?.authorId === item.authorId

    return (
      <Message
        {...{
          message: item,
          messageWidth,
          onFilePress,
          onImagePress: handleImagePress,
          previousMessageSameAuthor,
          renderFileMessage,
          renderImageMessage,
          renderTextMessage,
        }}
      />
    )
  }

  return (
    <UserContext.Provider value={user}>
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
          {...{
            isAttachmentUploading,
            onAttachmentPress,
            onContentBottomInsetUpdate: setContentBottomInset,
            onSendPress: handleSendPress,
            panResponderPositionY: positionY,
            textInputProps,
          }}
        />
        <ImageView
          {...{
            images,
            imageIndex: imageViewIndex,
            // TODO: Tapping on a close button results in the next warning:
            // `An update to ImageViewing inside a test was not wrapped in act(...).`
            onRequestClose: handleRequestClose,
            visible: isImageViewVisible,
          }}
        />
      </SafeAreaView>
    </UserContext.Provider>
  )
}
