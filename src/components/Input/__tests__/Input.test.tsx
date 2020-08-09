import { fireEvent, render } from '@testing-library/react-native'
import * as React from 'react'
import { textMessage, user } from '../../../../jest/fixtures'
import { UserContext } from '../../../utils'
import { Input } from '../Input'

describe('input', () => {
  it('sends a text message', () => {
    expect.assertions(2)
    const onSendPress = jest.fn()
    const { getByPlaceholderText, getByLabelText } = render(
      <UserContext.Provider value={user}>
        <Input onSendPress={onSendPress} />
      </UserContext.Provider>
    )
    const textInput = getByPlaceholderText('Your message here')
    fireEvent.changeText(textInput, 'text')
    const button = getByLabelText('Send a message')
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
            onSendPress={onSendPress}
            textInputProps={{ onChangeText, value: newValue }}
          />
        </UserContext.Provider>
      )
    })
    const { getByPlaceholderText, getByLabelText, rerender } = render(
      <UserContext.Provider value={user}>
        <Input
          onSendPress={onSendPress}
          textInputProps={{ onChangeText, value }}
        />
      </UserContext.Provider>
    )
    const textInput = getByPlaceholderText('Your message here')
    fireEvent.changeText(textInput, 'text')
    const button = getByLabelText('Send a message')
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
        <Input onSendPress={onSendPress} textInputProps={{ onChangeText }} />
      </UserContext.Provider>
    )
    const textInput = getByPlaceholderText('Your message here')
    fireEvent.changeText(textInput, 'text')
    const button = getByLabelText('Send a message')
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
        <Input onSendPress={onSendPress} textInputProps={{ value }} />
      </UserContext.Provider>
    )
    const textInput = getByPlaceholderText('Your message here')
    fireEvent.changeText(textInput, 'text')
    const button = getByLabelText('Send a message')
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
        <Input onSendPress={onSendPress} textInputProps={{ defaultValue }} />
      </UserContext.Provider>
    )
    const textInput = getByPlaceholderText('Your message here')
    const button = getByLabelText('Send a message')
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
          onAttachmentPress={onAttachmentPress}
          onSendPress={onSendPress}
        />
      </UserContext.Provider>
    )
    const button = getByLabelText('Add an attachment')
    fireEvent.press(button)
    expect(onAttachmentPress).toHaveBeenCalledTimes(1)
  })
})
