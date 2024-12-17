---
layout: post
title: 'Web Wish 17: Viewport Relative Lengths'
date: 2024-12-17 20:00:00 +01:00
author: Johannes Odland
---

Viewport relative units come in really handy when you need to size elements relative to the viewport,
say a hero element that should have the exact size of the viewport.

There's one catch though, the size of the viewport can change dynamically as mobile browser interfaces,
like the address bar, expand and collapse as users scroll.
If the elements on the page expand and collapse as a result, the layout of the page ends up unstable,
and the user can experience bouncing around the page as he changes scroll direction.

This is why browsers made `vh` units stable, reflecting the size of the viewport with browser interfaces collapsed.
This ensures that the layout does not shift unexpectedly, providing a smoother user experience.

This also prompted the CSS working group to standardize new viewport units.
The new units include two stable sets: one for the large viewport with interfaces retracted (`lv*`), and one for the small viewport with user interfaces expanded (`sv*`).
The final set of units allows authors to opt in to dynamic sizes (`dv*`).

Most of the major browsers support the new viewport units correctly, [except for Firefox on iOS][firefox-issue].

The new units were a big step forward, but there's still a challenge: inconsistent support in In App Browsers (IABs).
Apps like social media, messaging platforms and other services often open links in IABs, to keep users within their ecosystems.
Unfortunately many of these IABs fail to implement viewport units correctly.

In fact, the SFSafariViewController does not seem to [handle the viewport units correctly][safari-view-controller-issue].
This is particularly problematic, since SFSafariViewController is widely used in popular apps like Slack. 

**This is a major frustration for authors that have to maintain fragile javascript workarounds to make sure their page layout doesn't break 
– and for users who experience broken pages as a result.**

Today, I'm wishing for Apple and app developers to collaborate on fixing viewport units in IABs, 
making viewport-based layouts more reliable for authors and users alike.

[firefox-issue]: https://github.com/mozilla-mobile/firefox-ios/issues/22607
[safari-view-controller-issue]: https://bugs.webkit.org/show_bug.cgi?id=255708
