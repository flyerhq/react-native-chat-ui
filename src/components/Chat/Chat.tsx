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
  l10nOverride?: Partial<Record<keyof typeof l10n[keyof typeof l10n], string>>
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
  l10nOverride,
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
  theme = defaultTheme,
  user,
}: ChatProps) => {
  const {
    container,
    dateDivider,
    emptyComponentContainer,
    emptyComponentTitle,
    flatList,
    flatListContentContainer,
    footer,
    keyboardAccessoryView,
  } = styles({ theme })

  const { onLayout, size } = useComponentSize()
  const [isImageViewVisible, setIsImageViewVisible] = React.useState(false)
  const [imageViewIndex, setImageViewIndex] = React.useState(0)
  const [stackEntry, setStackEntry] = React.useState<StatusBarProps>({})
  const images = messages.reduce<{ uri: string }[]>(
    (acc, curr) => (curr.type === 'image' ? [{ uri: curr.uri }, ...acc] : acc),
    []
  )
  const list = React.useRef<FlatList<MessageType.Any>>(null)
  const messageWidth = Math.floor(Math.min(size.width * 0.77, 440))

  React.useEffect(() => {
    initLocale(locale)
  }, [locale])

  const handleImagePress = React.useCallback(
    (uri: string) => {
      setImageViewIndex(images.findIndex((image) => image.uri === uri))
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

  const handleSendPress = (message: MessageType.PartialText) => {
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
      const nextMessage = isLast ? undefined : messages[index + 1]
      const previousMessage = isFirst ? undefined : messages[index - 1]

      let nextMessageDifferentDay = false
      let nextMessageSameAuthor = false
      let previousMessageSameAuthor = false
      let shouldRenderTime = !!message.createdAt

      if (nextMessage) {
        nextMessageDifferentDay =
          !!message.createdAt &&
          !!nextMessage.createdAt &&
          !dayjs
            .unix(message.createdAt)
            .isSame(dayjs.unix(nextMessage.createdAt), 'day')
        nextMessageSameAuthor = nextMessage.author.id === message.author.id
      }

      if (previousMessage) {
        previousMessageSameAuthor =
          previousMessage.author.id === message.author.id
        shouldRenderTime =
          !!message.createdAt &&
          !!previousMessage.createdAt &&
          (!previousMessageSameAuthor ||
            previousMessage.createdAt - message.createdAt >= 60)
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
          {(nextMessageDifferentDay || (isLast && message.createdAt)) && (
            <Text
              style={StyleSheet.flatten([
                dateDivider,
                { marginTop: nextMessageSameAuthor ? 24 : 16 },
              ])}
            >
              {/* At this point we know that createdAt exists, so we can safely force unwrap it */}
              {/* type-coverage:ignore-next-line */}
              {dayjs.unix(message.createdAt!).calendar(undefined, {
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

  const renderListEmptyComponent = React.useCallback(
    () => (
      <View style={emptyComponentContainer}>
        <Text style={emptyComponentTitle}>
          {l10n[locale].emptyChatPlaceholder}
        </Text>
      </View>
    ),
    [emptyComponentContainer, emptyComponentTitle, locale]
  )

  const renderListFooterComponent = React.useCallback(() => <View />, [])

  const renderScrollable = React.useCallback(
    (panHandlers: GestureResponderHandlers) => (
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={[
          flatListContentContainer,
          // eslint-disable-next-line react-native/no-inline-styles
          { justifyContent: messages.length !== 0 ? undefined : 'center' },
        ]}
        initialNumToRender={10}
        ListEmptyComponent={renderListEmptyComponent}
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
      flatListContentContainer,
      flatListProps,
      footer,
      keyExtractor,
      messages,
      renderItem,
      renderListEmptyComponent,
      renderListFooterComponent,
    ]
  )

  return (
    <UserContext.Provider value={user}>
      <ThemeContext.Provider value={theme}>
        <L10nContext.Provider value={{ ...l10n[locale], ...l10nOverride }}>
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
