import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  input: {
    color: '#fff',
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    maxHeight: 200,
    // Fixes default paddings
    paddingBottom: 0,
    paddingHorizontal: 16,
    paddingTop: 0,
  },
  keyboardAccessoryView: {
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  spinner: {
    position: 'relative',
  },
})
