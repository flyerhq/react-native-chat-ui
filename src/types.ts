// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MessageType {
  export type Any = File | Image | Text

  interface Base {
    authorId: string
    id: string
    timestamp: number
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

export interface User {
  id: string
  name: string
}
