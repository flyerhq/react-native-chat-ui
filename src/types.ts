// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace MessageType {
  export type Any = Image | Text

  interface Base {
    authorId: string
    id: string
    timestamp: number
  }

  export interface Image extends Base {
    imageUrl: string
    text?: string
    type: 'image'
  }

  export interface Text extends Base {
    text: string
    type: 'text'
  }
}

export interface Size {
  height: number
  width: number
}

export interface User {
  id: string
  name: string
}
