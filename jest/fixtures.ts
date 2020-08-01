import { MessageType, Size, User } from '../src/types'

export const imageMessage: MessageType.Image = {
  authorId: 'userId',
  id: 'uuidv4',
  imageUrl: 'imageUrl',
  timestamp: 0,
  type: 'image',
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
