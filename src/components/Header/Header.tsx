import dayjs from 'dayjs'
import * as React from 'react'
import { StyleSheet, Text, TextStyle } from 'react-native'

import { l10n } from '../../l10n'
import { MessageType, Theme } from '../../types'
import { CircularActivityIndicator } from '../CircularActivityIndicator'

export interface HeaderConfig {
  isLast: boolean
  nextMessageDifferentDay: boolean
  nextMessageSameAuthor: boolean
  shouldRenderDate: boolean
}

export interface HeaderProps {
  dateDivider: TextStyle
  dateDividerFormat: string
  headerConfig: HeaderConfig
  loadingMoreMessages: boolean
  locale: keyof typeof l10n
  message: MessageType.Any
  theme: Theme
}

export const Header = ({
  dateDivider,
  dateDividerFormat,
  headerConfig,
  loadingMoreMessages,
  locale,
  message,
  theme,
}: HeaderProps) => {
  const {
    isLast,
    nextMessageDifferentDay,
    nextMessageSameAuthor,
    shouldRenderDate,
  } = headerConfig
  return (
    <>
      {loadingMoreMessages && isLast ? (
        <CircularActivityIndicator
          {...{
            color: theme.colors.secondaryText,
            style: { alignSelf: 'center', marginVertical: 32 },
          }}
        />
      ) : null}
      {(nextMessageDifferentDay || shouldRenderDate) && (
        <Text
          style={StyleSheet.flatten([
            dateDivider,
            { marginTop: nextMessageSameAuthor ? 24 : 16 },
          ])}
        >
          {/* At this point we know that timestamp exists, so we can safely force unwrap it */}
          {/* type-coverage:ignore-next-line */}
          {dayjs.unix(message.timestamp!).calendar(undefined, {
            sameDay: `[${l10n[locale].today}]`,
            nextDay: dateDividerFormat,
            nextWeek: dateDividerFormat,
            lastDay: `[${l10n[locale].yesterday}]`,
            lastWeek: dateDividerFormat,
            sameElse: dateDividerFormat,
          })}
        </Text>
      )}
    </>
  )
}
