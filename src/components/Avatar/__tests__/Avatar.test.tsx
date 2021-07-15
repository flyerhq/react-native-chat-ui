import { render } from '@testing-library/react-native'
import * as React from 'react'

import { User } from '../../../types'
import { Avatar } from '..'

describe('avatar', () => {
  const author: User = {
    id: '1',
  }

  it(`should render background with empty string`, () => {
    expect.assertions(1)
    const { getByText } = render(<Avatar author={author} showAvatar />)
    expect(getByText('')).toBeDefined()
  })

  it('should render background with first letter', () => {
    expect.assertions(1)
    const authorWithName = { ...author, firstName: 'John', lastName: 'Doe' }
    const { getByText } = render(<Avatar author={authorWithName} showAvatar />)
    expect(getByText(authorWithName.firstName[0])).toBeDefined()
  })

  it('should render image background', () => {
    expect.assertions(2)
    const imageUrl = 'https://avatars.githubusercontent.com/u/14123304?v=4'
    const { getAllByRole } = render(
      <Avatar
        author={{
          ...author,
          imageUrl,
        }}
        showAvatar
      />
    )
    const image = getAllByRole('image')
    expect(image).toBeDefined()
    expect(image[0]).toHaveProperty('props.source.uri', imageUrl)
  })
})
