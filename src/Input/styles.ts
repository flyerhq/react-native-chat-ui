import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#eee',
    padding: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 18,
    maxHeight: 200,
    // Fixes default Android paddings
    margin: 0,
    padding: 0,
    paddingHorizontal: 16,
    paddingBottom: 8,
    // Fixes iOS top padding for multiline
    paddingTop: 8,
    flex: 1,
    backgroundColor: '#fff',
  },
})
