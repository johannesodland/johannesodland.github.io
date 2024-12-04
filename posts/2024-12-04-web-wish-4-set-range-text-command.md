---
layout: post
title: 'Web Wish 4: set-range-text command'
date: 2024-12-04 19:30:00 +01:00
author: Johannes Odland
---

My drafts folder is full of half written posts on punctuation and special characters.
The reason I come back to this theme is that the technological development of the last 100+ years
have made it incredibly hard to enter and edit special characters on the web.

In Norwegian, the most common quotation marks are not available on the keyboard, 
so professional writers have to rely on difficult to remember short codes that vary across operating systems.

Some editors use “smart quotes” to automatically replace the typed characters with the correct ones, 
but this solution only works within certain systems, 
and lacks the flexibility authors need to choose specific quotation marks.

**Time and time again I've had to be the middle man apologizing for how hard this is.**

Given the lacking physical keys for special characters across languages, 
it should be easy to add special characters to form inputs – 
preferably without complex JavaScript setup.

The recent [Invoker Commands proposal][invoker-commands-proposal] makes it possible to add commands to buttons in a declarative 
way, removing the need for JavaScript and paving the cowpath for simple commands like opening and closing a dialog.
Initially this will support commands like `toggle-popover`, `show-modal` and `close`, 
but many other commands like `step-up` and `step-down` have been suggested.

To make entering special characters easier for everyone, 
I wish for a new declarative [`set-range-text` command][issue] for `<input type="text">` 
and `<textarea>`, that calls `.setRangeText()` with the button's value.

Relevant issues and PRs:
- [[invokers] setRangeText for textarea and inputs][issue]

[issue]: https://github.com/openui/open-ui/issues/1062
[invoker-commands-proposal]: https://open-ui.org/components/invokers.explainer/ 