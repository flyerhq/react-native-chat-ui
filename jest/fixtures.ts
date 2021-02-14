import { MessageType, Size, User } from '../src/types'

export const fileMessage: MessageType.File = {
  authorId: 'userId',
  fileName: 'flyer.pdf',
  id: 'file-uuidv4',
  mimeType: 'application/pdf',
  size: 15000,
  status: 'read',
  timestamp: 2000000,
  type: 'file',
  url: 'file:///Users/admin/flyer.pdf',
}

export const imageMessage: MessageType.Image = {
  authorId: 'image-userId',
  height: 100,
  id: 'image-uuidv4',
  imageName: 'imageName',
  size: 15000,
  status: 'sending',
  timestamp: 0,
  type: 'image',
  url: 'https://avatars1.githubusercontent.com/u/59206044',
  width: 100,
}

export const size: Size = {
  height: 896,
  width: 414,
}

export const textMessage: MessageType.Text = {
  authorId: 'userId',
  id: 'uuidv4',
  text: 'text',
  timestamp: 0,
  type: 'text',
}

export const user: User = {
  id: 'userId',
}
