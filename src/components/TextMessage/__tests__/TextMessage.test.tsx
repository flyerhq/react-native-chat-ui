import * as utils from '@flyerhq/react-native-link-preview/lib/utils'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import * as React from 'react'
import { Linking } from 'react-native'

import { derivedTextMessage } from '../../../../jest/fixtures'
import { TextMessage } from '../TextMessage'

describe('text message', () => {
  it('renders preview image and handles link press', async () => {
    expect.assertions(2)
    const link = 'https://github.com/flyerhq/'
    const getPreviewDataMock = jest
      .spyOn(utils, 'getPreviewData')
      .mockResolvedValue({
        description: 'description',
        image: {
          height: 460,
          url: 'https://avatars2.githubusercontent.com/u/59206044',
          width: 460,
        },
        link,
        title: 'title',
      })
    const openUrlMock = jest.spyOn(Linking, 'openURL')
    const { getByRole, getByText } = render(
      <TextMessage
        message={{
          ...derivedTextMessage,
          author: { id: 'newUserId', firstName: 'John' },
          text: link,
        }}
        messageWidth={440}
        onPreviewDataFetched={jest.fn}
        showName
        usePreviewData
      />
    )
    await waitFor(() => getByRole('image'))
    const image = getByRole('image')
    expect(image).toBeDefined()
    const text = getByText(link)
    fireEvent.press(text)
    expect(openUrlMock).toHaveBeenCalledWith(link)
    getPreviewDataMock.mockRestore()
    openUrlMock.mockRestore()
  })

  it('renders preview image without https and handles link press', async () => {
    expect.assertions(2)
    const link = 'github.com/flyerhq/'
    const getPreviewDataMock = jest
      .spyOn(utils, 'getPreviewData')
      .mockResolvedValue({
        description: 'description',
        image: {
          height: 460,
          url: 'https://avatars2.githubusercontent.com/u/59206044',
          width: 460,
        },
        link,
        title: 'title',
      })
    const openUrlMock = jest.spyOn(Linking, 'openURL')
    const { getByRole, getByText } = render(
      <TextMessage
        message={{ ...derivedTextMessage, text: link }}
        messageWidth={440}
        onPreviewDataFetched={jest.fn}
        showName={false}
        usePreviewData
      />
    )
    await waitFor(() => getByRole('image'))
    const image = getByRole('image')
    expect(image).toBeDefined()
    const text = getByText(link)
    fireEvent.press(text)
    expect(openUrlMock).toHaveBeenCalledWith('https://' + link)
    getPreviewDataMock.mockRestore()
    openUrlMock.mockRestore()
  })
})
