import { act, render } from '@testing-library/react-native'
import * as React from 'react'
import { Image } from 'react-native'

import { derivedImageMessage, size } from '../../../../jest/fixtures'
import { ImageMessage } from '../ImageMessage'

describe('image message', () => {
  it('gets image size and renders', () => {
    expect.assertions(5)
    const getSizeMock = jest.spyOn(Image, 'getSize')
    getSizeMock.mockImplementation(() => {})
    const message = {
      ...derivedImageMessage,
      height: undefined,
      width: undefined,
    }
    const onPress = jest.fn()
    const { getByRole } = render(
      <ImageMessage message={message} messageWidth={440} onPress={onPress} />
    )
    expect(getSizeMock).toHaveBeenCalledTimes(1)
    const getSizeArgs = getSizeMock.mock.calls[0]
    expect(getSizeArgs[0]).toBe(derivedImageMessage.uri)
    const success = getSizeArgs[1]
    const error = getSizeArgs[2]
    act(() => {
      success(size.width, size.height)
    })
    const successImageComponent = getByRole('image')
    expect(successImageComponent.props).toHaveProperty(
      'style.height',
      440 / (size.width / size.height)
    )
    act(() => {
      success(size.width, size.width * 10 + 1)
    })
    const successMinimizedImageComponent = getByRole('image')
    expect(successMinimizedImageComponent.props).toHaveProperty(
      'style.width',
      64
    )
    act(() => {
      error(new Error())
    })
    const errorImageComponent = getByRole('image')
    expect(errorImageComponent.props).toHaveProperty('style.width', 64)
    getSizeMock.mockRestore()
  })
})
