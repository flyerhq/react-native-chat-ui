import * as React from 'react'
import { InputAccessoryView, View } from 'react-native'
import { fireEvent, render } from 'react-native-testing-library'
import { ReactTestInstance } from 'react-test-renderer'
import { message, user } from '../../fixtures'
import { Input } from '../Input'

describe('input', () => {
  test('it sends a correct message', () => {
    const onSendPress = jest.fn()
    const { getByPlaceholder, getByA11yLabel } = render(
      <Input onSendPress={onSendPress} user={user} />
    )
    const textInput = getByPlaceholder('Message')
    const button = getByA11yLabel('Send a message')
    fireEvent.changeText(textInput, 'text')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith(message)
    expect(textInput.props.value).toEqual('')
  })

  test('it sends a correct message if onChangeText and value are provided', () => {
    const onSendPress = jest.fn()
    const value = 'value'
    const onChangeText = jest.fn(value => {
      rerender(
        <Input
          onSendPress={onSendPress}
          textInputProps={{ onChangeText, value }}
          user={user}
        />
      )
    })
    const { getByPlaceholder, getByA11yLabel, rerender } = render(
      <Input
        onSendPress={onSendPress}
        textInputProps={{ onChangeText, value }}
        user={user}
      />
    )
    const textInput = getByPlaceholder('Message')
    const button = getByA11yLabel('Send a message')
    fireEvent.changeText(textInput, 'text')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith(message)
    expect(textInput.props.value).toEqual('text')
  })

  test('it sends a correct message if onChangeText is provided', () => {
    const onSendPress = jest.fn()
    const onChangeText = jest.fn()
    const { getByPlaceholder, getByA11yLabel } = render(
      <Input
        onSendPress={onSendPress}
        textInputProps={{ onChangeText }}
        user={user}
      />
    )
    const textInput = getByPlaceholder('Message')
    const button = getByA11yLabel('Send a message')
    fireEvent.changeText(textInput, 'text')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith(message)
    expect(textInput.props.value).toEqual('')
  })

  test('it sends a correct message if value is provided', () => {
    const onSendPress = jest.fn()
    const value = 'value'
    const { getByPlaceholder, getByA11yLabel } = render(
      <Input onSendPress={onSendPress} textInputProps={{ value }} user={user} />
    )
    const textInput = getByPlaceholder('Message')
    const button = getByA11yLabel('Send a message')
    fireEvent.changeText(textInput, 'text')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith({ ...message, text: value })
    expect(textInput.props.value).toEqual(value)
  })

  test('it sends a correct message if defaultValue is provided', () => {
    const onSendPress = jest.fn()
    const defaultValue = 'defaultValue'
    const { getByPlaceholder, getByA11yLabel } = render(
      <Input
        onSendPress={onSendPress}
        textInputProps={{ defaultValue }}
        user={user}
      />
    )
    const textInput = getByPlaceholder('Message')
    const button = getByA11yLabel('Send a message')
    fireEvent.press(button)
    expect(onSendPress).toHaveBeenCalledWith({ ...message, text: defaultValue })
    expect(textInput.props.value).toEqual('')
  })
})

describe('input per platform', () => {
  beforeEach(() => {
    jest.dontMock('react-native/Libraries/Utilities/Platform').resetModules()
  })

  test('it renders InputAccessoryView for iOS', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'ios',
      select: jest.fn(),
    }))

    const onSendPress = jest.fn()
    const { getByA11yRole } = render(
      <Input onSendPress={onSendPress} user={user} />
    )
    const container = getByA11yRole('toolbar')
    expect((container.children[0] as ReactTestInstance).type).toEqual(
      InputAccessoryView
    )
  })

  test('it does not render InputAccessoryView for Android', () => {
    jest.mock('react-native/Libraries/Utilities/Platform', () => ({
      OS: 'android',
      select: jest.fn(),
    }))

    const onSendPress = jest.fn()
    const { getByA11yRole } = render(
      <Input onSendPress={onSendPress} user={user} />
    )
    const container = getByA11yRole('toolbar')
    expect((container.children[0] as ReactTestInstance).type).toEqual(View)
  })
})
