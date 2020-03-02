import * as React from 'react'
import { render } from 'react-native-testing-library'
import { TextMessage } from '../TextMessage'

test('it renders text', () => {
  const text = 'text'
  const { getByText } = render(<TextMessage text={text} />)
  const textComponent = getByText(text)
  expect(textComponent).toBeDefined()
})
