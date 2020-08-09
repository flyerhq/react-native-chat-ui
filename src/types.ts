// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MessageType {
  export type Any = Image | Text

  interface Base {
    authorId: string
    id: string
    timestamp: number
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

export type SendImageCallback = (payload: {
  height?: number
  imageUrl: string
  width?: number
}) => void

export interface Size {
  height: number
  width: number
}

export interface User {
  id: string
  name: string
}
