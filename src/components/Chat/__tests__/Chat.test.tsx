import * as React from 'react'
import { fireEvent, render } from 'react-native-testing-library'
import { imageMessage, textMessage, user } from '../../../../jest/fixtures'
import { Chat } from '../Chat'

describe('chat', () => {
  it('sends image message', () => {
    expect.assertions(1)
    const messages = [imageMessage]
    const onSendPress = jest.fn()
    const { getByA11yLabel } = render(
      <Chat messages={messages} onSendPress={onSendPress} user={user} />
    )
    const button = getByA11yLabel('Send a message')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith({ ...imageMessage })
  })

  it('sends text message', () => {
    expect.assertions(1)
    const messages = [textMessage]
    const onSendPress = jest.fn()
    const { getByA11yLabel } = render(
      <Chat messages={messages} onSendPress={onSendPress} user={user} />
    )
    const button = getByA11yLabel('Send a message')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith({ ...textMessage, text: '' })
  })
})
