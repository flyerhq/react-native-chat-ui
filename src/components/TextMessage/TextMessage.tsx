import {
  LinkPreview,
  PreviewData,
  REGEX_LINK,
} from '@flyerhq/react-native-link-preview'
import * as React from 'react'
import { Linking, StyleSheet, Text } from 'react-native'
import ParsedText from 'react-native-parsed-text'
import { MessageType } from '../../types'
import { UserContext } from '../../utils'
import styles from './styles'

export interface TextMessageProps {
  message: MessageType.Text
  messageWidth: number
}

export const TextMessage = ({ message, messageWidth }: TextMessageProps) => {
  const user = React.useContext(UserContext)
  const [previewData, setPreviewData] = React.useState<
    PreviewData | undefined
  >()
  const { descriptionText, titleText, text } = styles({
    message,
    user,
  })

  const handleUrlPress = (url: string) => Linking.openURL(url)

  const renderPreviewDescription = (description: string) => {
    return (
      <Text numberOfLines={3} style={descriptionText}>
        {description}
      </Text>
    )
  }

  const renderPreviewText = (previewText: string) => {
    return (
      <ParsedText
        parse={[
          {
            onPress: handleUrlPress,
            style: StyleSheet.flatten([
              text,
              { textDecorationLine: 'underline' },
            ]),
            type: 'url',
          },
        ]}
        style={text}
      >
        {previewText}
      </ParsedText>
    )
  }

  const renderPreviewTitle = (title: string) => {
    return (
      <Text numberOfLines={2} style={titleText}>
        {title}
      </Text>
    )
  }

  return REGEX_LINK.test(message.text) ? (
    <LinkPreview
      containerStyle={{ width: previewData?.image ? messageWidth : undefined }}
      onPreviewDataFetched={setPreviewData}
      previewData={previewData}
      renderDescription={renderPreviewDescription}
      renderText={renderPreviewText}
      renderTitle={renderPreviewTitle}
      text={message.text}
      touchableWithoutFeedbackProps={{ disabled: true }}
    />
  ) : (
    <Text
      accessibilityRole='text'
      style={StyleSheet.flatten([
        text,
        { marginHorizontal: 24, marginVertical: 16 },
      ])}
    >
      {message.text}
    </Text>
  )
}
