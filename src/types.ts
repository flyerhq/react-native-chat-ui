import { PreviewData } from '@flyerhq/react-native-link-preview'
import { ColorValue, StyleProp, TextStyle } from 'react-native'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MessageType {
  export type Any = File | Image | Text

  interface Base {
    authorId: string
    id: string
    status?: 'error' | 'read' | 'sending' | 'sent'
    timestamp: number
    type: 'file' | 'image' | 'text'
  }

  export interface File extends Base {
    fileName: string
    mimeType?: string
    size: number
    type: 'file'
    url: string
  }

  export interface Image extends Base {
    height?: number
    imageName: string
    size: number
    type: 'image'
    url: string
    width?: number
  }

  export interface Text extends Base {
    previewData?: PreviewData
    text: string
    type: 'text'
  }
}

export type SendAttachmentCallback = (
  payload: SendAttachmentCallbackParams
) => void

export type SendAttachmentCallbackParams =
  | SendFileCallbackParams
  | SendImageCallbackParams

export type SendFileCallback = (payload: SendFileCallbackParams) => void

export interface SendFileCallbackParams {
  fileName: string
  mimeType?: string
  size: number
  url: string
}

export type SendImageCallback = (payload: SendImageCallbackParams) => void

export interface SendImageCallbackParams {
  height?: number
  imageName: string
  size: number
  url: string
  width?: number
}

export interface Size {
  height: number
  width: number
}

export interface Theme {
  colors: ThemeColors
  fonts: ThemeFonts
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

export interface User {
  id: string
  name: string
}
