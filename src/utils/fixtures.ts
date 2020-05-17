import { KeyboardEvent, LayoutChangeEvent } from 'react-native'
import { Message, Size, User } from '../types'

export const keyboardEvent: KeyboardEvent = {
  duration: 10,
  easing: 'keyboard',
  endCoordinates: {
    height: 346,
    screenX: 0,
    screenY: 550,
    width: 414,
  },
  isEventFromThisApp: true,
  startCoordinates: {
    height: 243,
    screenX: 0,
    screenY: 896,
    width: 414,
  },
}

export const message: Message = {
  authorId: 'userId',
  id: 'uuidv4',
  text: 'text',
  timestamp: 0,
}

export const size: Size = {
  height: 896,
  width: 414,
}

export const onLayoutEvent: LayoutChangeEvent = {
  nativeEvent: {
    layout: { x: 0, y: 0, ...size },
  },
}

export const user: User = {
  id: 'userId',
  name: 'Alex',
}
