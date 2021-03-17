import { PreviewData } from '@flyerhq/react-native-link-preview'
import { ColorValue, StyleProp, TextStyle } from 'react-native'

export namespace MessageType {
  export type Any = File | Image | Text
  export type PartialAny = PartialFile | PartialImage | PartialText

  interface Base {
    authorId: string
    id: string
    status?: 'error' | 'read' | 'sending' | 'sent'
    timestamp?: number
    type: 'file' | 'image' | 'text'
  }

  export interface PartialFile {
    fileName: string
    mimeType?: string
    size: number
    uri: string
  }

  export interface File extends Base, PartialFile {
    type: 'file'
  }

  export interface PartialImage {
    height?: number
    imageName: string
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
}

export interface ThemeFonts {
  body1: StyleProp<TextStyle>
  body2: StyleProp<TextStyle>
  caption: StyleProp<TextStyle>
  subtitle1: StyleProp<TextStyle>
  subtitle2: StyleProp<TextStyle>
}

export interface ThemeIcons {
  attachmentButtonIcon?: NodeRequire
  documentIcon?: NodeRequire
  readIcon?: NodeRequire
  sendButtonIcon?: NodeRequire
  sentIcon?: NodeRequire
}

export interface User {
  avatarUrl?: string
  firstName?: string
  id: string
  lastName?: string
}
