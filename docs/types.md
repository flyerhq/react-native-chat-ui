---
id: types
title: Types
---

There are 3 supported message types at the moment - `File`, `Image` and `Text`. All of them have corresponding "partial" message types, that include only the message's content. "Partial" messages are useful to create the content and then pass it to some kind of a backend service, which will assign fields like `id` or `author` etc, returning a "full" message which can be passed to `messages` prop of the `Chat` component. In addition to that, there are `Custom` and `Unsupported` types. `Custom` can be used to render anything you want, and `Unsupported` is just a placeholder to have backwards compatibility. 
