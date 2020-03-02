import * as React from 'react'
import { fireEvent, render } from 'react-native-testing-library'
import { SendButton } from '../SendButton'

test('it sends an event', () => {
  const onPress = jest.fn()
  const { getByA11yLabel } = render(<SendButton onPress={onPress} />)
  const button = getByA11yLabel('Send a message')
  fireEvent.press(button)
  expect(onPress).toHaveBeenCalled()
})
