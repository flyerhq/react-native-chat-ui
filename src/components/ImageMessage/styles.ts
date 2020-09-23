import { StyleSheet } from 'react-native'

const styles = ({
  aspectRatio,
  messageWidth,
}: {
  aspectRatio: number
  messageWidth: number
}) =>
  StyleSheet.create({
    background: {
      flex: 1,
    },
    image: {
      aspectRatio,
      maxHeight: messageWidth,
      minWidth: 170,
      width: messageWidth,
    },
    minimizedImage: {
      borderRadius: 20,
      height: 80,
      margin: 8,
      width: 80,
    },
  })

export default styles
