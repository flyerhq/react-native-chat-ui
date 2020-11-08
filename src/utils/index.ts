import dayjs from 'dayjs'
import * as React from 'react'
import Blob from 'react-native/Libraries/Blob/Blob'
import { l10n } from '../l10n'
import { defaultTheme } from '../theme'
import { Theme, User } from '../types'

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

export const initLocale = (locale?: keyof typeof l10n) => {
  const locales: { [key in keyof typeof l10n]: unknown } = {
    en: require('dayjs/locale/en'),
    pl: require('dayjs/locale/pl'),
    ru: require('dayjs/locale/ru'),
    uk: require('dayjs/locale/uk'),
  }

  locale ? locales[locale] : locales.en
  dayjs.locale(locale)
}

export const unwrap = <T>(prop: T) => prop ?? {}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16)
    const v = c === 'x' ? r : (r % 4) + 8
    return v.toString(16)
  })
}
