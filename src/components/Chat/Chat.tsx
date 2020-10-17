import {
  useComponentSize,
  usePanResponder,
} from '@flyerhq/react-native-keyboard-accessory-view'
import * as React from 'react'
import {
  FlatList,
  FlatListProps,
  SafeAreaView,
  StatusBar,
  StatusBarProps,
  StyleSheet,
  View,
} from 'react-native'
import ImageView from 'react-native-image-viewing'
import { MessageType, User } from '../../types'
import { unwrap, UserContext } from '../../utils'
import { Input, InputAdditionalProps, InputTopLevelProps } from '../Input'
import { Message, MessageTopLevelProps } from '../Message'
import styles from './styles'

export type ChatTopLevelProps = InputTopLevelProps & MessageTopLevelProps

export interface ChatProps extends ChatTopLevelProps {
  flatListProps?: FlatListProps<MessageType.Any[]>
  inputProps?: InputAdditionalProps
  messages: MessageType.Any[]
  user: User
}

export const Chat = ({
  flatListProps,
  inputProps,
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

  // TODO: Tapping on a close button results in the next warning:
  // `An update to ImageViewing inside a test was not wrapped in act(...).`
  /* istanbul ignore next */
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
    item: message,
    index,
  }: {
    item: MessageType.Any
    index: number
  }) => {
    const messageWidth = Math.floor(Math.min(size.width * 0.77, 440))
    const previousMessageSameAuthor =
      messages[index - 1]?.authorId === message.authorId

    return (
      <Message
        {...{
          message,
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
          automaticallyAdjustContentInsets={false}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={styles.footer}
          style={styles.list}
          {...unwrap(flatListProps)}
          contentContainerStyle={StyleSheet.flatten([
            flatListProps?.contentContainerStyle,
            { paddingTop: contentBottomInset },
          ])}
          data={messages}
          inverted
          keyboardDismissMode='interactive'
          keyExtractor={keyExtractor}
          ref={list}
          renderItem={renderItem}
          scrollIndicatorInsets={{
            ...unwrap(flatListProps?.scrollIndicatorInsets),
            top: contentBottomInset,
          }}
          {...panHandlers}
        />
        <Input
          {...{
            ...unwrap(inputProps),
            isAttachmentUploading,
            onAttachmentPress,
            onContentBottomInsetUpdate: setContentBottomInset,
            onSendPress: handleSendPress,
            panResponderPositionY: positionY,
            textInputProps,
          }}
        />
        <ImageView
          images={images}
          imageIndex={imageViewIndex}
          onRequestClose={handleRequestClose}
          visible={isImageViewVisible}
        />
      </SafeAreaView>
    </UserContext.Provider>
  )
}
