import { PreviewData } from '@flyerhq/react-native-link-preview'
import {
  ColorValue,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
} from 'react-native'

export namespace MessageType {
  export type Any = File | Image | Text
  export type PartialAny = PartialFile | PartialImage | PartialText

  interface Base {
    author: string
    id: string
    status?: 'delivered' | 'error' | 'seen' | 'sending' | 'sent'
    createdAt?: number
    metadata?: Record<string, any>
    type: 'file' | 'image' | 'text'
  }

  export interface PartialFile {
    name: string
    mimeType?: string
    size: number
    uri: string
  }

  export interface File extends Base, PartialFile {
    type: 'file'
  }

  export interface PartialImage {
    height?: number
    name: string
    size: number
    uri: string
    width?: number
  }

  export interface Image extends Base, PartialImage {
    type: 'image'
  }

  export interface PartialText {
    previewData?: PreviewData
    text: string
  }

  export interface Text extends Base, PartialText {
    type: 'text'
  }
}

export interface Size {
  height: number
  width: number
}

export interface Theme {
  borders: ThemeBorders
  colors: ThemeColors
  fonts: ThemeFonts
  icons?: ThemeIcons
}

export interface ThemeBorders {
  inputBorderRadius: number
  messageBorderRadius: number
}

export interface ThemeColors {
  background: ColorValue
  caption: ColorValue
  error: ColorValue
  inputBackground: ColorValue
  inputText: ColorValue
  primary: ColorValue
  primaryText: ColorValue
  secondary: ColorValue
  secondaryText: ColorValue
  subtitle2: ColorValue
}

export interface ThemeFonts {
  body1: StyleProp<TextStyle>
  body2: StyleProp<TextStyle>
  caption: StyleProp<TextStyle>
  subtitle1: StyleProp<TextStyle>
  subtitle2: StyleProp<TextStyle>
}

export interface ThemeIcons {
  attachmentButtonIcon?: ImageSourcePropType
  deliveredIcon?: ImageSourcePropType
  documentIcon?: ImageSourcePropType
  readIcon?: ImageSourcePropType
  sendButtonIcon?: ImageSourcePropType
}

export interface User {
  createdAt: number
  firstName?: string
  id: string
  imageUrl?: string
  lastName?: string
  lastSeen?: number
  metadata?: Record<string, any>
  role?: 'admin' | 'agent' | 'moderator' | 'user'
}
