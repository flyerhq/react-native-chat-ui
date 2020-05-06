import { getTextSizeInBytes, uuidv4 } from '../utils'

beforeEach(() => {
  jest.restoreAllMocks()
  jest.spyOn(Math, 'random').mockReturnValue(0)
})

test('it calculates size in bytes for the simple text', () => {
  const text = 'text'
  expect(getTextSizeInBytes(text)).toEqual(4)
})

test('it calculates size in bytes for the emoji text', () => {
  const text = '🤔 🤓'
  expect(getTextSizeInBytes(text)).toEqual(9)
})

test('uuidv4', () => {
  expect(uuidv4()).toEqual('00000000-0000-4000-8000-000000000000')
})
