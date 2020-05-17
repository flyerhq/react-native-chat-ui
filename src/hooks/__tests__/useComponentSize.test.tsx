import { act, renderHook } from '@testing-library/react-hooks'
import { onLayoutEvent, size } from '../../utils/fixtures'
import { useComponentSize } from '../useComponentSize'

describe('useComponentSize', () => {
  it('returns correct size', () => {
    expect.assertions(1)
    const { result } = renderHook(() => useComponentSize())
    act(() => {
      result.current.onLayout(onLayoutEvent)
    })
    expect(result.current.size).toStrictEqual(size)
  })
})
