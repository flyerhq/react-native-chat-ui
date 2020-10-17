import { render } from '@testing-library/react-native'
import * as React from 'react'
import { View } from 'react-native'
import {
  fileMessage,
  imageMessage,
  textMessage,
} from '../../../../jest/fixtures'
import { Message } from '../Message'

describe('message', () => {
  it('renders provided file message', () => {
    expect.assertions(1)
    const onImagePress = jest.fn()
    const renderFileMessage = jest.fn(() => <View accessibilityLabel='file' />)
    const { getByLabelText } = render(
      <Message
        message={fileMessage}
        messageWidth={440}
        onImagePress={onImagePress}
        previousMessageSameAuthor={false}
        renderFileMessage={renderFileMessage}
      />
    )
    const file = getByLabelText('file')
    expect(file).toBeDefined()
  })

  it('renders provided image message', () => {
    expect.assertions(1)
    const onImagePress = jest.fn()
    const renderImageMessage = jest.fn(() => (
      <View accessibilityLabel='image' />
    ))
    const { getByLabelText } = render(
      <Message
        message={imageMessage}
        messageWidth={440}
        onImagePress={onImagePress}
        previousMessageSameAuthor={false}
        renderImageMessage={renderImageMessage}
      />
    )
    const image = getByLabelText('image')
    expect(image).toBeDefined()
  })

  it('renders provided text message', () => {
    expect.assertions(1)
    const onImagePress = jest.fn()
    const renderTextMessage = jest.fn(() => <View accessibilityLabel='text' />)
    const { getByLabelText } = render(
      <Message
        message={textMessage}
        messageWidth={440}
        onImagePress={onImagePress}
        previousMessageSameAuthor={false}
        renderTextMessage={renderTextMessage}
      />
    )
    const text = getByLabelText('text')
    expect(text).toBeDefined()
  })
})
