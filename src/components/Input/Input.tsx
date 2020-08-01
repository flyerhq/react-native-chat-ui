import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view'
import * as React from 'react'
import { Animated, TextInput, TextInputProps, View } from 'react-native'
import { MessageType, User } from '../../types'
import { uuidv4 } from '../../utils'
import { AttachmentButton } from '../AttachmentButton'
import { SendButton } from '../SendButton'
import styles from './styles'

export interface InputProps {
  onAttachmentPress?: () => void
  onContentBottomInsetUpdate?: (contentBottomInset: number) => void
  onSendPress: (message: MessageType.Any) => void
  panResponderPositionY?: Animated.Value
  textInputProps?: TextInputProps
  user: User
}

export const Input = ({
  onAttachmentPress,
  onContentBottomInsetUpdate,
  onSendPress,
  panResponderPositionY,
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
      text: value.trim(),
      timestamp: Math.floor(Date.now() / 1000),
      type: 'text',
    })
    setText('')
  }

  return (
    <KeyboardAccessoryView
      onContentBottomInsetUpdate={onContentBottomInsetUpdate}
      panResponderPositionY={panResponderPositionY}
      style={styles.keyboardAccessoryView}
    >
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
        <SendButton disabled={!value} onPress={handleSend} />
      </View>
    </KeyboardAccessoryView>
  )
}
