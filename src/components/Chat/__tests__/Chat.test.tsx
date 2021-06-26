import { fireEvent, render } from '@testing-library/react-native'
import * as React from 'react'

import {
  fileMessage,
  imageMessage,
  textMessage,
  user,
} from '../../../../jest/fixtures'
import { l10n } from '../../../l10n'
import { Chat } from '../Chat'

jest.useFakeTimers()

describe('chat', () => {
  it('renders image preview', () => {
    expect.assertions(1)
    const messages = [
      textMessage,
      imageMessage,
      fileMessage,
      {
        ...textMessage,
        createdAt: 1,
        id: 'new-uuidv4',
        status: 'delivered' as const,
      },
    ]
    const onSendPress = jest.fn()
    const { getByRole, getByText } = render(
      <Chat messages={messages} onSendPress={onSendPress} user={user} />
    )
    const button = getByRole('image').parent
    fireEvent.press(button)
    const closeButton = getByText('✕')
    expect(closeButton).toBeDefined()
  })

  it('sends a text message', () => {
    expect.assertions(1)
    const messages = [
      textMessage,
      fileMessage,
      {
        ...imageMessage,
        createdAt: 1,
      },
      {
        ...textMessage,
        createdAt: 2,
        id: 'new-uuidv4',
        status: 'sending' as const,
      },
    ]
    const onSendPress = jest.fn()
    const { getByLabelText } = render(
      <Chat
        messages={messages}
        onSendPress={onSendPress}
        textInputProps={{ defaultValue: 'text' }}
        user={user}
      />
    )
    const button = getByLabelText(l10n.en.sendButtonAccessibilityLabel)
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith({ text: 'text' })
  })

  it('opens file on a file message tap', () => {
    expect.assertions(1)
    const messages = [fileMessage, textMessage, imageMessage]
    const onSendPress = jest.fn()
    const onFilePress = jest.fn()
    const { getByLabelText } = render(
      <Chat
        onFilePress={onFilePress}
        messages={messages}
        onSendPress={onSendPress}
        user={user}
      />
    )

    const button = getByLabelText(l10n.en.fileButtonAccessibilityLabel)
    fireEvent.press(button)
    expect(onFilePress).toHaveBeenCalledWith(fileMessage)
  })

  it('renders empty chat placeholder', () => {
    expect.assertions(1)
    const messages = []
    const onSendPress = jest.fn()
    const onFilePress = jest.fn()
    const { getByText } = render(
      <Chat
        onFilePress={onFilePress}
        messages={messages}
        onSendPress={onSendPress}
        user={user}
      />
    )

    const placeholder = getByText(l10n.en.emptyChatPlaceholder)
    expect(placeholder).toBeDefined()
  })
})
