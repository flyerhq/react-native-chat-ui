import { MessageType, Size, User } from '../src/types'

export const fileMessage: MessageType.File = {
  authorId: 'userId',
  fileName: 'test.pdf',
  fileUrl: 'file:///Users/admin/dummy.pdf',
  id: 'uuidv4',
  size: 15000,
  timestamp: 0,
  type: 'file',
}

export const imageMessage: MessageType.Image = {
  authorId: 'userId',
  height: 100,
  id: 'uuidv4',
  imageUrl: 'https://avatars1.githubusercontent.com/u/59206044',
  timestamp: 0,
  type: 'image',
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
