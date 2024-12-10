---
layout: post
title: 'Web Wish 10: Srcset for Video'
date: 2024-12-10 16:00:00 +01:00
author: Johannes Odland
---

As mentioned earlier, [Scott Jehl][scott-jehl] successfully landed support for [responsive video][using-responsive-video] last year.

While we now can use media queries to art direct video sources, 
it should also be possible to provide multiple resolutions for each source and have the browser pick the optimal one.

This is why I'm wishing for browsers to implement support for `srcset` and `sizes` on the `<video>` and `<source>` elements. 
And, while they're at it figuring out how to support `sizes=auto` for video would be a nice bonus.

Relevant issues and PRs:

- [HTML Video and its Source Elements Should Support SRCSET and SIZES][issue]

[using-responsive-video]: https://scottjehl.com/posts/using-responsive-video/
[scott-jehl]: https://scottjehl.com/
[issue]: https://github.com/whatwg/html/issues/10379