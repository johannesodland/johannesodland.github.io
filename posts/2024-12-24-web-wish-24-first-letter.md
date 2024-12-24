---
layout: post
title: 'Web Wish 24: ::first-letter'
date: 2024-12-24 10:30:00 +01:00
author: Johannes Odland
---

Finding the wish for my 24th entry was no small task. 
But, I decided to focus on a long-standing wish of mine: making `::first-letter` work with Norwegian typography.

`::first-letter` lets you select the first letter of an element – including associated punctuation.
One of its major use cases is to allow authors to create drop caps and other types of enlarged initials.

However, typographical conventions vary across countries and languages. 
For instance, in Norwegian, a line can start with a guillemet (`«`) or a quotation dash with an intervening white space (`- `).
These opening quotation marks should be included in `::first-letter` alongside the following letter.

For a time, it seemed CSS would support this quotation dash convention,
but it was later resolved to allow only typographic spaces in the `::first-letter`, disallowing regular space and no-break space. 

While there are many typographic spaces, none match the size of a regular space, 
which adjusts with the font's width.
To my knowledge, no other space can substitute for a regular space (U+0020) or a no-break space (U+00A0).

So, for Christmas Eve I'm wishing for the CSS pseudo-elements specification to support quotation dashes with regular and no-break spaces.

Relevant issues and PRs:

- [[css-pseudo-4] Allow intervening space and no-break space in ::first-letter, preceding the letter][csswg-issue]

[csswg-issue]: https://github.com/w3c/csswg-drafts/issues/9413