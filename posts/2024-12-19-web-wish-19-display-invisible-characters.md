---
layout: post
title: 'Web Wish 19: Display Invisible Characters'
date: 2024-12-19 16:00:00 +01:00
author: Johannes Odland
---

Typography holds particular interest for me, 
coming from a small country where unique typographical conventions emerged 
alongside our journey to independence from a union with neighboring countries.

Maintaining those conventions is hard, as technology has continually eroded them.

Numbers, in Norwegian, should be formatted with space as a thousands separator. 
To ensure numbers are not broken across lines, a non-breaking space should be used.

But, non-breaking spaces are hard to enter and impossible to visually distinguish from regular spaces in an input field.

Similarly, it's impossible to verify that soft-hyphens are inserted at the correct positions. 
Without soft-hyphens, long compound words can be pushed entirely to the next line, 
disrupting the flow of text and making it harder to read.

Both of these are important characters when preparing Norwegian text for publication.

**The core issue is that invisible characters are nearly undetectable during editing.**

This issue has been solved in other tools, like Word, 
which allow toggling the visibility of invisible characters during editing.
We should be able to solve it on the web as well.

Fortunately, there's a [proposal for toggling the visibility of invisible characters][show-invisible-characters] using
`text-transform`. 

Example: 
```css
text-transform: visible-whitespace;
```

This holiday, I'm wishing for progress in standardizing a way to show these invisible characters in editors.

[show-invisible-characters]: https://github.com/w3c/csswg-drafts/issues/8874