import { render } from '@testing-library/react-native'
import React from 'react'
import { Text, View } from 'react-native'

import { textMessage } from '../../../../jest/fixtures'
import { MessageType } from '../../../types'
import { Message } from '../Message'

describe('message', () => {
  const buildCustomMessage = (message: MessageType.Derived) => {
    return (
      <View testID='CustomMessage'>
        <Text>{message.type}</Text>
      </View>
    )
  }
  it('renders custom message', () => {
    expect.assertions(2)
    const { getByTestId, getByText } = render(
      <Message
        message={{ ...textMessage, type: 'custom' }}
        messageWidth={440}
        buildCustomMessage={buildCustomMessage}
        showAvatar={false}
        onMessageLongPress={jest.fn}
      />
    )
    expect(getByTestId('CustomMessage')).toBeDefined()
    expect(getByText('custom')).toBeDefined()
  })

  it('renders undefined in ContentContainer', () => {
    expect.assertions(2)
    const { getByTestId } = render(
      <Message
        message={{ ...textMessage, type: 'custom' }}
        messageWidth={440}
        showAvatar={false}
        onMessagePress={jest.fn}
      />
    )
    const ContentContainer = getByTestId('ContentContainer')
    expect(ContentContainer).toBeDefined()
    expect(ContentContainer).toHaveProperty('props.children[0]', undefined)
  })

  it('renders undefined in ContentContainer with wrong message type', () => {
    expect.assertions(2)
    const { getByTestId } = render(
      <Message
        // @ts-ignore
        message={{ ...textMessage, type: 'wrong' }}
        messageWidth={440}
        showAvatar={false}
        onMessagePress={jest.fn}
      />
    )
    const ContentContainer = getByTestId('ContentContainer')
    expect(ContentContainer).toBeDefined()
    expect(ContentContainer).toHaveProperty('props.children[0]', undefined)
  })
})
