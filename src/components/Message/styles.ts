import { StyleSheet } from 'react-native'

import { MessageType, Theme } from '../../types'

const styles = ({
  currentUserIsAuthor,
  message,
  messageWidth,
  theme,
}: {
  currentUserIsAuthor: boolean
  message: MessageType.Derived
  messageWidth: number
  theme: Theme
}) =>
  StyleSheet.create({
    container: {
      alignItems: 'flex-end',
      alignSelf: currentUserIsAuthor ? 'flex-end' : 'flex-start',
      justifyContent: !currentUserIsAuthor ? 'flex-end' : 'flex-start',
      flex: 1,
      flexDirection: 'row',
      marginBottom: message.type === 'dateHeader' ? 0 : message.offset ?? 8,
      paddingLeft: currentUserIsAuthor ? 0 : 8,
    },
    contentContainer: {
      backgroundColor:
        !currentUserIsAuthor || message.type === 'image'
          ? theme.colors.secondary
          : theme.colors.primary,
      borderBottomLeftRadius: currentUserIsAuthor
        ? theme.borders.messageBorderRadius
        : 0,
      borderBottomRightRadius: currentUserIsAuthor
        ? 0
        : theme.borders.messageBorderRadius,
      borderColor: 'transparent',
      borderRadius: theme.borders.messageBorderRadius,
      maxWidth: messageWidth,
      overflow: 'hidden',
    },
    dateDivider: StyleSheet.flatten([
      theme.fonts.subtitle2,
      {
        color: theme.colors.subtitle2,
        textAlign: 'center',
      },
    ]),
    dateHeader: {
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 32,
      marginTop: 16,
    },
    status: {
      tintColor: theme.colors.primary,
    },
  })

export default styles
