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
  user: User
}

export const Chat = ({
  messages,
  onAttachmentPress,
  onFilePress,
  onSendPress,
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
        onFilePress={onFilePress}
        onImagePress={(url) => {
          setImageViewIndex(images.findIndex((image) => image.uri === url))
          setIsImageViewVisible(true)
          setStackEntry(
            StatusBar.pushStackEntry({
              barStyle: 'light-content',
              animated: true,
            })
          )
        }}
        parentComponentSize={size}
        previousMessageSameAuthor={previousMessageSameAuthor}
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
          onAttachmentPress={onAttachmentPress}
          onContentBottomInsetUpdate={setContentBottomInset}
          onSendPress={handleSendPress}
          panResponderPositionY={positionY}
          textInputProps={textInputProps}
        />
        <ImageView
          images={images}
          imageIndex={imageViewIndex}
          // TODO: Tapping on a close button results in the next warning:
          // `An update to ImageViewing inside a test was not wrapped in act(...).`
          onRequestClose={
            /* istanbul ignore next */ () => {
              setIsImageViewVisible(false)
              StatusBar.popStackEntry(stackEntry)
            }
          }
          visible={isImageViewVisible}
        />
      </SafeAreaView>
    </UserContext.Provider>
  )
}
