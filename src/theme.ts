import { ColorValue } from 'react-native'

import { Theme } from './types'

// For internal usage only. Use values from theme itself.

/** @see {@link ThemeColors.userAvatarNameColors} */
export const COLORS: ColorValue[] = [
  '#ff6767',
  '#66e0da',
  '#f5a2d9',
  '#f0c722',
  '#6a85e5',
  '#fd9a6f',
  '#92db6e',
  '#73b8e5',
  '#fd7590',
  '#c78ae5',
]

/** Dark */
const DARK = '#1f1c38'

/** Error */
const ERROR = '#ff6767'

/** N0 */
const NEUTRAL_0 = '#1d1c21'

/** N2 */
const NEUTRAL_2 = '#9e9cab'

/** N7 */
const NEUTRAL_7 = '#ffffff'

/** N7 with opacity */
const NEUTRAL_7_WITH_OPACITY = '#ffffff80'

/** Primary */
const PRIMARY = '#6f61e8'

/** Secondary */
const SECONDARY = '#f5f5f7'

/** Secondary dark */
const SECONDARY_DARK = '#2b2250'

/** Default chat theme which implements {@link Theme} */
export const defaultTheme: Theme = {
  borders: {
    inputBorderRadius: 20,
    messageBorderRadius: 20,
  },
  colors: {
    background: NEUTRAL_7,
    error: ERROR,
    inputBackground: NEUTRAL_0,
    inputText: NEUTRAL_7,
    primary: PRIMARY,
    receivedMessageDocumentIcon: PRIMARY,
    secondary: SECONDARY,
    sentMessageDocumentIcon: NEUTRAL_7,
    userAvatarImageBackground: 'transparent',
    userAvatarNameColors: COLORS,
  },
  fonts: {
    dateDividerTextStyle: {
      color: NEUTRAL_2,
      fontSize: 12,
      fontWeight: '800',
      lineHeight: 16,
    },
    emptyChatPlaceholderTextStyle: {
      color: NEUTRAL_2,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    inputTextStyle: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    receivedMessageBodyTextStyle: {
      color: NEUTRAL_0,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    receivedMessageCaptionTextStyle: {
      color: NEUTRAL_2,
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16,
    },
    receivedMessageLinkDescriptionTextStyle: {
      color: NEUTRAL_0,
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    receivedMessageLinkTitleTextStyle: {
      color: NEUTRAL_0,
      fontSize: 16,
      fontWeight: '800',
      lineHeight: 22,
    },
    sentMessageBodyTextStyle: {
      color: NEUTRAL_7,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    sentMessageCaptionTextStyle: {
      color: NEUTRAL_7_WITH_OPACITY,
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16,
    },
    sentMessageLinkDescriptionTextStyle: {
      color: NEUTRAL_7,
      fontSize: 14,
      fontWeight: '400',
      lineHeight: 20,
    },
    sentMessageLinkTitleTextStyle: {
      color: NEUTRAL_7,
      fontSize: 16,
      fontWeight: '800',
      lineHeight: 22,
    },
    userAvatarTextStyle: {
      color: NEUTRAL_7,
      fontSize: 12,
      fontWeight: '800',
      lineHeight: 16,
    },
    userNameTextStyle: {
      fontSize: 12,
      fontWeight: '800',
      lineHeight: 16,
    },
  },
  insets: {
    messageInsetsHorizontal: 20,
    messageInsetsVertical: 16,
  },
}

/** Dark chat theme which implements {@link Theme} */
export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    background: DARK,
    inputBackground: SECONDARY_DARK,
    secondary: SECONDARY_DARK,
  },
  fonts: {
    ...defaultTheme.fonts,
    dateDividerTextStyle: {
      ...defaultTheme.fonts.dateDividerTextStyle,
      color: NEUTRAL_7,
    },
    receivedMessageBodyTextStyle: {
      ...defaultTheme.fonts.receivedMessageBodyTextStyle,
      color: NEUTRAL_7,
    },
    receivedMessageCaptionTextStyle: {
      ...defaultTheme.fonts.receivedMessageCaptionTextStyle,
      color: NEUTRAL_7_WITH_OPACITY,
    },
    receivedMessageLinkDescriptionTextStyle: {
      ...defaultTheme.fonts.receivedMessageLinkDescriptionTextStyle,
      color: NEUTRAL_7,
    },
    receivedMessageLinkTitleTextStyle: {
      ...defaultTheme.fonts.receivedMessageLinkTitleTextStyle,
      color: NEUTRAL_7,
    },
  },
}
