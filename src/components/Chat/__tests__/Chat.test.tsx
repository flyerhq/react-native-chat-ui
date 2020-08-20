import { fireEvent, render, waitFor } from '@testing-library/react-native'
import * as React from 'react'
import {
  fileMessage,
  imageMessage,
  textMessage,
  user,
} from '../../../../jest/fixtures'
import { Chat } from '../Chat'

describe('chat', () => {
  it('renders image preview', async () => {
    expect.assertions(1)
    const messages = [imageMessage]
    const onSendPress = jest.fn()
    const { getByRole, getByText } = render(
      <Chat messages={messages} onSendPress={onSendPress} user={user} />
    )
    const button = getByRole('image').parent
    fireEvent.press(button)
    await waitFor(() => getByText('✕'))
    const closeButton = getByText('✕')
    expect(closeButton).toBeDefined()
  })

  it('sends a text message', () => {
    expect.assertions(1)
    const messages = [textMessage]
    const onSendPress = jest.fn()
    const { getByLabelText } = render(
      <Chat
        messages={messages}
        onSendPress={onSendPress}
        textInputProps={{ defaultValue: 'text' }}
        user={user}
      />
    )
    const button = getByLabelText('Send a message')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith(textMessage)
  })

  it('opens file on a file message tap', () => {
    expect.assertions(1)
    const messages = [fileMessage]
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

    const button = getByLabelText('Open a file')
    fireEvent.press(button)
    expect(onFilePress).toHaveBeenCalledWith(fileMessage)
  })
})
