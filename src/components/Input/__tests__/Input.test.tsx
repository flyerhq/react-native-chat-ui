import { fireEvent, render } from '@testing-library/react-native'
import * as React from 'react'
import { ScrollView } from 'react-native'

import { textMessage, user } from '../../../../jest/fixtures'
import { l10n } from '../../../l10n'
import { UserContext } from '../../../utils'
import { Input } from '../Input'

const renderScrollable = () => <ScrollView />

describe('input', () => {
  it('sends a text message', () => {
    expect.assertions(2)
    const onSendPress = jest.fn()
    const { getByPlaceholderText, getByLabelText } = render(
      <UserContext.Provider value={user}>
        <Input
          {...{
            onSendPress,
            renderScrollable,
          }}
        />
      </UserContext.Provider>
    )
    const textInput = getByPlaceholderText(l10n.en.inputPlaceholder)
    fireEvent.changeText(textInput, 'text')
    const button = getByLabelText(l10n.en.sendButtonAccessibilityLabel)
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith(textMessage)
    expect(textInput.props).toHaveProperty('value', '')
  })

  it('sends a text message if onChangeText and value are provided', () => {
    expect.assertions(2)
    const onSendPress = jest.fn()
    const value = 'value'
    const onChangeText = jest.fn((newValue) => {
      rerender(
        <UserContext.Provider value={user}>
          <Input
            {...{
              onSendPress,
              renderScrollable,
              textInputProps: { onChangeText, value: newValue },
            }}
          />
        </UserContext.Provider>
      )
    })
    const { getByPlaceholderText, getByLabelText, rerender } = render(
      <UserContext.Provider value={user}>
        <Input
          {...{
            onSendPress,
            renderScrollable,
            textInputProps: { onChangeText, value },
          }}
        />
      </UserContext.Provider>
    )
    const textInput = getByPlaceholderText(l10n.en.inputPlaceholder)
    fireEvent.changeText(textInput, 'text')
    const button = getByLabelText(l10n.en.sendButtonAccessibilityLabel)
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith(textMessage)
    expect(textInput.props).toHaveProperty('value', 'text')
  })

  it('sends a text message if onChangeText is provided', () => {
    expect.assertions(2)
    const onSendPress = jest.fn()
    const onChangeText = jest.fn()
    const { getByPlaceholderText, getByLabelText } = render(
      <UserContext.Provider value={user}>
        <Input
          {...{
            onSendPress,
            renderScrollable,
            textInputProps: { onChangeText },
          }}
        />
      </UserContext.Provider>
    )
    const textInput = getByPlaceholderText(l10n.en.inputPlaceholder)
    fireEvent.changeText(textInput, 'text')
    const button = getByLabelText(l10n.en.sendButtonAccessibilityLabel)
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith(textMessage)
    expect(textInput.props).toHaveProperty('value', '')
  })

  it('sends a text message if value is provided', () => {
    expect.assertions(2)
    const onSendPress = jest.fn()
    const value = 'value'
    const { getByPlaceholderText, getByLabelText } = render(
      <UserContext.Provider value={user}>
        <Input
          {...{
            onSendPress,
            renderScrollable,
            textInputProps: { value },
          }}
        />
      </UserContext.Provider>
    )
    const textInput = getByPlaceholderText(l10n.en.inputPlaceholder)
    fireEvent.changeText(textInput, 'text')
    const button = getByLabelText(l10n.en.sendButtonAccessibilityLabel)
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith({ ...textMessage, text: value })
    expect(textInput.props).toHaveProperty('value', value)
  })

  it('sends a text message if defaultValue is provided', () => {
    expect.assertions(2)
    const onSendPress = jest.fn()
    const defaultValue = 'defaultValue'
    const { getByPlaceholderText, getByLabelText } = render(
      <UserContext.Provider value={user}>
        <Input
          {...{
            onSendPress,
            renderScrollable,
            textInputProps: { defaultValue },
          }}
        />
      </UserContext.Provider>
    )
    const textInput = getByPlaceholderText(l10n.en.inputPlaceholder)
    const button = getByLabelText(l10n.en.sendButtonAccessibilityLabel)
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith({
      ...textMessage,
      text: defaultValue,
    })
    expect(textInput.props).toHaveProperty('value', '')
  })

  it('sends an image message', () => {
    expect.assertions(1)
    const onAttachmentPress = jest.fn()
    const onSendPress = jest.fn()
    const { getByLabelText } = render(
      <UserContext.Provider value={user}>
        <Input
          {...{
            onAttachmentPress,
            renderScrollable,
            onSendPress,
          }}
        />
      </UserContext.Provider>
    )
    const button = getByLabelText(l10n.en.attachmentButtonAccessibilityLabel)
    fireEvent.press(button)
    expect(onAttachmentPress).toHaveBeenCalledTimes(1)
  })

  it('shows activity indicator when attachment is uploading', () => {
    expect.assertions(1)
    const isAttachmentUploading = true
    const onSendPress = jest.fn()
    const { getByTestId } = render(
      <UserContext.Provider value={user}>
        <Input
          {...{
            attachmentCircularActivityIndicatorProps: {
              color: 'white',
              size: undefined,
            },
            isAttachmentUploading,
            renderScrollable,
            onSendPress,
          }}
        />
      </UserContext.Provider>
    )

    const indicator = getByTestId('CircularActivityIndicator')
    expect(indicator).toBeDefined()
  })
})
