import * as React from 'react'
import Blob from 'react-native/Libraries/Blob/Blob'
import { User } from '../types'

export const UserContext = React.createContext<User | undefined>(undefined)

export const formatBytes = (a: number, b = 2) => {
  if (a === 0) return '0 B'
  const c = b < 0 ? 0 : b,
    d = Math.floor(Math.log(a) / Math.log(1024))
  return (
    parseFloat((a / Math.pow(1024, d)).toFixed(c)) +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][d]
  )
}

export const getTextSizeInBytes = (text: string) => {
  return new Blob([text]).size
}

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16)
    const v = c === 'x' ? r : (r % 4) + 8
    return v.toString(16)
  })
}
