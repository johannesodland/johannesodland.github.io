---
layout: post
title: 'Web Wish 22: Flex-Wrap Balance'
date: 2024-12-22 16:00:00 +01:00
author: Johannes Odland
---

When using flexbox to layout items in multiple rows, you easily end up with only one or a few items on the last row.
All the remaining space is distributed to the last row.

<figure>
    <img
    src="/assets/web-wishlist-2024/flex-wrap-balance/flex-wrap-balance-none.png"
    alt="Illustration of a flex container with 10 items. 
It has three rows with three items each, and the fourth row has a single item"
    />
    <figcaption>
        A flex-container with no balancing. 
    </figcaption>
</figure>

If you're also using `flex: auto` on the items to make them fill the entire row,
the items on that last row can end up awkwardly large.

<figure>
    <img
    src="/assets/web-wishlist-2024/flex-wrap-balance/flex-wrap-balance-none-flex.png"
    alt="Illustration of a flex container with 10 items. 
It has three rows with three items each, and the fourth row has a single item. 
The items are stretched to fill the entire row, making the last item as wide as the container."
    />
    <figcaption>
        A flex-container with no balancing and `flex: auto` on the items.
        The item on the last row is ends up filling the entire width of the container. 
    </figcaption>
</figure>

**What if we could control this, similarly to how we control text wrapping with [`text-wrap: balance`][text-wrap-balance]?**

Then we could ensure a more even balancing, and that the last row does not end up with a single item.

<figure>
    <img
    src="/assets/web-wishlist-2024/flex-wrap-balance/flex-wrap-balance-start-flex.png"
    alt="Illustration of a flex container with 10 items. 
It has four rows in total. The first two rows contains three items each, while the remaining two rows contain two items each. 
The items are stretched to fill the entire row."
    />
    <figcaption>
        A flex-container with balancing.
    </figcaption>
</figure>

**But, there's room to improve!**

A normal pattern is to give the first items in a layout some extra focus. 
What if we could control how the wrapping algorithm distribute the extra space?
Then we could control whether the remaining space would be distributed towards the start or the end of the cross axis.

<figure>
    <img
    src="/assets/web-wishlist-2024/flex-wrap-balance/flex-wrap-balance-end-flex.png"
    alt="Illustration of a flex container with 10 items. 
It has four rows in total. The first two rows contains two items each, while the remaining two rows contain three items each. 
The items are stretched to fill the entire row."
    />
    <figcaption>
        A flex-container with balancing and control over distribution of the free space.
    </figcaption>
</figure>

This would help immensely when setting up a product page or an image gallery. 

For Christmas, I'm hoping the CSS working group will resolve to specify flex-wrap balancing.

Relevant issues and PRs:

- [[css-flexbox-2] Add flex-wrap: balance;][flex-wrap-balance-issue]

[flex-wrap-balance-issue]: https://github.com/w3c/csswg-drafts/issues/3070
[text-wrap-balance]: https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap
