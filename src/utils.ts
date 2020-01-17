import Blob from 'react-native/Libraries/Blob/Blob'

export const getTextSizeInBytes = (text: string) => {
  return new Blob([text]).size
}
