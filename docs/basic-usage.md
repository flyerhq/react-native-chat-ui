---
id: basic-usage
title: Basic Usage
---

You start with a `Chat` component that will render a chat. It has 3 required properties:

* `messages` - an array of messages to be rendered. Accepts any message, see [types](types). If you have your message types you will need to map those to any of the defined ones. Let us know if we need to add more message types or add more fields to the existing ones.
* `onSendPress` - a function that will have a partial text message as a parameter. See [types](types) for more info on how types are structured. From the partial text message you need to create a text message which will at least have `author`, `id`, `text` and `type: 'text'`, this is done by you because we wanted to give you more control over those values.
* `user` - a [User](types#user) object, that has only one required field - an `id`, used to determine the message author.

Below you will find a drop-in example of the chat with only text messages.

:::note

Try to write any URL, for example, `flyer.chat`, it should be unwrapped in a rich preview.

:::

:::important

All examples are in TypeScript.

:::

```ts
import { Chat, MessageType } from '@flyerhq/react-native-chat-ui'
import React, { useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'

// For the testing purposes, you should probably use https://github.com/uuidjs/uuid
const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16)
    const v = c === 'x' ? r : (r % 4) + 8
    return v.toString(16)
  })
}

const App = () => {
  const [messages, setMessages] = useState<MessageType.Any[]>([])
  const user = { id: '06c33e8b-e835-4736-80f4-63f44b66666c' }

  const addMessage = (message: MessageType.Any) => {
    setMessages([message, ...messages])
  }

  const handleSendPress = (message: MessageType.PartialText) => {
    const textMessage: MessageType.Text = {
      author: user,
      createdAt: Date.now(),
      id: uuidv4(),
      text: message.text,
      type: 'text',
    }
    addMessage(textMessage)
  }

  return (
    // Remove this provider if already registered elsewhere
    // or you have React Navigation set up
    <SafeAreaProvider>
      <Chat
        messages={messages}
        onSendPress={handleSendPress}
        user={user}
      />
    </SafeAreaProvider>
  )
}

export default App
```
