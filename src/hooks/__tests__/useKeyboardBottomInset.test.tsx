import { act, renderHook } from '@testing-library/react-hooks'
import { KeyboardEvent } from 'react-native'
import { useKeyboardBottomInset } from '../useKeyboardBottomInset'

jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation', () => ({
  ...jest.requireActual(
    'react-native/Libraries/LayoutAnimation/LayoutAnimation'
  ),
  configureNext: jest.fn(),
}))

jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({ height: 812 })),
}))

const eventMock = {
  duration: 10,
  easing: 'keyboard',
  endCoordinates: {
    screenX: 0,
    screenY: 333,
    width: 0,
    height: 0,
  },
  startCoordinates: {
    screenX: 0,
    screenY: 0,
    width: 0,
    height: 0,
  },
  isEventFromThisApp: true,
} as KeyboardEvent

test('returns correct bottom inset', () => {
  const event = { ...eventMock }
  const { result } = renderHook(() => useKeyboardBottomInset())

  act(() => {
    result.current.updateBottomInset(event)
  })

  expect(result.current.bottomInset).toBe(479)
})

test('returns correct bottom inset with longer animation time', () => {
  const event = {
    ...eventMock,
    duration: 20,
  }
  const { result } = renderHook(() => useKeyboardBottomInset())

  act(() => {
    result.current.updateBottomInset(event)
  })

  expect(result.current.bottomInset).toBe(479)
})

test('does not configure animation if keyboard event duration is 0', () => {
  const event = {
    ...eventMock,
    duration: 0,
  }
  const { result } = renderHook(() => useKeyboardBottomInset())

  act(() => {
    result.current.updateBottomInset(event)
  })

  expect(result.current.bottomInset).toBe(479)
})

test('skips setBottomInset if bottom inset does not change', () => {
  const event = {
    ...eventMock,
    endCoordinates: {
      ...eventMock.endCoordinates,
      screenY: 812,
    },
  }
  const { result } = renderHook(() => useKeyboardBottomInset())

  act(() => {
    result.current.updateBottomInset(event)
  })

  expect(result.current.bottomInset).toBe(0)
})
