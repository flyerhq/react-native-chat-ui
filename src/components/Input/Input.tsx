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

  const defaultMessageParams = () => ({
    // Buttons only rendered when the user exists, so we can safely force unwrap it
    /* type-coverage:ignore-next-line */ // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    authorId: user!.id,
    id: uuidv4(),
    timestamp: Math.floor(Date.now() / 1000),
  })

  const handleChangeText = (newText: string) => {
    // Track local state in case `onChangeText` is provided and `value` is not
    setText(newText)
    textInputProps?.onChangeText?.(newText)
  }

  const handleSend = () => {
    onSendPress({
      ...defaultMessageParams(),
      text: value.trim(),
      type: 'text',
    })
    setText('')
  }

  // TODO: This function is binded to the `onAttachmentPress`, how to mock this in tests?
  /* istanbul ignore next */
  const handleSendImage = ({
    height,
    imageUrl,
    width,
  }: Parameters<SendImageCallback>[0]) => {
    onSendPress({
      ...defaultMessageParams(),
      height,
      imageUrl,
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
        {user && (
          <AttachmentButton
            onPress={onAttachmentPress?.bind(null, handleSendImage)}
          />
        )}
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
        {user && value.trim() ? <SendButton onPress={handleSend} /> : null}
      </View>
    </KeyboardAccessoryView>
  )
}
