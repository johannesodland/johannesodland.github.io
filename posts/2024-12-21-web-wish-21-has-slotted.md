---
layout: post
title: 'Web Wish 21: Has Slotted'
date: 2024-12-21 16:00:00 +01:00
author: Johannes Odland
---

Need to style your web-component differently depending on whether a slot has a slotted element?

Right now you would need to listen to the `slotchange` event, and check if the slot has any `assignedNodes`, and set a class to style the element.

```js
const slots = this.shadowRoot.querySelectorAll('slot')
for (const slot of slots) {
  slot.addEventListener('slotchange', () => {
    slot.classList.toggle('has-slotted', slot.assignedNodes().length > 0)
  })
}
```

```css
slot:not(.has-slotted) {
  display: none;
}
```

It would be awesome if it was possible to style the slot based on whether it has slotted content, without waiting for the javascript to run.

```css
slot:not(:has-slotted) {
  display: none;
}
```

There is an open [issue for a `:has-slotted` pseudo-class][has-slotted-issue], and things have been moving fast.

The CSS Scoping spec is now updated with a [`:has-slotted` section][has-slotted-spec],
and there are prototypes in [Chrome][chrome-platform-feature] and [in Firefox][mozilla-issue].

I hope the CSSWG keep up the momentum, so that we might soon have a `:has-slotted` pseudo-class, 
and perhaps, in time, a functional `:has-slotted()` pseudo-class. 

[has-slotted-issue]: https://github.com/w3c/csswg-drafts/issues/6867
[has-slotted-spec]: https://drafts.csswg.org/css-scoping/#the-has-slotted-pseudo
[chrome-platform-feature]: https://chromestatus.com/feature/5134941143433216
[mozilla-issue]: https://bugzilla.mozilla.org/show_bug.cgi?id=1921747
