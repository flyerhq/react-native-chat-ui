import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import { getTextSizeInBytes, Input } from 'react-native-flyer-ui'

const App = () => {
  const [messages, setMessages] = useState<string[]>([])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: '#fff' }}
        keyboardDismissMode='interactive'
      >
        {messages.map((message, index) => (
          <Text style={{ paddingHorizontal: 20, paddingBottom: 8 }} key={index}>
            {message}
            {getTextSizeInBytes(message)}
          </Text>
        ))}
      </ScrollView>
      <Input onSendPress={message => setMessages([...messages, message])} />
    </SafeAreaView>
  )
}

export default App
