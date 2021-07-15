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
  Text,
  View,
} from 'react-native'
import ImageView from 'react-native-image-viewing'

import { l10n } from '../../l10n'
import { defaultTheme } from '../../theme'
import { MessageType, Theme, User } from '../../types'
import {
  calculateChatMessages,
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
  buildCustomMessage?: (message: MessageType.Derived) => React.ReactNode
  customDateHeaderText?: (dateTime: number) => string
  dateFormat?: string
  flatListProps?: FlatListProps<MessageType.Derived[]>
  inputProps?: InputAdditionalProps
  l10nOverride?: Partial<Record<keyof typeof l10n[keyof typeof l10n], string>>
  locale?: keyof typeof l10n
  messages: MessageType.Any[]
  showUserAvatar?: boolean
  showUserNames?: boolean
  theme?: Theme
  user: User
  // NOTE: not implemented buildCustomMessage
  onMessageTap?: (message: MessageType.Derived) => void
  disableImageGallery?: boolean
  isLastPage?: boolean
}

export const Chat = ({
  buildCustomMessage,
  customDateHeaderText,
  dateFormat = 'DD.MM.YYYY',
  flatListProps,
  inputProps,
  isAttachmentUploading,
  l10nOverride,
  locale = 'en',
  messages: messagesData,
  onAttachmentPress,
  onFilePress,
  onPreviewDataFetched,
  onSendPress,
  renderFileMessage,
  renderImageMessage,
  renderTextMessage,
  showUserAvatar = false,
  showUserNames = false,
  textInputProps,
  theme = defaultTheme,
  user,
}: ChatProps) => {
  const {
    container,
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

  const { gallery: images, chatMessages: messages } = calculateChatMessages(
    messagesData,
    user,
    {
      customDateHeaderText,
      showUserNames,
      dateLocale: locale,
      dateFormat,
    }
  )

  const list = React.useRef<FlatList<MessageType.Derived>>(null)
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

  const keyExtractor = React.useCallback(
    ({ id }: MessageType.Derived) => id,
    []
  )

  const renderItem = React.useCallback(
    ({ item: message }: { item: MessageType.Derived; index: number }) => {
      const showAvatar =
        message.type !== 'dateHeader' &&
        user?.id !== message.author.id &&
        showUserAvatar &&
        !message.nextMessageInGroup
      return (
        <Message
          {...{
            buildCustomMessage,
            message,
            messageWidth,
            onFilePress,
            onImagePress: handleImagePress,
            onPreviewDataFetched,
            renderFileMessage,
            renderImageMessage,
            renderTextMessage,
            showAvatar,
          }}
        />
      )
    },
    [
      buildCustomMessage,
      handleImagePress,
      messageWidth,
      onFilePress,
      onPreviewDataFetched,
      renderFileMessage,
      renderImageMessage,
      renderTextMessage,
      showUserAvatar,
      user?.id,
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
        style={flatList}
        showsVerticalScrollIndicator={false}
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
              imageIndex={imageViewIndex}
              images={images}
              onRequestClose={handleRequestClose}
              visible={isImageViewVisible}
            />
          </SafeAreaView>
        </L10nContext.Provider>
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}
