import * as React from 'react'
import { fireEvent, render } from 'react-native-testing-library'
import { Chat } from '../Chat'

test('it calls onSendPress', () => {
  const messages = [{ id: '1', text: 'First' }]
  const onSendPress = jest.fn()
  const { getByA11yLabel } = render(
    <Chat messages={messages} onSendPress={onSendPress} />
  )

  const button = getByA11yLabel('Send a message')
  fireEvent.press(button)
  expect(onSendPress).toHaveBeenCalledWith({ id: 'uuidv4', text: '' })
})
