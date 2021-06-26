import { MessageType, Size, User } from '../src/types'

export const fileMessage: MessageType.File = {
  author: {
    id: 'userId',
  },
  name: 'flyer.pdf',
  id: 'file-uuidv4',
  mimeType: 'application/pdf',
  size: 15000,
  status: 'seen',
  createdAt: 2000000,
  type: 'file',
  uri: 'file:///Users/admin/flyer.pdf',
}

export const imageMessage: MessageType.Image = {
  author: {
    id: 'image-userId',
  },
  height: 100,
  id: 'image-uuidv4',
  name: 'name',
  size: 15000,
  status: 'sending',
  createdAt: 0,
  type: 'image',
  uri: 'https://avatars1.githubusercontent.com/u/59206044',
  width: 100,
}

export const size: Size = {
  height: 896,
  width: 414,
}

export const textMessage: MessageType.Text = {
  author: {
    id: 'userId',
  },
  id: 'uuidv4',
  text: 'text',
  createdAt: 0,
  type: 'text',
}

export const user: User = {
  id: 'userId',
}
