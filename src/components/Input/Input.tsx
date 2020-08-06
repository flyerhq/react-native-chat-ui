import { KeyboardAccessoryView } from '@flyerhq/react-native-keyboard-accessory-view'
import * as React from 'react'
import {
  Animated,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native'
import { MessageType, SendImageCallback } from '../../types'
import { UserContext, uuidv4 } from '../../utils'
import { AttachmentButton } from '../AttachmentButton'
import { SendButton } from '../SendButton'
import styles from './styles'

export interface InputProps {
  onAttachmentPress?: (send: SendImageCallback) => void
  onContentBottomInsetUpdate?: (contentBottomInset: number) => void
  onSendPress: (message: MessageType.Any) => void
  panResponderPositionY?: Animated.Value
  textInputProps?: TextInputProps
}

export const Input = ({
  onAttachmentPress,
  onContentBottomInsetUpdate,
  onSendPress,
  panResponderPositionY,
  textInputProps,
}: InputProps) => {
  const user = React.useContext(UserContext)
  // Use `defaultValue` if provided
  const [text, setText] = React.useState(textInputProps?.defaultValue ?? '')

  const value = textInputProps?.value ?? text

  const handleChangeText = (newText: string) => {
    // Track local state in case `onChangeText` is provided and `value` is not
    setText(newText)
    textInputProps?.onChangeText?.(newText)
  }

  const handleSend = () => {
    if (user) {
      onSendPress({
        authorId: user.id,
        id: uuidv4(),
        text: value.trim(),
        timestamp: Math.floor(Date.now() / 1000),
        type: 'text',
      })
      setText('')
    }
  }

  const handleSendImage = ({
    height,
    imageUrl,
    width,
  }: Parameters<SendImageCallback>[0]) => {
    user &&
      onSendPress({
        authorId: user.id,
        height,
        id: uuidv4(),
        imageUrl,
        timestamp: Math.floor(Date.now() / 1000),
        type: 'image',
        width,
      })
  }

  return (
    <KeyboardAccessoryView
      onContentBottomInsetUpdate={onContentBottomInsetUpdate}
      panResponderPositionY={panResponderPositionY}
      style={styles.keyboardAccessoryView}
    >
      <View style={styles.container}>
        <AttachmentButton
          onPress={onAttachmentPress?.bind(null, handleSendImage)}
        />
        <TextInput
          multiline
          placeholder='Your message here'
          placeholderTextColor='#fffc'
          underlineColorAndroid='transparent'
          {...textInputProps}
          // Keep our implementation but allow user to use these `TextInputProps`
          style={StyleSheet.flatten([styles.input, textInputProps?.style])}
          onChangeText={handleChangeText}
          value={value}
        />
        {user && value ? <SendButton onPress={handleSend} /> : null}
      </View>
    </KeyboardAccessoryView>
  )
}
