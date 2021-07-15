import React, { memo } from 'react'
import { Image, ImageStyle, StyleProp, StyleSheet, View } from 'react-native'
const iconSeen = require('../../assets/icon-seen.png')
const iconDelivered = require('../../assets/icon-delivered.png')
const iconError = require('../../assets/icon-error.png')

import { CircularActivityIndicator, MessageType, Theme } from '../..'

export const ImageStatusIcon = memo(
  ({
    currentUserIsAuthor,
    status,
    style,
    theme,
  }: {
    currentUserIsAuthor: boolean
    status: MessageType.Any['status']
    style?: StyleProp<ImageStyle>
    theme: Theme
  }) => {
    let statusIcon
    switch (status) {
      case 'delivered':
        statusIcon = theme.icons?.deliveredIcon ? (
          <Image
            source={theme.icons?.deliveredIcon}
            style={style}
            testID='ThemeDeliveredIconImage'
          />
        ) : (
          <Image
            source={iconDelivered}
            style={style}
            testID='DeliveredIconImage'
          />
        )
        break
      case 'error':
        statusIcon = (
          <Image source={iconError} style={style} testID='ErrorIconImage' />
        )
        break
      case 'seen':
      case 'sent':
        statusIcon = theme.icons?.seenIcon ? (
          <Image
            source={theme.icons?.seenIcon}
            style={style}
            testID='ThemeSeenIconImage'
          />
        ) : (
          <Image source={iconSeen} style={style} testID='SeenIconImage' />
        )
        break
      case 'sending':
        statusIcon = (
          <CircularActivityIndicator color={theme.colors.primary} size={12} />
        )
        break
      default:
        break
    }
    return (
      <View testID='StatusIconContainer' style={styles.container}>
        {currentUserIsAuthor ? statusIcon : null}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 20,
    justifyContent: 'center',
    padding: 4,
    width: 20,
  },
})
