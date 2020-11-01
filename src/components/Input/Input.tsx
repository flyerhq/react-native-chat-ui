import * as React from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import {
  MessageType,
  SendAttachmentCallback,
  SendAttachmentCallbackParams,
  SendFileCallbackParams,
  SendImageCallbackParams,
} from '../../types'
import { ThemeContext, unwrap, UserContext, uuidv4 } from '../../utils'
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
  onAttachmentPress?: (sendAttachment: SendAttachmentCallback) => void
  onSendPress: (message: MessageType.Any) => void
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
  const theme = React.useContext(ThemeContext)
  const user = React.useContext(UserContext)
  const { container, input } = styles({ theme })

  // Use `defaultValue` if provided
  const [text, setText] = React.useState(textInputProps?.defaultValue ?? '')

  const value = textInputProps?.value ?? text

  const defaultMessageParams = {
    // Buttons only rendered when the user exists, so we can safely force unwrap it
    /* type-coverage:ignore-next-line */ // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    authorId: user!.id,
    id: uuidv4(),
    timestamp: Math.floor(Date.now() / 1000),
  }

  const handleChangeText = (newText: string) => {
    // Track local state in case `onChangeText` is provided and `value` is not
    setText(newText)
    textInputProps?.onChangeText?.(newText)
  }

  const handleSend = () => {
    onSendPress({
      ...defaultMessageParams,
      text: value.trim(),
      type: 'text',
    })
    setText('')
  }

  // TODO: This function is binded to the `onAttachmentPress`, how to mock this in tests?
  /* istanbul ignore next */
  const handleSendAttachment = (params: SendAttachmentCallbackParams) => {
    const isFileParams = (
      arg: SendFileCallbackParams | SendImageCallbackParams
    ): arg is SendFileCallbackParams => {
      return 'fileName' in arg
    }

    if (isFileParams(params)) {
      const { mimeType, fileName, size, url } = params
      onSendPress({
        ...defaultMessageParams,
        mimeType,
        fileName,
        size,
        type: 'file',
        url,
      })
    } else {
      const { height, imageName, size, url, width } = params
      onSendPress({
        ...defaultMessageParams,
        height,
        imageName,
        size,
        type: 'image',
        url,
        width,
      })
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
            }}
          />
        ) : (
          <AttachmentButton
            {...unwrap(attachmentButtonProps)}
            onPress={onAttachmentPress?.bind(null, handleSendAttachment)}
          />
        ))}
      <TextInput
        multiline
        placeholder='Your message here'
        placeholderTextColor={`${String(theme.colors.inputText)}80`}
        underlineColorAndroid='transparent'
        {...textInputProps}
        // Keep our implementation but allow user to use these `TextInputProps`
        style={StyleSheet.flatten([input, textInputProps?.style])}
        onChangeText={handleChangeText}
        value={value}
      />
      {user && value.trim() ? <SendButton onPress={handleSend} /> : null}
    </View>
  )
}
