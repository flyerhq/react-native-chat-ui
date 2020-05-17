import { act, renderHook } from '@testing-library/react-hooks'
import { keyboardEvent } from '../../utils/fixtures'
import { useKeyboardBottomInset } from '../useKeyboardBottomInset'

describe('useKeyboardBottomInset', () => {
  it('returns correct bottom inset', () => {
    expect.assertions(1)
    const event = { ...keyboardEvent }
    const { result } = renderHook(() => useKeyboardBottomInset())
    act(() => {
      result.current.updateBottomInset(event)
    })
    expect(result.current.bottomInset).toStrictEqual(346)
  })

  it('returns correct bottom inset with longer animation time', () => {
    expect.assertions(1)
    const event = {
      ...keyboardEvent,
      duration: 20,
    }
    const { result } = renderHook(() => useKeyboardBottomInset())
    act(() => {
      result.current.updateBottomInset(event)
    })
    expect(result.current.bottomInset).toStrictEqual(346)
  })

  it('does not configure animation if keyboard event duration is 0', () => {
    expect.assertions(1)
    const event = {
      ...keyboardEvent,
      duration: 0,
    }
    const { result } = renderHook(() => useKeyboardBottomInset())
    act(() => {
      result.current.updateBottomInset(event)
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
      result.current.updateBottomInset(event)
    })
    expect(result.current.bottomInset).toStrictEqual(0)
  })
})
