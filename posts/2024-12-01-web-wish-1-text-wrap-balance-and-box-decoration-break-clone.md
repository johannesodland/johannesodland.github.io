---
layout: post
title: 'Web Wish 1: `text-wrap: balance` and `box-decoration-break: clone`'
date: 2024-12-01 11:00:00 +01:00
author: Johannes Odland
---

I've been waiting for `text-wrap: balance` since [it was added][text-wrap-balance-www-style]
to the [editors draft of `css-text-4`][text-wrap-style] in 2015.
Naturally, I was excited when `text-wrap: balance` was included in [interop 2024][interop-2024].
However, it seems I might have gotten my hopes up a little too soon.

I see two major use cases for `text-wrap: balance`.
The first is to balance text in headings, so that we don't end up with an unsightly orphan on the last line.
The second is to balance text when we present the text with slabs behind it.
Unbalanced text sticks out like a sore thumb here.

<figure>
    <img
    src="/assets/web-wishlist-2024/text-wrap-balance/text-wrap-balance-slab.webp"
    alt="Two screen grabs of an article with and without text-wrap: balance. 
        In the first screen grab, the first line is long but the second line contains one single word. 
        In the second screen grab, the two lines have equal length."
    />
    <figcaption>
        Example of how a slabbed text line looks with and without `text-wrap: balance`. 
        Screenshots from the article 
        <a href="https://www.nrk.no/dokumentar/xl/frostens-vokter-1.14755370">Frostens vokter</a>. 
    </figcaption>
</figure>

When `text-wrap: balance` was implemented in Blink, it supported both these use cases.
However, in WebKit,
it seems that elements with inline children using `box-decoration-break: clone` were excluded from balancing.
One possible reason for this could be the lack of a web platform test specifically for the interaction between these two properties.

While waiting for full support across major browsers,
I've used different techniques to balance the text with JavaScript.
It would be a relief to remove this code and have native support.

So, for Christmas,
I'm hoping that WebKit will bring full support for the combination of `text-wrap: balance` and `box-decoration-break: clone`.

Relevant issues and PRs:

- [Text-wrap balance with box-decoration-break clone child fails][webkit-issue]
- [Add test for text-wrap: balance with box-decoration-break: clone][wpt-pr]

[text-wrap-balance-www-style]: https://lists.w3.org/Archives/Public/www-style//2015Jan/0361.html
[text-wrap-style]: https://drafts.csswg.org/css-text-4/#text-wrap-style
[webkit-issue]: https://bugs.webkit.org/show_bug.cgi?id=274145
[wpt-pr]: https://github.com/web-platform-tests/wpt/pull/48445
[interop-2024]: https://web.dev/blog/interop-2024
