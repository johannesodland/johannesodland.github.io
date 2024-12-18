---
layout: post
title: 'Web Wish 18: Sticky Next'
date: 2024-12-18 16:00:00 +01:00
author: Johannes Odland
---

Sticky positioning lets you “stick” an element to a position relative to the scroll-port, 
instead of scrolling it out of the screen.

It's awesome.

**But o, so limiting.**

The element will only be “stuck” as far as is possible while staying within its containing block, 
which is the nearest block-level container. 
It would be great if we could [choose a different containing block][position-container].

It's not really possible to configure how far inside that containing it should stay sticky. 
Or, it is, but the CSS working group has [resolved to remove that option][resolve-no-margins].
It would be awesome if it was possible to [configure the insets from the containing block][multiple-insets], 
and not just the insets from the scroll-port.

It would also be awesome if we could let sticky elements [stack against each other][sticky-stack].

So, this year I'm hoping the CSS working group and browser implementors can start looking into how we can make sticky positioning even better.

Relevant issues and PRs:

– [[css-position] Meta-issue: Unresolved sticky positioning use cases][sticky-meta-issue]

[sticky-meta-issue]: https://github.com/w3c/csswg-drafts/issues/11145
[position-container]: https://github.com/w3c/csswg-drafts/issues/9868
[resolve-no-margins]: https://github.com/w3c/csswg-drafts/issues/9052#issuecomment-1642600755
[multiple-insets]: https://github.com/w3c/csswg-drafts/issues/10754
[sticky-stack]: https://github.com/w3c/csswg-drafts/issues/2496#issuecomment-1002312635