import { getTextSizeInBytes, uuidv4 } from '..'

describe('getTextSizeInBytes', () => {
  it('calculates the size for a simple text', () => {
    expect.assertions(1)
    const text = 'text'
    expect(getTextSizeInBytes(text)).toStrictEqual(4)
  })

  it('calculates the size for an emoji text', () => {
    expect.assertions(1)
    const text = '🤔 🤓'
    expect(getTextSizeInBytes(text)).toStrictEqual(9)
  })
})

describe('uuiv4', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
    jest.spyOn(Math, 'random').mockReturnValue(0)
  })

  it('generates specific id when Math.random returns only 0', () => {
    expect.assertions(1)
    expect(uuidv4()).toStrictEqual('00000000-0000-4000-8000-000000000000')
  })
})
