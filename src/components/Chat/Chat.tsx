import {
  KeyboardAccessoryView,
  useComponentSize,
} from '@flyerhq/react-native-keyboard-accessory-view'
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import * as React from 'react'
import {
  FlatList,
  FlatListProps,
  GestureResponderHandlers,
  SafeAreaView,
  StatusBar,
  StatusBarProps,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import ImageView from 'react-native-image-viewing'
import { l10n } from '../../l10n'
import { defaultTheme } from '../../theme'
import { MessageType, Theme, User } from '../../types'
import {
  initLocale,
  L10nContext,
  ThemeContext,
  unwrap,
  UserContext,
} from '../../utils'
import { Input, InputAdditionalProps, InputTopLevelProps } from '../Input'
import { Message, MessageTopLevelProps } from '../Message'
import styles from './styles'

dayjs.extend(calendar)

export type ChatTopLevelProps = InputTopLevelProps & MessageTopLevelProps

export interface ChatProps extends ChatTopLevelProps {
  dateDividerFormat?: string
  flatListProps?: FlatListProps<MessageType.Any[]>
  inputProps?: InputAdditionalProps
  locale?: keyof typeof l10n
  messages: MessageType.Any[]
  theme?: Theme
  user: User
}

export const Chat = ({
  dateDividerFormat = 'DD MMMM',
  flatListProps,
  inputProps,
  isAttachmentUploading,
  locale = 'en',
  messages,
  messageTimeFormat,
  onAttachmentPress,
  onFilePress,
  onPreviewDataFetched,
  onSendPress,
  renderFileMessage,
  renderImageMessage,
  renderTextMessage,
  textInputProps,
  theme,
  user,
}: ChatProps) => {
  const themeValue = theme ?? defaultTheme
  const {
    container,
    dateDivider,
    flatList,
    footer,
    keyboardAccessoryView,
  } = styles({
    theme: themeValue,
  })

  const { onLayout, size } = useComponentSize()
  const [isImageViewVisible, setIsImageViewVisible] = React.useState(false)
  const [imageViewIndex, setImageViewIndex] = React.useState(0)
  const [stackEntry, setStackEntry] = React.useState<StatusBarProps>({})
  const images = messages.reduce<{ uri: string }[]>(
    (acc, curr) => (curr.type === 'image' ? [{ uri: curr.url }, ...acc] : acc),
    []
  )
  const list = React.useRef<FlatList<MessageType.Any>>(null)
  const messageWidth = Math.floor(Math.min(size.width * 0.77, 440))

  React.useEffect(() => {
    initLocale(locale)
  }, [locale])

  const handleImagePress = React.useCallback(
    (url: string) => {
      setImageViewIndex(images.findIndex((image) => image.uri === url))
      setIsImageViewVisible(true)
      setStackEntry(
        StatusBar.pushStackEntry({
          barStyle: 'light-content',
          animated: true,
        })
      )
    },
    [images]
  )

  // TODO: Tapping on a close button results in the next warning:
  // `An update to ImageViewing inside a test was not wrapped in act(...).`
  /* istanbul ignore next */
  const handleRequestClose = () => {
    setIsImageViewVisible(false)
    StatusBar.popStackEntry(stackEntry)
  }

  const handleSendPress = (message: MessageType.Any) => {
    onSendPress(message)
    list.current?.scrollToOffset({
      animated: true,
      offset: 0,
    })
  }

  const keyExtractor = React.useCallback((item: MessageType.Any) => item.id, [])

  const renderItem = React.useCallback(
    ({ item: message, index }: { item: MessageType.Any; index: number }) => {
      // TODO: Update the logic after pagination is introduced
      const isFirst = index === 0
      const isLast = index === messages.length - 1
      const previousMessage = isFirst ? undefined : messages[index - 1]
      const nextMessage = isLast ? undefined : messages[index + 1]

      let nextMessageDifferentDay = false
      let nextMessageSameAuthor = false
      let previousMessageSameAuthor = false
      let shouldRenderTime = !!message.timestamp

      if (nextMessage) {
        nextMessageDifferentDay =
          !!message.timestamp &&
          !dayjs
            .unix(message.timestamp)
            .isSame(dayjs.unix(nextMessage.timestamp), 'day')
        nextMessageSameAuthor = nextMessage.authorId === message.authorId
      }

      if (previousMessage) {
        previousMessageSameAuthor =
          previousMessage.authorId === message.authorId
        shouldRenderTime =
          !!message.timestamp &&
          (!previousMessageSameAuthor ||
            previousMessage.timestamp - message.timestamp >= 60)
      }

      return (
        <>
          <Message
            {...{
              message,
              messageTimeFormat,
              messageWidth,
              onFilePress,
              onImagePress: handleImagePress,
              onPreviewDataFetched,
              previousMessageSameAuthor,
              renderFileMessage,
              renderImageMessage,
              renderTextMessage,
              shouldRenderTime,
            }}
          />
          {(nextMessageDifferentDay || (isLast && message.timestamp)) && (
            <Text
              style={StyleSheet.flatten([
                dateDivider,
                { marginTop: nextMessageSameAuthor ? 24 : 16 },
              ])}
            >
              {dayjs.unix(message.timestamp).calendar(undefined, {
                sameDay: `[${l10n[locale].today}]`,
                nextDay: dateDividerFormat,
                nextWeek: dateDividerFormat,
                lastDay: `[${l10n[locale].yesterday}]`,
                lastWeek: dateDividerFormat,
                sameElse: dateDividerFormat,
              })}
            </Text>
          )}
        </>
      )
    },
    [
      dateDivider,
      dateDividerFormat,
      handleImagePress,
      locale,
      messageTimeFormat,
      messageWidth,
      messages,
      onFilePress,
      onPreviewDataFetched,
      renderFileMessage,
      renderImageMessage,
      renderTextMessage,
    ]
  )

  const renderListFooterComponent = React.useCallback(() => <View />, [])

  const renderScrollable = React.useCallback(
    (panHandlers: GestureResponderHandlers) => (
      <FlatList
        automaticallyAdjustContentInsets={false}
        initialNumToRender={10}
        ListFooterComponent={renderListFooterComponent}
        ListFooterComponentStyle={footer}
        maxToRenderPerBatch={6}
        showsHorizontalScrollIndicator={false}
        style={flatList}
        {...unwrap(flatListProps)}
        data={messages}
        inverted
        keyboardDismissMode='interactive'
        keyExtractor={keyExtractor}
        ref={list}
        renderItem={renderItem}
        {...panHandlers}
      />
    ),
    [
      flatList,
      flatListProps,
      footer,
      keyExtractor,
      messages,
      renderItem,
      renderListFooterComponent,
    ]
  )

  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={themeValue}>
        <L10nContext.Provider value={l10n[locale]}>
          <SafeAreaView style={container} onLayout={onLayout}>
            <KeyboardAccessoryView
              {...{
                renderScrollable,
                style: keyboardAccessoryView,
              }}
            >
              <Input
                {...{
                  ...unwrap(inputProps),
                  isAttachmentUploading,
                  onAttachmentPress,
                  onSendPress: handleSendPress,
                  renderScrollable,
                  textInputProps,
                }}
              />
            </KeyboardAccessoryView>
            <ImageView
              images={images}
              imageIndex={imageViewIndex}
              onRequestClose={handleRequestClose}
              visible={isImageViewVisible}
            />
          </SafeAreaView>
        </L10nContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}
