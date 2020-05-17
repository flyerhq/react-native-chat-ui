import Blob from 'react-native/Libraries/Blob/Blob'

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
