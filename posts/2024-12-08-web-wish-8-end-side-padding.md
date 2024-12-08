---
layout: post
title: 'Web Wish 8: End Side Padding on Scroll Containers'
date: 2024-12-08 16:00:00 +01:00
author: Johannes Odland
---

One of the longest-running issues I've followed is [how to handle padding in a scroll container][padding-in-overflow].
The issue was first opened in 2016.

Most developers expected padding to be added at the end of the in-flow content of the scroll container.
This was also how it was specified in [Overflow 3][overflow-3]. 

However, browsers handled this differently, and it wasn't clear if the desired behavior was web-compatible. 
Inline padding was particularly problematic, 
as all browsers agreed on excluding it.
Changing this could cause web-compat issues as pages could rely on the current behavior.

**It was a mess.** 

But slowly and steadily, the issues were worked out. 

In 2019 the working group resolved to [always include padding in grid and flexbox containers][padding-in-flex-and-grid-overflow], 
as there were no web-compat issues there. 

Then, Blink finally ironed out the last web-compat issues, 
and in 2022, the working group resolved to always include inline-end padding.

Firefox has just begun passing [all the tests][wpt],
and while Safari is not fully compliant yet, the situation has improved significantly.

**Or, so I thought.**

It turns out that IntersectionObserver in Safari [doesn't support padding on the scroll container correctly][intersection-observer-test].
While padding is now usable on scroll containers in many cases,
any IntersectionObservers that use the scroll container as root may behave erratically.

**So, this Christmas I'm wishing for Safari to support padding correctly in IntersectionObservers.**

Relevant issues and PRs:

- [Include padding in scrollable overflow area][padding-in-overflow]
- [Clarify padding in overflow content][padding-in-flex-and-grid-overflow]
- [Clarify root rect with overflow and padding][intersection-observer-padding-issue]
- [IntersectionObserver root rect with padding is incorrect if there's overflow clipping][safari-issue]

[padding-in-overflow]: https://github.com/w3c/csswg-drafts/issues/129
[padding-in-flex-and-grid-overflow]: https://github.com/w3c/csswg-drafts/issues/3665
[wpt]: https://wpt.fyi/results/css/css-overflow/scrollable-overflow-padding.html?label=experimental&label=master&aligned
[intersection-observer-test]: https://wpt.fyi/results/intersection-observer/padding-clip.html?label=experimental&label=master&aligned
[intersection-observer-padding-issue]: https://github.com/w3c/IntersectionObserver/issues/504
[safari-issue]: https://bugs.webkit.org/show_bug.cgi?id=263316
[overflow-3]: https://www.w3.org/TR/css-overflow-3/