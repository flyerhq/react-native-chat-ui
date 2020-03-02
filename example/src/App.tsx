import { Chat, Message } from '@flyerhq/react-native-flyer-ui'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import data from './messages.json'

const App = () => {
  const [messages, setMessages] = useState<Message[]>(data)

  const handleSendPress = (message: Message) => {
    setMessages([message, ...messages])
  }

  return (
    <SafeAreaProvider>
      <Chat messages={messages} onSendPress={handleSendPress} />
    </SafeAreaProvider>
  )
}

export default App
