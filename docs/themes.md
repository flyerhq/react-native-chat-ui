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
