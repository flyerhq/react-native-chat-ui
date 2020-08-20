import { MessageType, Size, User } from '../src/types'

export const fileMessage: MessageType.File = {
  authorId: 'userId',
  id: 'uuidv4',
  mimeType: 'application/pdf',
  name: 'flyer.pdf',
  size: 15000,
  timestamp: 0,
  type: 'file',
  url: 'file:///Users/admin/flyer.pdf',
}

export const imageMessage: MessageType.Image = {
  authorId: 'userId',
  height: 100,
  id: 'uuidv4',
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
  name: 'Alex',
}
