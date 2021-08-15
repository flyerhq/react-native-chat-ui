---
id: themes
title: Themes
---

You can override anything from some defined theme or create a new one from scratch. See the default theme implementation [here](https://github.com/flyerhq/react-native-chat-ui/blob/main/src/theme.ts). To override theme partially, destructure any defined theme and change what is needed, like on this example:

```ts
import { Chat, defaultTheme } from '@flyerhq/react-native-chat-ui'

<Chat
  theme={{
    ...defaultTheme,
    colors: { ...defaultTheme.colors, inputBackground: 'red' },
  }}
/>
```

If you created a theme from scratch just pass it to the `theme` prop. We also provide `darkTheme` implementation, you can import it from the library and pass to the `theme` prop.

## Types

:::note

Question mark shows optional types.

:::

| Name    | Type                          | Description     |
|---------|-------------------------------|-----------------|
| borders | [ThemeBorders](#themeborders) | Border radiuses |
| colors  | [ThemeColors](#themecolors)   | Colors          |
| fonts   | [ThemeFonts](#themefonts)     | Text styles     |
| icons?  | [ThemeIcons](#themeicons)     | Icons           |

### ThemeBorders

| Name                | Type   | Description                  |
|---------------------|--------|------------------------------|
| inputBorderRadius   | number | Bottom bar border radius     |
| messageBorderRadius | number | Message bubble border radius |

### ThemeColors

| Name            | Type       | Description                                                        |
|-----------------|------------|--------------------------------------------------------------------|
| background      | ColorValue | Used as a background color of a chat component                     |
| error           | ColorValue | Color to indicate something bad happened (usually - shades of red) |
| inputBackground | ColorValue | Color of the bottom bar where text input is                        |
| inputText       | ColorValue | Color of the text input's text and attachment/send buttons         |
| primary         | ColorValue | Primary color of the chat used as a background of sent messages    |
| secondary       | ColorValue | Secondary color, used as a background of received messages         |

### ThemeIcons

| Name                  | Type                | Description                           |
|-----------------------|---------------------|---------------------------------------|
| attachmentButtonIcon? | ImageSourcePropType | Icon for select attachment button     |
| deliveredIcon?        | ImageSourcePropType | Icon for message's `delivered` status |
| documentIcon?         | ImageSourcePropType | Icon inside file message              |
| seenIcon?             | ImageSourcePropType | Icon for message's `seen` status      |
| sendButtonIcon?       | ImageSourcePropType | Icon for send button                  |
