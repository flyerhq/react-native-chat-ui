import { MessageType, Size, User } from '../src/types'

export const fileMessage: MessageType.CalculatedFile = {
  author: {
    id: 'userId',
  },
  createdAt: 2000000,
  id: 'file-uuidv4',
  mimeType: 'application/pdf',
  name: 'flyer.pdf',
  size: 15000,
  status: 'seen',
  type: 'file',
  uri: 'file:///Users/admin/flyer.pdf',
  nextMessageInGroup: false,
  offset: 12,
  showName: false,
  showStatus: true,
}

export const imageMessage: MessageType.CalculatedImage = {
  author: {
    id: 'image-userId',
  },
  createdAt: 0,
  height: 100,
  id: 'image-uuidv4',
  name: 'name',
  size: 15000,
  status: 'sending',
  type: 'image',
  uri: 'https://avatars1.githubusercontent.com/u/59206044',
  width: 100,
  nextMessageInGroup: false,
  offset: 12,
  showName: false,
  showStatus: true,
}

export const size: Size = {
  height: 896,
  width: 414,
}

export const textMessage: MessageType.CalculatedText = {
  author: {
    id: 'userId',
  },
  createdAt: 0,
  id: 'uuidv4',
  text: 'text',
  type: 'text',
  nextMessageInGroup: false,
  offset: 12,
  showName: false,
  showStatus: true,
}

export const user: User = {
  id: 'userId',
}
