---
layout: post
title: 'Web Wish 7: Custom Element Disconnected Signal'
date: 2024-12-07 20:30:00 +01:00
author: Johannes Odland
---

Managing lifecycles in custom elements can be tedious.
For instance, any event listener on global objects added in `connectedCallback()` must be removed in `disconnectedCallback()`.

This double bookkeeping is error-prone, and could be simpler. 
Using an `AbortController` can simplify things by automatically removing event listeners when the `abort()` method is called.

```js
class SomeElement extends HTMLElement {
  #abortController
  connectedCallback() {
    this.#abortController?.abort()
    this.#abortController = new AbortController()
    document.addEventListener('scroll', () => {}, { signal: this.#abortController.signal })
  }

  disconnectedCallback() {
    this.#abortController?.abort()
  }
}
```

This process would be much cleaner if the HTMLElement offered a built-in `disconnectedSignal()`.
Luckily, [Keith Cirkel][keith-cirkel] [has proposed such a signal][disconnected-signal-issue].

With this proposal, the example above would become:

```js
class SomeElement extends HTMLElement {
  connectedCallback() {
    document.addEventListener('scroll', () => {}, { signal: this.disconnectedSignal() })
  }
}
```

This Christmas, I'm wishing for a `disconnectedSignal()` method to automatically remove event listeners
when an element is disconnected.

Relevant issues and PRs:

- [Provide an AbortSignal that aborts when Nodes become disconnected][disconnected-signal-issue]

[disconnected-signal-issue]: https://github.com/whatwg/dom/issues/1296
[keith-cirkel]: https://indieweb.social/@keithamus
