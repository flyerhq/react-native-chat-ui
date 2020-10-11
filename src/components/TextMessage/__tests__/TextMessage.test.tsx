import * as utils from '@flyerhq/react-native-link-preview/lib/utils'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import * as React from 'react'
import { Linking } from 'react-native'
import { textMessage } from '../../../../jest/fixtures'
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
        message={{ ...textMessage, text: link }}
        messageWidth={440}
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
})
