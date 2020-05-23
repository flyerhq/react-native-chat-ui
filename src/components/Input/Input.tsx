import * as React from 'react'
import {
  InputAccessoryView,
  Platform,
  TextInput,
  TextInputProps,
  View,
} from 'react-native'
import { Message, User } from '../../types'
import { uuidv4 } from '../../utils'
import { AttachmentButton } from '../AttachmentButton'
import { SendButton } from '../SendButton'
import styles from './styles'

export interface InputProps {
  onAttachmentPress?: () => void
  onSendPress: (message: Message) => void
  textInputProps?: TextInputProps
  user: User
}

export const Input = ({
  onAttachmentPress,
  onSendPress,
  textInputProps,
  user,
}: InputProps) => {
  // Use `defaultValue` if provided
  const [text, setText] = React.useState(textInputProps?.defaultValue ?? '')

  const value = textInputProps?.value ?? text

  const handleChangeText = (newText: string) => {
    // Track local state in case `onChangeText` is provided and `value` is not
    setText(newText)
    textInputProps?.onChangeText?.(newText)
  }

  const handleSend = () => {
    onSendPress({
      authorId: user.id,
      id: uuidv4(),
      text: value,
      timestamp: Math.floor(Date.now() / 1000),
    })
    setText('')
  }

  const renderInput = () => (
    // Wrap container in a `View` with a background color set to
    // chat background to mimic `borderRadius` on an `InputAccessoryView`
    // which is not supported
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <AttachmentButton onPress={onAttachmentPress} />
        <TextInput
          multiline
          placeholder='Your message here'
          placeholderTextColor='#fffc'
          underlineColorAndroid='transparent'
          {...textInputProps}
          // Keep our implementation but allow user to use these `TextInputProps`
          style={[styles.input, textInputProps?.style]}
          onChangeText={handleChangeText}
          value={value}
        />
        <SendButton onPress={handleSend} />
      </View>
    </View>
  )

  return (
    <View accessibilityRole='toolbar'>
      {Platform.OS === 'ios' ? (
        <InputAccessoryView backgroundColor='#000'>
          {renderInput()}
        </InputAccessoryView>
      ) : (
        renderInput()
      )}
    </View>
  )
}
