import {
  useComponentSize,
  usePanResponder,
} from '@flyerhq/react-native-keyboard-accessory-view'
import * as React from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { MessageType, User } from '../../types'
import { Input, InputProps } from '../Input'
import { TextMessage } from '../TextMessage'
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

  const list = React.useRef<FlatList<MessageType.Any>>(null)

  const handleSendPress = (message: MessageType.Any) => {
    onSendPress(message)
    list.current?.scrollToOffset({
      animated: true,
      offset: -contentBottomInset,
    })
  }

  const keyExtractor = (item: MessageType.Any) => item.id

  const renderItem = ({ item }: { item: MessageType.Any }) => {
    switch (item.type) {
      case 'image':
        return null
      case 'text':
        return (
          <TextMessage message={item} parentComponentSize={size} user={user} />
        )
    }
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
        {...panHandlers}
      />
      <Input
        onAttachmentPress={onAttachmentPress}
        onContentBottomInsetUpdate={setContentBottomInset}
        onSendPress={handleSendPress}
        panResponderPositionY={positionY}
        user={user}
      />
    </SafeAreaView>
  )
}
