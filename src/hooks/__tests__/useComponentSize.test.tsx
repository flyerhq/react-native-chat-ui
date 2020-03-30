import { act, renderHook } from '@testing-library/react-hooks'
import { useComponentSize } from '../useComponentSize'

test('returns correct component size', () => {
  const size = {
    height: 100,
    width: 100,
  }

  const event = {
    nativeEvent: {
      layout: { x: 0, y: 0, ...size },
    },
  }

  const { result } = renderHook(() => useComponentSize())

  act(() => {
    result.current.onLayout(event)
  })

  expect(result.current.size).toEqual(size)
})
