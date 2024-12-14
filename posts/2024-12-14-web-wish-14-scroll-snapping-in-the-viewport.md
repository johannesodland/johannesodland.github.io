---
layout: post
title: 'Web Wish 14: Scroll Snapping in the Viewport'
date: 2024-12-14 16:00:00 +01:00
author: Johannes Odland
---

Scroll snapping has been around for a while now, and it's fantastic  
– until you apply `scroll-snap-type` to the `<html>` element. 

That's when a whole host of issues start to surface.

While scroll snapping works across most browsers and devices, applying it to `<html>` introduces a range of issues, 
particularly in Safari.

For example: 
- Navigation with VoiceOver breaks down: 
  - Sometimes the [focused element is pushed off-screen][vo-snaps-to-wrong-item-issue]
  - Other times the [page gets stuck at the top][vo-stuck-on-top-issue]
– [Fragment links fail][navigate-to-fragment-issue]
– [Smooth scrolling is unreliable][smooth-scroll-issue]

This Holiday season, I'm wishing for Safari to address these VoiceOver and navigation issues with scroll snapping.

Relevant issues:

- [Fragment links does not work with scroll-snap on root][navigate-to-fragment-issue]
- [Scroll-snap snaps to wrong element after VoiceOver navigation][vo-snaps-to-wrong-item-issue]
- [REGRESSION(?): Page with scroll-snap is stuck at the top when navigating with VoiceOver][vo-stuck-on-top-issue]
- [Smooth scroll in viewport with scroll-snap fails on iOS][smooth-scroll-issue]

[navigate-to-fragment-issue]: https://bugs.webkit.org/show_bug.cgi?id=272079
[vo-snaps-to-wrong-item-issue]: https://bugs.webkit.org/show_bug.cgi?id=251003
[vo-stuck-on-top-issue]: https://bugs.webkit.org/show_bug.cgi?id=282386
[smooth-scroll-issue]: https://bugs.webkit.org/show_bug.cgi?id=245722