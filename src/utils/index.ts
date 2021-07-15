import dayjs from 'dayjs'
import * as React from 'react'
import { ColorValue } from 'react-native'
import Blob from 'react-native/Libraries/Blob/Blob'

import { l10n } from '../l10n'
import { defaultTheme } from '../theme'
import { MessageType, Theme, User } from '../types'

export const L10nContext = React.createContext<typeof l10n[keyof typeof l10n]>(
  l10n.en
)
export const ThemeContext = React.createContext<Theme>(defaultTheme)
export const UserContext = React.createContext<User | undefined>(undefined)

export const formatBytes = (size: number, fractionDigits = 2) => {
  if (size <= 0) return '0 B'
  const multiple = Math.floor(Math.log(size) / Math.log(1024))
  return (
    parseFloat((size / Math.pow(1024, multiple)).toFixed(fractionDigits)) +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][multiple]
  )
}

export const getTextSizeInBytes = (text: string) => new Blob([text]).size

// Returns user avatar and name color based on the ID
export const getUserAvatarNameColor = (user: User, colors: ColorValue[]) =>
  colors[hashCode(user.id) % colors.length]

export const getUserName = ({ firstName, lastName }: User) =>
  `${firstName ?? ''} ${lastName ?? ''}`.trim()

const hashCode = (text = '') => {
  let i,
    chr,
    hash = 0
  if (text.length === 0) return hash
  for (i = 0; i < text.length; i++) {
    chr = text.charCodeAt(i)
    // eslint-disable-next-line no-bitwise
    hash = (hash << 5) - hash + chr
    // eslint-disable-next-line no-bitwise
    hash |= 0 // Convert to 32bit integer
  }
  return hash
}

export const initLocale = (locale?: keyof typeof l10n) => {
  const locales: { [key in keyof typeof l10n]: unknown } = {
    en: require('dayjs/locale/en'),
    es: require('dayjs/locale/es'),
    pl: require('dayjs/locale/pl'),
    ru: require('dayjs/locale/ru'),
    uk: require('dayjs/locale/uk'),
  }

  locale ? locales[locale] : locales.en
  dayjs.locale(locale)
}

export const unwrap = <T>(prop: T) => prop ?? {}

const getVerboseDateTimeRepresentation = (
  dateTime: number,
  {
    dateFormat,
    dateLocale = 'en',
    timeFormat,
  }: {
    dateFormat?: string
    dateLocale?: string
    timeFormat?: string
  }
) => {
  // NOTE: check it again
  const formattedDate = dateFormat
    ? dayjs(dateTime).format(dateFormat)
    : dayjs(dateTime).locale(dateLocale).format('MMM')

  const formattedTime = timeFormat
    ? dayjs(dateTime).format(timeFormat)
    : dayjs(dateTime).locale(dateLocale).format('HH:mm')

  const localDateTime = dayjs(dateTime)
  const now = dayjs()

  if (
    localDateTime.isSame(now, 'day') &&
    localDateTime.isSame(now, 'month') &&
    localDateTime.isSame(now, 'year')
  ) {
    return formattedTime
  }

  return `${formattedDate}, ${formattedTime}`
}

export const calculateChatMessages = (
  messages: MessageType.Any[],
  user: User,
  {
    customDateHeaderText,
    dateFormat,
    dateLocale,
    showUserNames,
    timeFormat,
  }: {
    customDateHeaderText?: (dateTime: number) => string
    dateFormat: string
    dateLocale?: string
    showUserNames: boolean
    timeFormat?: string
  }
): { gallery: MessageType.Image[]; chatMessages: MessageType.Derived[] } => {
  let gallery: MessageType.Image[] = []
  let chatMessages: MessageType.Derived[] = []

  let shouldShowName = false

  for (let i = messages.length - 1; i >= 0; i--) {
    const isFirst = i === messages.length - 1
    const isLast = i === 0
    const message = messages[i]
    const messageHasCreatedAt = !!message.createdAt
    const nextMessage = isLast ? undefined : messages[i - 1]
    const nextMessageHasCreatedAt = !!nextMessage?.createdAt
    const nextMessageSameAuthor = message.author.id === nextMessage?.author.id
    const notMyMessage = message.author.id !== user.id

    let nextMessageDateThreshold = false
    let nextMessageDifferentDay = false
    let nextMessageInGroup = false
    let showName = false

    if (showUserNames) {
      const previousMessage = isFirst ? null : messages[i + 1]

      const isFirstInGroup =
        notMyMessage &&
        (message.author.id !== previousMessage?.author.id ||
          (messageHasCreatedAt &&
            previousMessage?.createdAt &&
            message.createdAt &&
            message.createdAt - previousMessage!.createdAt > 60000))

      if (isFirstInGroup) {
        shouldShowName = false
        if (message.type === 'image') {
          showName = true
        } else {
          shouldShowName = true
        }
      }

      if (message.type === 'text' && shouldShowName) {
        showName = true
        shouldShowName = false
      }
    }

    if (messageHasCreatedAt && nextMessageHasCreatedAt) {
      nextMessageDateThreshold = !!(
        nextMessage?.createdAt &&
        message.createdAt &&
        nextMessage.createdAt - message.createdAt >= 900000
      )

      nextMessageDifferentDay = nextMessage?.createdAt
        ? !dayjs(message.createdAt).isSame(nextMessage.createdAt, 'day')
        : false

      nextMessageInGroup = !!(
        nextMessageSameAuthor &&
        nextMessage?.createdAt &&
        message.createdAt &&
        nextMessage.createdAt - message.createdAt <= 60000
      )
    }

    if (isFirst && messageHasCreatedAt) {
      const text =
        customDateHeaderText?.(message.createdAt!) ??
        getVerboseDateTimeRepresentation(message.createdAt!, {
          dateFormat,
          dateLocale,
          timeFormat,
        })
      chatMessages = [{ id: text, type: 'dateHeader', text }, ...chatMessages]
    }

    chatMessages = [
      {
        ...message,
        nextMessageInGroup,
        showName:
          notMyMessage &&
          showUserNames &&
          showName &&
          !!getUserName(message.author),
        showStatus: true,
        offset: !nextMessageInGroup ? 12 : 8,
      },
      ...chatMessages,
    ]

    if (
      (nextMessageDifferentDay || nextMessageDateThreshold) &&
      nextMessage?.createdAt
    ) {
      const text =
        customDateHeaderText?.(nextMessage.createdAt) ??
        getVerboseDateTimeRepresentation(nextMessage.createdAt, {
          dateFormat,
          dateLocale,
          timeFormat,
        })

      chatMessages = [
        {
          id: text,
          text,
          type: 'dateHeader',
        },
        ...chatMessages,
      ]
    }

    if (message.type === 'image') {
      gallery = [
        ...gallery,
        { id: message.id, uri: message.uri } as MessageType.Image,
      ]
    }
  }

  return {
    gallery,
    chatMessages,
  }
}

// NOTE: check this shit and integrate logic in Chat flat list renderer
