import React, { memo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { colors, getUserAvatarNameColor, getUserName, MessageType } from '../..'

export const Avatar = memo(
  ({
    showAvatar,
    author,
  }: {
    showAvatar: boolean
    author: MessageType.Any['author']
  }) => {
    const color = getUserAvatarNameColor(author, colors)
    const name = getUserName(author)

    const renderAvatarBackground = () => {
      if (author.imageUrl) {
        return (
          <Image
            accessibilityRole='image'
            resizeMode='cover'
            source={{ uri: author.imageUrl }}
            style={styles.image}
          />
        )
      }
      return (
        <View
          style={StyleSheet.flatten([
            styles.avatarBackground,
            { backgroundColor: color },
          ])}
        >
          <Text style={styles.name}>{name ? name[0] : ''}</Text>
        </View>
      )
    }

    return (
      <View testID='AvatarContainer'>
        {showAvatar && renderAvatarBackground()}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  avatarBackground: {
    borderRadius: 16,
    height: 32,
    width: 32,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 16,
    height: 32,
    width: 32,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    // NOTE: what color should be here
    color: 'white',
  },
})
