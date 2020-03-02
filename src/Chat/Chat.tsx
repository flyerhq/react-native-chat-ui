import * as React from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import { useKeyboardBottomInset } from '../hooks'
import { Input, InputProps } from '../Input'
import { TextMessage } from '../TextMessage'
import { Message } from '../types'
import styles from './styles'

export interface ChatProps extends InputProps {
  messages: Message[]
}

export const Chat = ({ messages, onSendPress }: ChatProps) => {
  const { bottomInset } = useKeyboardBottomInset()

  const list = React.useRef<FlatList<Message>>(null)

  const handleSendPress = (message: Message) => {
    onSendPress(message)
    list.current?.scrollToOffset({ animated: true, offset: -bottomInset })
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={list}
        contentContainerStyle={{ paddingTop: bottomInset }}
        style={styles.list}
        data={messages}
        renderItem={({ item }) => <TextMessage text={item.text} />}
        automaticallyAdjustContentInsets={false}
        inverted
        keyboardDismissMode='interactive'
        keyExtractor={item => item.id}
        scrollIndicatorInsets={{ top: bottomInset }}
      />
      <Input onSendPress={handleSendPress} />
    </SafeAreaView>
  )
}
