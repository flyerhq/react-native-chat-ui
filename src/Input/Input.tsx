import * as React from 'react'
import {
  InputAccessoryView,
  Platform,
  TextInput,
  TextInputProps,
  View,
} from 'react-native'
import { SendButton } from '../SendButton'
import styles from './styles'

export interface InputProps {
  onSendPress: (message: string) => void
  textInputProps?: TextInputProps
}

export const Input = ({ onSendPress, textInputProps }: InputProps) => {
  // Use `defaultValue` if provided
  const [text, setText] = React.useState(textInputProps?.defaultValue ?? '')

  const handleChangeText = (text: string) => {
    // Track local state in case `onChangeText` is provided and `value` is not
    setText(text)
    textInputProps?.onChangeText?.(text)
  }

  const value = textInputProps?.value ?? text

  const renderInput = () => (
    <View style={styles.container}>
      <TextInput
        multiline
        placeholder='Message'
        underlineColorAndroid='transparent'
        {...textInputProps}
        // Keep our implementation but allow user to use these `TextInputProps`
        style={[styles.input, textInputProps?.style]}
        onChangeText={handleChangeText}
        value={value}
      />
      <SendButton onPress={() => onSendPress(value)} />
    </View>
  )

  return (
    <>
      {Platform.OS === 'ios' ? (
        <InputAccessoryView backgroundColor='#ddd'>
          {renderInput()}
        </InputAccessoryView>
      ) : (
        renderInput()
      )}
    </>
  )
}
