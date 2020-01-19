import * as React from 'react'
import { View } from 'react-native'
import { fireEvent, render } from 'react-native-testing-library'
import { Input } from '../Input'

describe('input', () => {
  test('it sends a correct message', () => {
    const onSendPress = jest.fn()
    const { getByPlaceholder, getByText } = render(
      <Input onSendPress={onSendPress} />
    )
    const textInput = getByPlaceholder('Message')
    const button = getByText('Send')
    fireEvent.changeText(textInput, 'text')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith('text')
  })

  test('it sends a correct message if onChangeText and value are provided', () => {
    const onSendPress = jest.fn()
    const value = 'value'
    const onChangeText = jest.fn(value => {
      update(
        <Input
          onSendPress={onSendPress}
          textInputProps={{ onChangeText, value }}
        />
      )
    })
    const { getByPlaceholder, getByText, update } = render(
      <Input
        onSendPress={onSendPress}
        textInputProps={{ onChangeText, value }}
      />
    )
    const textInput = getByPlaceholder('Message')
    const button = getByText('Send')
    fireEvent.changeText(textInput, 'text')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith('text')
  })

  test('it sends a correct message if onChangeText is provided', () => {
    const onSendPress = jest.fn()
    const onChangeText = jest.fn()
    const { getByPlaceholder, getByText } = render(
      <Input onSendPress={onSendPress} textInputProps={{ onChangeText }} />
    )
    const textInput = getByPlaceholder('Message')
    const button = getByText('Send')
    fireEvent.changeText(textInput, 'text')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith('text')
  })

  test('it sends a correct message if value is provided', () => {
    const onSendPress = jest.fn()
    const value = 'value'
    const { getByPlaceholder, getByText } = render(
      <Input onSendPress={onSendPress} textInputProps={{ value }} />
    )
    const textInput = getByPlaceholder('Message')
    const button = getByText('Send')
    fireEvent.changeText(textInput, 'text')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith(value)
  })

  test('it sends a correct message if defaultValue is provided', () => {
    const onSendPress = jest.fn()
    const defaultValue = 'defaultValue'
    const { getByText } = render(
      <Input onSendPress={onSendPress} textInputProps={{ defaultValue }} />
    )
    const button = getByText('Send')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith(defaultValue)
  })
})

describe('input per platform', () => {
  beforeEach(() => {
    jest.dontMock('react-native/Libraries/Utilities/Platform').resetModules()
  })

  test('it renders InputAccessoryView for iOS', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'ios',
    }))

    const onSendPress = jest.fn()
    const { getByType } = render(<Input onSendPress={onSendPress} />)
    const container = getByType(View)
    expect(container.parent.type).toEqual('RCTInputAccessoryView')
  })

  test('it does not render InputAccessoryView for Android', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
    }))

    const onSendPress = jest.fn()
    const { getByType } = render(<Input onSendPress={onSendPress} />)
    const container = getByType(View)
    expect(container.parent.type).not.toEqual('RCTInputAccessoryView')
  })
})
