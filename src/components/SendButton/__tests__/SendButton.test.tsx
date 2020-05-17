import * as React from 'react'
import { fireEvent, render } from 'react-native-testing-library'
import { SendButton } from '../SendButton'

describe('send button', () => {
  it('sends an event', () => {
    expect.assertions(1)
    const onPress = jest.fn()
    const { getByA11yLabel } = render(<SendButton onPress={onPress} />)
    const button = getByA11yLabel('Send a message')
    fireEvent.press(button)
    expect(onPress).toHaveBeenCalledWith()
  })
})
