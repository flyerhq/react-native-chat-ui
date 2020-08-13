// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MessageType {
  export type Any = File | Image | Text

  interface Base {
    authorId: string
    id: string
    timestamp: number
  }

  export interface File extends Base {
    fileUrl: string
    fileName: string
    size?: number
    type: 'file'
  }

  export interface Image extends Base {
    height?: number
    imageUrl: string
    type: 'image'
    width?: number
  }

  export interface Text extends Base {
    text: string
    type: 'text'
  }
}

export type SendFileCallback = (payload: SendFileCallbackParameters) => void

export interface SendFileCallbackParameters {
  fileName: string
  fileUrl: string
  size?: number
}

export type SendImageCallback = (payload: SendImageCallbackParameters) => void

export interface SendImageCallbackParameters {
  height?: number
  imageUrl: string
  width?: number
}

export type SendCallback = SendFileCallback & SendImageCallback

export type SendCallbackParameters = SendFileCallbackParameters &
  SendImageCallbackParameters

export interface Size {
  height: number
  width: number
}

export interface User {
  id: string
  name: string
}
