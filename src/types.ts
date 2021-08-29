import { PreviewData } from '@flyerhq/react-native-link-preview'
import * as React from 'react'
import { ColorValue, ImageURISource, TextStyle } from 'react-native'

export namespace MessageType {
  export type Any = Custom | File | Image | Text | Unsupported

  export type DerivedMessage =
    | DerivedCustom
    | DerivedFile
    | DerivedImage
    | DerivedText
    | DerivedUnsupported
  export type DerivedAny = DateHeader | DerivedMessage

  export type PartialAny = PartialFile | PartialImage | PartialText

  interface Base {
    author: User
    createdAt?: number
    id: string
    metadata?: Record<string, any>
    roomId?: string
    status?: 'delivered' | 'error' | 'seen' | 'sending' | 'sent'
    type: 'custom' | 'file' | 'image' | 'text' | 'unsupported'
    updatedAt?: number
  }

  export interface DerivedMessageProps extends Base {
    nextMessageInGroup: boolean
    // TODO: Check name?
    offset: number
    showName: boolean
    showStatus: boolean
  }

  export interface DerivedCustom extends DerivedMessageProps {
    type: Custom['type']
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

  export interface DerivedUnsupported extends DerivedMessageProps {
    type: Unsupported['type']
  }

  export interface Custom extends Base {
    type: 'custom'
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

  export interface DateHeader {
    id: string
    text: string
    type: 'dateHeader'
  }
}

export interface PreviewImage {
  id: string
  uri: ImageURISource['uri']
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
  error: ColorValue
  inputBackground: ColorValue
  inputText: ColorValue
  primary: ColorValue
  secondary: ColorValue
  receivedMessageDocumentIcon: ColorValue
  sentMessageDocumentIcon: ColorValue
  userAvatarImageBackground: ColorValue
  userAvatarNameColors: ColorValue[]
}

export interface ThemeFonts {
  dateDividerTextStyle: TextStyle
  emptyChatPlaceholderTextStyle: TextStyle
  inputTextStyle: TextStyle
  receivedMessageBodyTextStyle: TextStyle
  receivedMessageCaptionTextStyle: TextStyle
  receivedMessageLinkDescriptionTextStyle: TextStyle
  receivedMessageLinkTitleTextStyle: TextStyle
  sentMessageBodyTextStyle: TextStyle
  sentMessageCaptionTextStyle: TextStyle
  sentMessageLinkDescriptionTextStyle: TextStyle
  sentMessageLinkTitleTextStyle: TextStyle
  userAvatarTextStyle: TextStyle
  userNameTextStyle: TextStyle
}

export interface ThemeIcons {
  attachmentButtonIcon?: () => React.ReactNode
  deliveredIcon?: () => React.ReactNode
  documentIcon?: () => React.ReactNode
  errorIcon?: () => React.ReactNode
  seenIcon?: () => React.ReactNode
  sendButtonIcon?: () => React.ReactNode
  sendingIcon?: () => React.ReactNode
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
  updatedAt?: number
}
