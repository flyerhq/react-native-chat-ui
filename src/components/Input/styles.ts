import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
  },
  input: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    maxHeight: 200,
    // Fixes default Android paddings
    margin: 0,
    padding: 0,
    paddingHorizontal: 16,
    paddingBottom: 8,
    // Fixes iOS top padding for multiline
    paddingTop: 8,
    flex: 1,
  },
  keyboardAccessoryView: {
    backgroundColor: '#000',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
})
