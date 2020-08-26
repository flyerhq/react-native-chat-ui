import { StyleSheet } from 'react-native'
import { Size } from '../../types'

const styles = ({ messageWidth, size }: { messageWidth: number; size: Size }) =>
  StyleSheet.create({
    background: {
      flex: 1,
    },
    image: {
      aspectRatio: size.height > 0 ? size.width / size.height : 1,
      maxHeight: messageWidth,
      minWidth: 170,
      width: messageWidth,
    },
  })

export default styles
