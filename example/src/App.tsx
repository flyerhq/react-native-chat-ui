import { useActionSheet } from '@expo/react-native-action-sheet'
import {
  Chat,
  MessageType,
  SendAttachmentCallback,
} from '@flyerhq/react-native-chat-ui'
import { PreviewData } from '@flyerhq/react-native-link-preview'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import FileViewer from 'react-native-file-viewer'
import ImagePicker from 'react-native-image-crop-picker'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import data from './messages.json'

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
        fileName: response.name,
        size: response.size,
        url: response.uri,
      })
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        // Handle error
      }
    }
  }

  const handleImageSelection = async (
    sendAttachment: SendAttachmentCallback
  ) => {
    try {
      const response = await ImagePicker.openPicker({
        compressImageMaxWidth: 1440,
        includeBase64: true,
        mediaType: 'photo',
      })
      if (response.data) {
        sendAttachment({
          height: response.height,
          imageName:
            response.filename ?? response.path?.split('/').pop() ?? '🖼',
          size: response.size,
          url: `data:${response.mime};base64,${response.data}`,
          width: response.width,
        })
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

  const handleSendPress = (message: MessageType.Any) => {
    setMessages([{ ...message, status: 'read' }, ...messages])
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
        user={{
          id: '06c33e8b-e835-4736-80f4-63f44b66666c',
          name: 'Alex',
        }}
      />
    </SafeAreaProvider>
  )
}

export default App
