import * as React from 'react'
import Blob from 'react-native/Libraries/Blob/Blob'
import { defaultTheme } from '../theme'
import { Theme, User } from '../types'

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

export const unwrap = <T>(prop: T) => prop ?? {}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16)
    const v = c === 'x' ? r : (r % 4) + 8
    return v.toString(16)
  })
}
