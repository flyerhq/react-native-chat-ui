import * as React from 'react'
import { fireEvent, render } from 'react-native-testing-library'
import { AttachmentButton } from '../AttachmentButton'

describe('attachment button', () => {
  it('sends an event', () => {
    expect.assertions(1)
    const onPress = jest.fn()
    const { getByA11yLabel } = render(<AttachmentButton onPress={onPress} />)
    const button = getByA11yLabel('Add an attachment')
    fireEvent.press(button)
    expect(onPress).toHaveBeenCalledWith()
  })
})
