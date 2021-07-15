---
id: props
title: Props
---

:::note

Question mark shows optional types.

:::

| Name                   | Type                                                                                        | Description                                                                                           |
| ---------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| dateFormat?            | string                                                                                      | Date format used for dividers                                                                         |
| flatListProps?         | `FlatListProps<MessageType.Any[]>`                                                          | Main flat list props                                                                                  |
| inputProps?            | [InputAdditionalProps](#inputadditionalprops)                                               | Additional props for the components that are on the bottom bar                                        |
| isAttachmentUploading? | boolean                                                                                     | If true, shows spinner instead of attachment button, useful to show while something is being uploaded |
| l10nOverride?          | ...                                                                                         | See [localization](localization)                                                                      |
| locale?                | ...                                                                                         | See [localization](localization)                                                                      |
| messages               | MessageType.Any[]                                                                           | Messages array                                                                                        |
| onAttachmentPress?     | () => void                                                                                  | Called when attachment button is pressed                                                              |
| onFilePress?           | (message: MessageType.File) => void                                                         | Called when user taps on a file message                                                               |
| onPreviewDataFetched?  | ({ message, previewData }: { message: MessageType.Text; previewData: PreviewData }) => void | Called when a link that is found in the text is unwrapped in a rich preview. Use it to save the data. |
| onSendPress            | (message: MessageType.PartialText) => void                                                  | Called when send button is pressed, use `message` parameter to create a text message                  |
| renderFileMessage?     | (message: MessageType.File, messageWidth: number) => React.ReactNode                        | Render prop for the file message                                                                      |
| renderImageMessage?    | (message: MessageType.Image, messageWidth: number) => React.ReactNode                       | Render prop for the image message                                                                     |
| renderTextMessage?     | (message: MessageType.Text, messageWidth: number) => React.ReactNode                        | Render prop for the text message                                                                      |
| textInputProps?        | TextInputProps                                                                              | Main input props                                                                                      |
| theme?                 | ...                                                                                         | See [themes](themes)                                                                                  |
| user                   | User                                                                                        | Current logged in user, used to determine the message author                                          |

### InputAdditionalProps

| Name                                      | Type                                                                | Description                                 |
| ----------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------- |
| attachmentButtonProps?                    | [AttachmentButtonAdditionalProps](#attachmentbuttonadditionalprops) | Additional props for the attachment button  |
| attachmentCircularActivityIndicatorProps? | [CircularActivityIndicatorProps](#circularactivityindicatorprops)   | Spinner props (see `isAttachmentUploading`) |

### AttachmentButtonAdditionalProps

| Name                   | Type                  | Description                         |
| ---------------------- | --------------------- | ----------------------------------- |
| touchableOpacityProps? | TouchableOpacityProps | Attachment button's touchable props |

### CircularActivityIndicatorProps

| Name   | Type                   | Description                |
| ------ | ---------------------- | -------------------------- |
| color  | ColorValue             | Spinner's color            |
| size?  | number                 | Spinner's size             |
| style? | `StyleProp<ViewStyle>` | Spinner's container styles |
