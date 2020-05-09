import { getTextSizeInBytes, uuidv4 } from '../'

describe('Text size in bytes', () => {
  test('it calculates the size for a simple text', () => {
    const text = 'text'
    expect(getTextSizeInBytes(text)).toEqual(4)
  })

  test('it calculates the size for an emoji text', () => {
    const text = '🤔 🤓'
    expect(getTextSizeInBytes(text)).toEqual(9)
  })
})

describe('uuiv4', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.spyOn(Math, 'random').mockReturnValue(0)
  })

  test('it generates specific id when Math.random returns only 0', () => {
    expect(uuidv4()).toEqual('00000000-0000-4000-8000-000000000000')
  })
})
