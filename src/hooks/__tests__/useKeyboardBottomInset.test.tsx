import { act, renderHook } from '@testing-library/react-hooks'
import { Keyboard, NativeEventEmitter } from 'react-native'
import { keyboardEvent } from '../../utils/fixtures'
import { useKeyboardBottomInset } from '../useKeyboardBottomInset'

const emitter = new NativeEventEmitter()

describe('useKeyboardBottomInset', () => {
  it('returns correct bottom inset', () => {
    expect.assertions(2)
    jest.spyOn(Keyboard, 'removeAllListeners')
    const event = { ...keyboardEvent }
    const { result, unmount } = renderHook(() => useKeyboardBottomInset())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', event)
    })
    expect(result.current.bottomInset).toStrictEqual(346)
    unmount()
    expect(Keyboard.removeAllListeners).toHaveBeenCalledWith(
      'keyboardWillChangeFrame'
    )
  })

  it('returns correct bottom inset with longer animation duration', () => {
    expect.assertions(1)
    const event = {
      ...keyboardEvent,
      duration: 250,
    }
    const { result } = renderHook(() => useKeyboardBottomInset())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', event)
    })
    expect(result.current.bottomInset).toStrictEqual(346)
  })

  it('returns correct bottom inset with no animation duration', () => {
    expect.assertions(1)
    const event = {
      ...keyboardEvent,
      duration: 0,
    }
    const { result } = renderHook(() => useKeyboardBottomInset())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', event)
    })
    expect(result.current.bottomInset).toStrictEqual(346)
  })

  it('skips setBottomInset if bottom inset does not change', () => {
    expect.assertions(1)
    const event = {
      ...keyboardEvent,
      endCoordinates: {
        ...keyboardEvent.endCoordinates,
        screenY: 896,
      },
    }
    const { result } = renderHook(() => useKeyboardBottomInset())
    act(() => {
      emitter.emit('keyboardWillChangeFrame', event)
    })
    expect(result.current.bottomInset).toStrictEqual(0)
  })
})
