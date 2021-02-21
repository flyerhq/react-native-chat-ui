import { useActionSheet } from '@expo/react-native-action-sheet'
import { Chat, MessageType } from '@flyerhq/react-native-chat-ui'
import { PreviewData } from '@flyerhq/react-native-link-preview'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import FileViewer from 'react-native-file-viewer'
import ImagePicker from 'react-native-image-crop-picker'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { v4 as uuidv4 } from 'uuid'

import data from './messages.json'

const App = () => {
  const userId = '06c33e8b-e835-4736-80f4-63f44b66666c'
  const { showActionSheetWithOptions } = useActionSheet()
  const [messages, setMessages] = useState(data as MessageType.Any[])

  const handleAttachmentPress = () => {
    showActionSheetWithOptions(
      {
        options: ['Photo', 'File', 'Cancel'],
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            handleImageSelection()
            break
          case 1:
            handleFileSelection()
            break
        }
      }
    )
  }

  const addMessage = (message: MessageType.Any) => {
    setMessages([{ ...message, status: 'read' }, ...messages])
  }

  const handleFilePress = async (message: MessageType.File) => {
    try {
      await FileViewer.open(message.uri, { showOpenWithDialog: true })
    } catch {}
  }

  const handleFileSelection = async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      })
      const fileMessage: MessageType.File = {
        authorId: userId,
        id: uuidv4(),
        mimeType: response.type,
        fileName: response.name,
        size: response.size,
        timestamp: Math.floor(Date.now() / 1000),
        type: 'file',
        uri: response.uri,
      }
      addMessage(fileMessage)
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        // Handle error
      }
    }
  }

  const handleImageSelection = async () => {
    try {
      const response = await ImagePicker.openPicker({
        compressImageMaxWidth: 1440,
        includeBase64: true,
        mediaType: 'photo',
      })
      if (response.data) {
        const imageMessage: MessageType.Image = {
          authorId: userId,
          height: response.height,
          id: uuidv4(),
          imageName:
            response.filename ?? response.path?.split('/').pop() ?? '🖼',
          size: response.size,
          timestamp: Math.floor(Date.now() / 1000),
          type: 'image',
          uri: `data:${response.mime};base64,${response.data}`,
          width: response.width,
        }
        addMessage(imageMessage)
      }
    } catch {}
  }

  const handlePreviewDataFetched = ({
    message,
    previewData,
  }: {
    message: MessageType.Text
    previewData: PreviewData
  }) => {
    setMessages(
      messages.map<MessageType.Any>((m) =>
        m.id === message.id ? { ...m, previewData } : m
      )
    )
  }

  const handleSendPress = (message: MessageType.PartialText) => {
    const textMessage: MessageType.Text = {
      authorId: userId,
      id: uuidv4(),
      text: message.text,
      timestamp: Math.floor(Date.now() / 1000),
      type: 'text',
    }
    addMessage(textMessage)
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle='dark-content' />
      <Chat
        messages={messages}
        onAttachmentPress={handleAttachmentPress}
        onFilePress={handleFilePress}
        onPreviewDataFetched={handlePreviewDataFetched}
        onSendPress={handleSendPress}
        user={{ id: userId }}
      />
    </SafeAreaProvider>
  )
}

export default App
