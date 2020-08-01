import * as React from 'react'
import { render } from 'react-native-testing-library'
import { size, textMessage, user } from '../../../../jest/fixtures'
import { TextMessage } from '../TextMessage'

describe('text message', () => {
  it('renders text', () => {
    expect.assertions(1)
    const text = 'text'
    const { getByText } = render(
      <TextMessage
        message={textMessage}
        parentComponentSize={size}
        user={user}
      />
    )
    const textComponent = getByText(text)
    expect(textComponent).toBeDefined()
  })
})
