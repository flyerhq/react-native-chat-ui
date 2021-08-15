import { render } from '@testing-library/react-native'
import * as React from 'react'
import { Image, View } from 'react-native'

import { defaultTheme } from '../../../theme'
import { StatusIcon } from '../StatusIcon'

describe('status icon', () => {
  it('should render null if show status is false', () => {
    expect.assertions(1)
    const { queryByTestId } = render(
      <StatusIcon
        currentUserIsAuthor={false}
        showStatus={false}
        theme={defaultTheme}
      />
    )
    expect(queryByTestId('StatusIconContainer')).toBeNull()
  })

  it('should render delivered icon', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <StatusIcon
        currentUserIsAuthor
        showStatus
        status='delivered'
        theme={defaultTheme}
      />
    )
    expect(getByTestId('DeliveredIcon')).toBeDefined()
  })

  it('should render delivered icon from theme', () => {
    expect.assertions(1)
    const { queryByTestId } = render(
      <StatusIcon
        currentUserIsAuthor
        showStatus
        status='delivered'
        theme={{
          ...defaultTheme,
          icons: {
            deliveredIcon: () => (
              <Image source={require('../../../assets/icon-delivered.png')} />
            ),
          },
        }}
      />
    )
    expect(queryByTestId('DeliveredIcon')).toBeNull()
  })

  it('should render delivered icon with sent status', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <StatusIcon
        currentUserIsAuthor
        showStatus
        status='sent'
        theme={defaultTheme}
      />
    )
    expect(getByTestId('DeliveredIcon')).toBeDefined()
  })

  it('should render delivered icon with sent status from theme', () => {
    expect.assertions(1)
    const { queryByTestId } = render(
      <StatusIcon
        currentUserIsAuthor
        showStatus
        status='sent'
        theme={{
          ...defaultTheme,
          icons: {
            deliveredIcon: () => (
              <Image source={require('../../../assets/icon-delivered.png')} />
            ),
          },
        }}
      />
    )
    expect(queryByTestId('DeliveredIcon')).toBeNull()
  })

  it('should render error icon', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <StatusIcon
        currentUserIsAuthor
        showStatus
        status='error'
        theme={defaultTheme}
      />
    )
    expect(getByTestId('ErrorIcon')).toBeDefined()
  })

  it('should render error icon from theme', () => {
    expect.assertions(1)
    const { queryByTestId } = render(
      <StatusIcon
        currentUserIsAuthor
        showStatus
        status='error'
        theme={{
          ...defaultTheme,
          icons: {
            errorIcon: () => (
              <Image source={require('../../../assets/icon-error.png')} />
            ),
          },
        }}
      />
    )
    expect(queryByTestId('ErrorIcon')).toBeNull()
  })

  it('should render seen icon', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <StatusIcon
        currentUserIsAuthor
        showStatus
        status='seen'
        theme={defaultTheme}
      />
    )
    expect(getByTestId('SeenIcon')).toBeDefined()
  })

  it('should render seen icon from theme', () => {
    expect.assertions(1)
    const { queryByTestId } = render(
      <StatusIcon
        currentUserIsAuthor
        showStatus
        status='seen'
        theme={{
          ...defaultTheme,
          icons: {
            seenIcon: () => (
              <Image source={require('../../../assets/icon-seen.png')} />
            ),
          },
        }}
      />
    )
    expect(queryByTestId('SeenIcon')).toBeNull()
  })

  it('should render activity indicator', () => {
    expect.assertions(1)
    const { getByTestId } = render(
      <StatusIcon
        currentUserIsAuthor
        showStatus
        status='sending'
        theme={defaultTheme}
      />
    )
    expect(getByTestId('CircularActivityIndicator')).toBeDefined()
  })

  it('should render sending icon from theme', () => {
    expect.assertions(1)
    const { queryByTestId } = render(
      <StatusIcon
        currentUserIsAuthor
        showStatus
        status='sending'
        theme={{
          ...defaultTheme,
          icons: {
            sendingIcon: () => <View />,
          },
        }}
      />
    )
    expect(queryByTestId('CircularActivityIndicator')).toBeNull()
  })
})
