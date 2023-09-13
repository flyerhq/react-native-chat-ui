---
id: localization
title: Localization
---

You can pass the `locale` prop to the `<Chat />` component. This locale will be passed to [dayjs](https://day.js.org), so we can localize dates. To see all supported locales check function `initLocale` in [this file](https://github.com/flyerhq/react-native-chat-ui/blob/main/src/utils/index.ts). Additionally, `locale` prop will be used to localize a couple of texts defined [here](https://github.com/flyerhq/react-native-chat-ui/blob/main/src/l10n.ts). You can override texts regardless of the locale by passing `l10nOverride` prop. 

## Supported locale

```ts
<Chat
  locale='en'
/>
```

## Unsupported locale

```ts
// make sure to import unsupported locale
import 'dayjs/locale/hr';

// optionally, try configuring dayjs somewhere in app root
dayjs.locale('hr');

<Chat
  // override the strings
  l10nOverride={{ inputPlaceholder: 'Ovdje' }}  
  // squash the typescript error
  // @ts-expect-error
  locale='hr'
/>
```
