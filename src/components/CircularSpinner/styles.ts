import { StyleSheet } from 'react-native'

const styles = ({ color, size }: { color?: string; size?: number }) =>
  StyleSheet.create({
    circle: {
      backgroundColor: 'transparent',
      borderRadius: size ? size / 2 : 20,
      borderBottomColor: 'transparent',
      borderLeftColor: color ?? '#fff',
      borderRightColor: color ?? '#fff',
      borderTopColor: color ?? '#fff',
      borderWidth: 3,
      height: size ?? 40,
      position: 'absolute',
      width: size ?? 40,
    },
  })

export default styles
