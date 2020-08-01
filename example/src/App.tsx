import { Chat, MessageType } from '@flyerhq/react-native-chat-ui'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import data from './messages.json'
import users from './users.json'

const App = () => {
  const [messages, setMessages] = useState(data as MessageType.Any[])

  const handleSendPress = (message: MessageType.Any) => {
    setMessages([message, ...messages])
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle='dark-content' />
      <Chat messages={messages} onSendPress={handleSendPress} user={users[0]} />
    </SafeAreaProvider>
  )
}

export default App
