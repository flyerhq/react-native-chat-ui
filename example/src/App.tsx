import {
  Chat,
  MessageType,
  SendImageCallback,
} from '@flyerhq/react-native-chat-ui'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import data from './messages.json'
import users from './users.json'

const App = () => {
  const [messages, setMessages] = useState(data as MessageType.Any[])

  const handleAttachmentPress = (send: SendImageCallback) => {
    ImagePicker.showImagePicker(
      { maxWidth: 1440, quality: 0.7 },
      (response) => {
        if (response.data) {
          send({
            height: response.height,
            imageUrl: 'data:image/jpeg;base64,' + response.data,
            width: response.width,
          })
        }
      }
    )
  }

  const handleSendPress = (message: MessageType.Any) => {
    setMessages([message, ...messages])
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle='dark-content' />
      <Chat
        messages={messages}
        onAttachmentPress={handleAttachmentPress}
        onSendPress={handleSendPress}
        user={users[0]}
      />
    </SafeAreaProvider>
  )
}

export default App
