import * as React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { MessageType, Theme } from '../../types'
import { getUserAvatarNameColor, getUserInitials } from '../../utils'

export const Avatar = React.memo(
  ({
    author,
    currentUserIsAuthor,
    showAvatar,
    showUserAvatars,
    theme,
  }: {
    author: MessageType.Any['author']
    currentUserIsAuthor: boolean
    showAvatar: boolean
    showUserAvatars?: boolean
    theme: Theme
  }) => {
    const renderAvatar = () => {
      const color = getUserAvatarNameColor(
        author,
        theme.colors.userAvatarNameColors
      )
      const initials = getUserInitials(author)

      if (author.imageUrl) {
        return (
          <Image
            accessibilityRole='image'
            resizeMode='cover'
            source={{ uri: author.imageUrl }}
            style={[
              styles.image,
              { backgroundColor: theme.colors.userAvatarImageBackground },
            ]}
          />
        )
      }

      return (
        <View style={[styles.avatarBackground, { backgroundColor: color }]}>
          <Text style={theme.fonts.userAvatarTextStyle}>{initials}</Text>
        </View>
      )
    }

    return !currentUserIsAuthor && showUserAvatars ? (
      <View testID='AvatarContainer'>
        {showAvatar ? renderAvatar() : <View style={styles.placeholder} />}
      </View>
    ) : null
  }
)

const styles = StyleSheet.create({
  avatarBackground: {
    alignItems: 'center',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    marginRight: 8,
    width: 32,
  },
  image: {
    alignItems: 'center',
    borderRadius: 16,
    height: 32,
    justifyContent: 'center',
    marginRight: 8,
    width: 32,
  },
  placeholder: {
    width: 40,
  },
})
