import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  wrapper: {
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    paddingHorizontal: 32,
    paddingVertical: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  input: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    maxHeight: 200,
    // Fixes default Android paddings
    margin: 0,
    padding: 0,
    paddingRight: 16,
    paddingBottom: 8,
    // Fixes iOS top padding for multiline
    paddingTop: 8,
    flex: 1,
  },
})
