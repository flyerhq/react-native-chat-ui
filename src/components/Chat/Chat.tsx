import * as React from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { useComponentSize, useKeyboardBottomInset } from '../../hooks'
import { Message, User } from '../../types'
import { Input, InputProps } from '../Input'
import { TextMessage } from '../TextMessage'
import styles from './styles'

export interface ChatProps extends InputProps {
  messages: Message[]
  user: User
}

export const Chat = ({ messages, onSendPress, user }: ChatProps) => {
  const { onLayout, size } = useComponentSize()
  const { bottomInset } = useKeyboardBottomInset()

  const list = React.useRef<FlatList<Message>>(null)

  const handleSendPress = (message: Message) => {
    onSendPress(message)
    list.current?.scrollToOffset({ animated: true, offset: -bottomInset })
  }

  const keyExtractor = (item: Message) => item.id

  const renderItem = ({ item }: { item: Message }) => (
    <TextMessage message={item} parentComponentSize={size} user={user} />
  )

  return (
    <SafeAreaView style={styles.container} onLayout={onLayout}>
      <FlatList
        ref={list}
        contentContainerStyle={{ paddingTop: bottomInset }}
        style={styles.list}
        data={messages}
        renderItem={renderItem}
        automaticallyAdjustContentInsets={false}
        inverted
        keyboardDismissMode='interactive'
        keyExtractor={keyExtractor}
        scrollIndicatorInsets={{ top: bottomInset }}
      />
      <Input onSendPress={handleSendPress} user={user} />
    </SafeAreaView>
  )
}
