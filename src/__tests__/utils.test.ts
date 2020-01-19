import { getTextSizeInBytes } from '../utils'

test('it calculates size in bytes for the simple text', () => {
  const text = 'text'
  expect(getTextSizeInBytes(text)).toEqual(4)
})

test('it calculates size in bytes for the emoji text', () => {
  const text = '🤔 🤓'
  expect(getTextSizeInBytes(text)).toEqual(9)
})
