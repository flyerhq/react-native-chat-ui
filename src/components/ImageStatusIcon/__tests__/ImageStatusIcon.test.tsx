import { render } from '@testing-library/react-native'
import * as React from 'react'

import { Theme } from '../../../types'
import { ImageStatusIcon } from '..'

describe('imageStatusIcon', () => {
  it('should render only container', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      // @ts-ignore
      <ImageStatusIcon currentUserIsAuthor={false} />
    )
    expect(getByTestId('StatusIconContainer')).toHaveProperty(
      'props.children',
      null
    )
  })

  it('should render delivered icon', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <ImageStatusIcon
        currentUserIsAuthor={true}
        status={'delivered'}
        theme={{} as Theme}
      />
    )
    expect(getByTestId('DeliveredIconImage')).toBeDefined()
  })

  it('should render delivered icon from theme', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <ImageStatusIcon
        currentUserIsAuthor={true}
        status={'delivered'}
        theme={
          {
            icons: {
              deliveredIcon: {
                uri: 'https://avatars1.githubusercontent.com/u/59206044',
              },
            },
          } as Theme
        }
      />
    )
    expect(getByTestId('ThemeDeliveredIconImage')).toBeDefined()
  })

  it('should render error icon', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <ImageStatusIcon
        currentUserIsAuthor={true}
        status={'error'}
        theme={{} as Theme}
      />
    )
    expect(getByTestId('ErrorIconImage')).toBeDefined()
  })

  it('should render seen icon', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <ImageStatusIcon
        currentUserIsAuthor={true}
        status={'seen'}
        theme={{} as Theme}
      />
    )
    expect(getByTestId('SeenIconImage')).toBeDefined()
  })

  it('should render seen icon from theme', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <ImageStatusIcon
        currentUserIsAuthor={true}
        status={'seen'}
        theme={
          {
            icons: {
              seenIcon: {
                uri: 'https://avatars1.githubusercontent.com/u/59206044',
              },
            },
          } as Theme
        }
      />
    )
    expect(getByTestId('ThemeSeenIconImage')).toBeDefined()
  })

  it('should render seen icon with sent status', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <ImageStatusIcon
        currentUserIsAuthor={true}
        status={'sent'}
        theme={{} as Theme}
      />
    )
    expect(getByTestId('SeenIconImage')).toBeDefined()
  })

  it('should render seen icon with sent status from theme', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <ImageStatusIcon
        currentUserIsAuthor={true}
        status={'sent'}
        theme={
          {
            icons: {
              seenIcon: {
                uri: 'https://avatars1.githubusercontent.com/u/59206044',
              },
            },
          } as Theme
        }
      />
    )
    expect(getByTestId('ThemeSeenIconImage')).toBeDefined()
  })

  it('should render activity indicator', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <ImageStatusIcon
        currentUserIsAuthor={true}
        status={'sending'}
        theme={{ colors: { primary: 'white' } } as Theme}
      />
    )
    expect(getByTestId('CircularActivityIndicator')).toBeDefined()
  })
})
