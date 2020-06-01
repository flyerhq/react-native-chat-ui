import * as React from 'react'
import { fireEvent, render } from 'react-native-testing-library'
import { message, user } from '../../../../jest/fixtures'
import { Chat } from '../Chat'

describe('chat', () => {
  it('calls onSendPress', () => {
    expect.assertions(1)
    const messages = [message]
    const onSendPress = jest.fn()
    const { getByA11yLabel } = render(
      <Chat messages={messages} onSendPress={onSendPress} user={user} />
    )
    const button = getByA11yLabel('Send a message')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith({ ...message, text: '' })
  })
})
