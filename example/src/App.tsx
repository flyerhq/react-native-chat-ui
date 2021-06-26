import { useActionSheet } from '@expo/react-native-action-sheet'
import { Chat, MessageType } from '@flyerhq/react-native-chat-ui'
import { PreviewData } from '@flyerhq/react-native-link-preview'
import React, { useState } from 'react'
import DocumentPicker from 'react-native-document-picker'
import FileViewer from 'react-native-file-viewer'
import { launchImageLibrary } from 'react-native-image-picker'
import { v4 as uuidv4 } from 'uuid'

import data from './messages.json'

const App = () => {
  const userId = '06c33e8b-e835-4736-80f4-63f44b66666c'
  const { showActionSheetWithOptions } = useActionSheet()
  const [messages, setMessages] = useState(data as MessageType.Any[])

  const addMessage = (message: MessageType.Any) => {
    setMessages([{ ...message, status: 'seen' }, ...messages])
  }

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
        author: {
          id: userId,
        },
        name: response.name,
        id: uuidv4(),
        mimeType: response.type,
        size: response.size,
        createdAt: Date.now(),
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

  const handleImageSelection = () => {
    launchImageLibrary(
      {
        includeBase64: true,
        maxWidth: 1440,
        mediaType: 'photo',
        quality: 0.7,
      },
      ({ assets }) => {
        const response = assets?.[0]

        if (response?.base64) {
          const imageMessage: MessageType.Image = {
            author: {
              id: userId,
            },
            height: response.height,
            id: uuidv4(),
            name: response.fileName ?? response.uri?.split('/').pop() ?? '🖼',
            size: response.fileSize ?? 0,
            createdAt: Date.now(),
            type: 'image',
            uri: `data:image/*;base64,${response.base64}`,
            width: response.width,
          }
          addMessage(imageMessage)
        }
      }
    )
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
      author: {
        id: userId,
      },
      id: uuidv4(),
      text: message.text,
      createdAt: Date.now(),
      type: 'text',
    }
    addMessage(textMessage)
  }

  return (
    <Chat
      messages={messages}
      onAttachmentPress={handleAttachmentPress}
      onFilePress={handleFilePress}
      onPreviewDataFetched={handlePreviewDataFetched}
      onSendPress={handleSendPress}
      user={{ id: userId, createdAt: 1624699019364 }}
    />
  )
}

export default App
