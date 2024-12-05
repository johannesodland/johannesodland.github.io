---
layout: post
title: 'Web Wish 5: Overflow Contribution'
date: 2024-12-05 16:00:00 +01:00
author: Johannes Odland
---

Have you ever had a scrollbar appear unexpectedly? 
Perhaps a rogue horizontal scrollbar on the page?

I often find myself hunting for the element that causes the scrollable overflow area to grow 
– the cause of the rogue scrollbar.
Normally I can solve the issue by adding `overflow: clip` to a parent element. 

Unfortunately, that's not always possible.
You might not want to clip the element to the parent elements bounds. 
Additionally, adding `overflow: clip` forces `transform-style: flat`, 
which can wreak havoc if the elements are part of a 3d rendering context. 

Imagine being able to set a CSS property like `overflow-contribution: none` to exclude elements from
contributing to the overflow area?

The CSSWG has resolved to adopt this feature, but it still needs to a formal specification.

This holiday season, I'm hoping for implementer interest in a CSS property that prevent elements from contributing to scrollable overflow.

Relevant issues and PRs:
- [add method to prevent elements from contributing to scrollable overflow][issue]
- [Ability to ignore specific descendants when generating scrollbars][issue-2]


[issue]: https://github.com/w3c/csswg-drafts/issues/8361
[issue-2]: https://github.com/w3c/csswg-drafts/issues/8400