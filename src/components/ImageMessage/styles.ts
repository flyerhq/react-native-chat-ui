import { StyleSheet } from 'react-native'
import { Size } from '../../types'

const styles = ({ size }: { size: Size }) =>
  StyleSheet.create({
    image: {
      aspectRatio: size.height > 0 ? size.width / size.height : 1,
      width: size.width < 520 ? size.width : '100%',
    },
  })

export default styles
