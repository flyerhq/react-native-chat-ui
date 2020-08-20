import { act, fireEvent, render } from '@testing-library/react-native'
import * as React from 'react'
import { Image } from 'react-native'
import { imageMessage, size } from '../../../../jest/fixtures'
import { ImageMessage } from '../ImageMessage'

describe('text message', () => {
  it('gets image size and renders', () => {
    expect.assertions(4)
    const getSizeMock = jest.spyOn(Image, 'getSize')
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    getSizeMock.mockImplementation(() => {})
    const message = { ...imageMessage, height: undefined, width: undefined }
    const onPress = jest.fn()
    const { getByRole } = render(
      <ImageMessage message={message} onPress={onPress} />
    )
    expect(getSizeMock).toHaveBeenCalledTimes(1)
    const getSizeArgs = getSizeMock.mock.calls[0]
    expect(getSizeArgs[0]).toBe(imageMessage.url)
    const success = getSizeArgs[1]
    const error = getSizeArgs[2]
    act(() => {
      success(size.width, size.height)
    })
    const successImageComponent = getByRole('image')
    expect(successImageComponent.props).toHaveProperty(
      'style.width',
      size.width
    )
    act(() => {
      error(new Error())
    })
    const errorImageComponent = getByRole('image')
    expect(errorImageComponent.props).toHaveProperty('style.width', 0)
    getSizeMock.mockRestore()
  })

  it('handles press', () => {
    expect.assertions(1)
    const onPress = jest.fn()
    const { getByRole } = render(
      <ImageMessage message={imageMessage} onPress={onPress} />
    )
    const button = getByRole('image').parent
    fireEvent.press(button)
    expect(onPress).toHaveBeenCalledWith(imageMessage.url)
  })
})
