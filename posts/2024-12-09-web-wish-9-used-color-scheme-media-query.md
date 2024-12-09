---
layout: post
title: 'Web Wish 9: Used Color Scheme Media Query'
date: 2024-12-09 16:00:00 +01:00
author: Johannes Odland
---

Currently, you can use `prefers-color-scheme` in the `media` attribute of a `<source>`
to provide video or images that matches the users preferred color scheme.

However, this might not actually match the used color scheme,
as a different color scheme can be set in either `<meta name=color-scheme>` or by setting the `color-scheme` property.

I need a way to provide image and video sources that match the _used_ color scheme and not just the preferred one.
I've written extensively about it in [The Case for a Used-Color-Scheme Media Feature][used-color-scheme]

This holiday I'm wishing for a way to provide light and dark mode image sources, so they can match the used color scheme.

Relevant issues and PRs:

- [Effect of <meta name=color-scheme> on the (prefers-color-scheme) MQ][issue]

[used-color-scheme]: https://johannesodland.github.io/2024/10/14/the-case-for-a-used-color-scheme-media-feature.html
[issue]: https://github.com/w3c/csswg-drafts/issues/10249