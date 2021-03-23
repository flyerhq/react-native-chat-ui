---
id: localization
title: Localization
---

You can pass the `locale` prop to the `<Chat />` component. This locale will be passed to [dayjs](https://day.js.org), so we can localize dates. To see all supported locales check function `initLocale` in [this file](https://github.com/flyerhq/react-native-chat-ui/blob/main/src/utils/index.ts). Additionally, `locale` prop will be used to localize a couple of texts defined [here](https://github.com/flyerhq/react-native-chat-ui/blob/main/src/l10n.ts). You can override texts regardless of the locale by passing `l10nOverride` prop. 

```ts
<Chat
  l10nOverride={{ inputPlaceholder: 'Here' }}
  locale='en'
/>
```

## Types

| Name                               | Type   | Description                                                   |
|------------------------------------|--------|---------------------------------------------------------------|
| attachmentButtonAccessibilityLabel | string | Accessibility label (hint) for the attachment button          |
| emptyChatPlaceholder               | string | Placeholder when there are no messages                        |
| fileButtonAccessibilityLabel       | string | Accessibility label (hint) for the tap action on file message |
| inputPlaceholder                   | string | Placeholder for the text input                                |
| sendButtonAccessibilityLabel       | string | Accessibility label (hint) for the send button                |
| today                              | string | Today string                                                  |
| yesterday                          | string | Yesterday string                                              |
