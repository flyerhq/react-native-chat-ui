import { useActionSheet } from '@expo/react-native-action-sheet'
import {
  Chat,
  MessageType,
  SendAttachmentCallback,
} from '@flyerhq/react-native-chat-ui'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import FileViewer from 'react-native-file-viewer'
import ImagePicker from 'react-native-image-picker'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import data from './messages.json'
import users from './users.json'

const App = () => {
  const [messages, setMessages] = useState(data as MessageType.Any[])
  const { showActionSheetWithOptions } = useActionSheet()

  const handleAttachmentPress = (sendAttachment: SendAttachmentCallback) => {
    showActionSheetWithOptions(
      {
        options: ['Photo', 'File', 'Cancel'],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            handleImageSelection(sendAttachment)
            break
          case 1:
            handleFileSelection(sendAttachment)
            break
        }
      }
    )
  }

  const handleFilePress = async (file: MessageType.File) => {
    try {
      await FileViewer.open(file.url, { showOpenWithDialog: true })
    } catch {}
  }

  const handleFileSelection = async (
    sendAttachment: SendAttachmentCallback
  ) => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      })
      sendAttachment({
        mimeType: response.type,
        name: response.name,
        size: response.size,
        url: response.uri,
      })
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        // Handle error
      }
    }
  }

  const handleImageSelection = (sendAttachment: SendAttachmentCallback) => {
    ImagePicker.showImagePicker(
      { maxWidth: 1440, quality: 0.7 },
      (response) => {
        if (response.data) {
          sendAttachment({
            height: response.height,
            url: 'data:image/jpeg;base64,' + response.data,
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
        onFilePress={handleFilePress}
        onSendPress={handleSendPress}
        user={users[0]}
      />
    </SafeAreaProvider>
  )
}

export default App
