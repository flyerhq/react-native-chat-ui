import * as React from 'react'
import { TextInput, TextInputProps, View } from 'react-native'

import { MessageType } from '../../types'
import { L10nContext, ThemeContext, unwrap, UserContext } from '../../utils'
import {
  AttachmentButton,
  AttachmentButtonAdditionalProps,
} from '../AttachmentButton'
import {
  CircularActivityIndicator,
  CircularActivityIndicatorProps,
} from '../CircularActivityIndicator'
import { SendButton } from '../SendButton'
import styles from './styles'

export interface InputTopLevelProps {
  isAttachmentUploading?: boolean
  onAttachmentPress?: () => void
  onSendPress: (message: MessageType.PartialText) => void
  textInputProps?: TextInputProps
}

export interface InputAdditionalProps {
  attachmentButtonProps?: AttachmentButtonAdditionalProps
  attachmentCircularActivityIndicatorProps?: CircularActivityIndicatorProps
}

export type InputProps = InputTopLevelProps & InputAdditionalProps

export const Input = ({
  attachmentButtonProps,
  attachmentCircularActivityIndicatorProps,
  isAttachmentUploading,
  onAttachmentPress,
  onSendPress,
  textInputProps,
}: InputProps) => {
  const l10n = React.useContext(L10nContext)
  const theme = React.useContext(ThemeContext)
  const user = React.useContext(UserContext)
  const { container, input, marginRight } = styles({ theme })

  // Use `defaultValue` if provided
  const [text, setText] = React.useState(textInputProps?.defaultValue ?? '')

  const value = textInputProps?.value ?? text

  const handleChangeText = (newText: string) => {
    // Track local state in case `onChangeText` is provided and `value` is not
    setText(newText)
    textInputProps?.onChangeText?.(newText)
  }

  const handleSend = () => {
    const trimmedValue = value.trim()

    // Impossible to test since button is not visible when value is empty.
    // Additional check for the keyboard input.
    /* istanbul ignore next */
    if (trimmedValue) {
      onSendPress({ text: trimmedValue })
      setText('')
    }
  }

  return (
    <View style={container}>
      {user &&
        (isAttachmentUploading ? (
          <CircularActivityIndicator
            {...{
              ...attachmentCircularActivityIndicatorProps,
              color: theme.colors.inputText,
              style: marginRight,
            }}
          />
        ) : (
          !!onAttachmentPress && (
            <AttachmentButton
              {...unwrap(attachmentButtonProps)}
              onPress={onAttachmentPress}
            />
          )
        ))}
      <TextInput
        multiline
        placeholder={l10n.inputPlaceholder}
        placeholderTextColor={`${String(theme.colors.inputText)}80`}
        underlineColorAndroid='transparent'
        {...textInputProps}
        // Keep our implementation but allow user to use these `TextInputProps`
        style={[input, textInputProps?.style]}
        onChangeText={handleChangeText}
        value={value}
      />
      {user && value.trim() ? <SendButton onPress={handleSend} /> : null}
    </View>
  )
}
