---
id: types
title: Types
---

There are 3 supported message types at the moment - `File`, `Image` and `Text`. All of them have corresponding "partial" message types, that include only the message's content. "Partial" messages are useful to create the content and then pass it to some kind of a backend service, which will assign fields like `id` or `author` etc, returning a "full" message which can be passed to `messages` prop of the `<Chat />`.

## Base

All messages should have this, most of these fields will be set by the backend service (you can set `type` and maybe an `error` or `sending` status).

:::note

Question mark shows optional types.

:::

| Name       | Type                                        | Description                  |
| ---------- | ------------------------------------------- | ---------------------------- |
| author     | Object with id and possible imageUrl        | Message's author             |
| id         | string                                      | Message's ID                 |
| status?    | `delivered` `error` `read` `sending` `sent` | Message's status             |
| createdAt? | number                                      | CreatedAt in **miliseconds** |
| type       | `file` `image` `text`                       | Message's type               |

## Partial file

| Name      | Type   | Description                                 |
| --------- | ------ | ------------------------------------------- |
| name      | string | File's name                                 |
| mimeType? | string | File's MIME type                            |
| size      | number | Size in **bytes**                           |
| uri       | string | Supports both local resource and remote URL |

### File

File message is a combination of base and partial file types, where the base's `type` is set to `file`. This is what the chat expects in the `messages` array.

## Partial image

Even though `height` and `width` are optional, we recommend setting those (because you will anyway have them from the image picker) for a better overall look and feel, since the placeholder of this size will be rendered and when the image is available it will just replace it.

| Name    | Type   | Description                                 |
| ------- | ------ | ------------------------------------------- |
| height? | number | Image's height                              |
| name    | string | Image's name                                |
| size    | number | Size in **bytes**                           |
| uri     | string | Supports both local resource and remote URL |
| width?  | number | Image's width                               |

### Image

Image message is a combination of base and partial image types, where the base's `type` is set to `image`. This is what the chat expects in the `messages` array.

## Partial text

| Name         | Type                                                                                       | Description                                                                         |
| ------------ | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- |
| previewData? | [PreviewData](https://github.com/flyerhq/react-native-link-preview/blob/main/src/types.ts) | You shouldn't probably set this field directly, use `onPreviewDataFetched` callback |
| text         | string                                                                                     | Text                                                                                |

### Text

Text message is a combination of base and partial text types, where the base's `type` is set to `text`. This is what the chat expects in the `messages` array.

## User

The only required field for the user is the `id`, used to determine the message author, however, you can pass additional data if you will want to render all available users for the chat or a conversation tile.

| Name       | Type                | Description                                                  |
| ---------- | ------------------- | ------------------------------------------------------------ |
| createdAt? | number              | CreatedAt in **miliseconds**                                 |
| firstName? | string              | User's first name                                            |
| id         | string              | Unique ID                                                    |
| imageUrl?  | string              | User's avatar remote URL                                     |
| lastName?  | string              | User's last name                                             |
| lastSeen?  | number              | Last seen time in **miliseconds**                            |
| metadata?  | Record<string, any> | Additional custom metadata or attributes related to the user |
