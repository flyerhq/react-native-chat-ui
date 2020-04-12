import * as React from 'react'
import { fireEvent, render } from 'react-native-testing-library'
import { message, user } from '../../fixtures'
import { Chat } from '../Chat'

beforeAll(() => {
  Date.now = jest.fn(() => 0)
})

test('it calls onSendPress', () => {
  const messages = [message]
  const onSendPress = jest.fn()
  const { getByA11yLabel } = render(
    <Chat messages={messages} onSendPress={onSendPress} user={user} />
  )

  const button = getByA11yLabel('Send a message')
  fireEvent.press(button)
  expect(onSendPress).toHaveBeenCalledWith({ ...message, text: '' })
})
