import { Dimensions, StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 2,
    paddingRight: Dimensions.get('screen').width * 0.18,
    paddingLeft: Dimensions.get('screen').width * 0.02,
  },
  message: {
    backgroundColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
})
