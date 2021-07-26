import { PreviewData } from '@flyerhq/react-native-link-preview'
import {
  ColorValue,
  ImageSourcePropType,
  ImageURISource,
  StyleProp,
  TextStyle,
} from 'react-native'

export namespace MessageType {
  export type Any = File | Image | Text | Custom | Unsupported
  export type DerivedUserMessage =
    | DerivedCustom
    | DerivedFile
    | DerivedImage
    | DerivedText
    | DerivedUnsupported
  export type Derived = DateHeader | DerivedUserMessage

  export type PartialAny = PartialFile | PartialImage | PartialText

  interface Base {
    author: User
    createdAt?: number
    id: string
    metadata?: Record<string, any>
    roomId?: string
    status?: 'delivered' | 'error' | 'seen' | 'sending' | 'sent'
    type: 'custom' | 'file' | 'image' | 'text' | 'unsupported'
  }

  export interface Custom extends Base {
    type: 'custom'
  }

  export interface DerivedMessageProps extends Base {
    nextMessageInGroup: boolean
    offset: number
    showName: boolean
    showStatus: boolean
  }

  export interface DerivedFile extends DerivedMessageProps, File {
    type: File['type']
  }

  export interface DerivedImage extends DerivedMessageProps, Image {
    type: Image['type']
  }

  export interface DerivedText extends DerivedMessageProps, Text {
    type: Text['type']
  }

  export interface DerivedCustom extends DerivedMessageProps {
    type: Custom['type']
  }

  export interface PartialFile {
    mimeType?: string
    name: string
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

  export interface Unsupported extends Base {
    type: 'unsupported'
  }

  export interface DerivedUnsupported extends DerivedMessageProps {
    type: 'unsupported'
  }

  export interface DateHeader {
    id: string
    type: 'dateHeader'
    text: string
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
  seenIcon?: ImageSourcePropType
  sendButtonIcon?: ImageSourcePropType
}

export interface User {
  createdAt?: number
  firstName?: string
  id: string
  imageUrl?: ImageURISource['uri']
  lastName?: string
  lastSeen?: number
  metadata?: Record<string, any>
  role?: 'admin' | 'agent' | 'moderator' | 'user'
}
