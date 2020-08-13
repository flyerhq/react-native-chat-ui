import {
  ActionSheetOptions,
  ActionSheetProvider,
  connectActionSheet,
  useActionSheet,
} from '@expo/react-native-action-sheet'
import { Chat, MessageType, SendCallback } from '@flyerhq/react-native-chat-ui'
import React, { useState } from 'react'
import { StatusBar } from 'react-native'
import DocumentPicker from 'react-native-document-picker'
import ImagePicker from 'react-native-image-picker'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import data from './messages.json'
import users from './users.json'

const App = () => {
  const [messages, setMessages] = useState(data as MessageType.Any[])
  const { showActionSheetWithOptions } = useActionSheet()
  const options: ActionSheetOptions = {
    options: ['Photo', 'File', 'Cancel'],
    cancelButtonIndex: 2,
  }

  const handleAttachmentPress = (send: SendCallback) => {
    showActionSheetWithOptions(options, (buttonIndex: number) => {
      // Do something here depending on the button index selected
      onSelection(buttonIndex, send)
    })
  }

  const onSelection = async (buttonIndex: number, send: SendCallback) => {
    switch (buttonIndex) {
      case 0:
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
        break

      case 1:
        try {
          const response = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
          })
          send({
            fileName: response.name,
            fileUrl: response.uri,
            size: response.size,
          })
          console.log(
            response.uri,
            response.type, // mime type
            response.name,
            response.size // bytes
          )
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
          } else {
            // handle error here
          }
        }
        break

      default:
        break
    }
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

const ConnectedApp = connectActionSheet(App)

const AppContainer = () => {
  return (
    <ActionSheetProvider>
      <ConnectedApp />
    </ActionSheetProvider>
  )
}

export default AppContainer
