---
layout: post
title: 'The case for multiple named insets'
date: 2024-08-24 15:00:00 +02:00
author: Johannes Odland
---

When sticky positioning became supported in most[^1] major browsers in 2017, it felt revolutionary.
The times of wrapper elements and swapping positioning schemes were soon a thing of the past.
We were on the track to providing a jitter free user experience.

While revolutionary, it felt fairly limited.
These limitations were well documented in [issue #2496][sticky-limited] by jonjohnjohnson.

## Constrained by its block level ancestor

One of the issues is that it is cumbersome to define the sticky constraint rectangle.

The sticky element will only be pushed as far as it stays within its containing block.
But for sticky positioning the containing block is the nearest block level ancestor[^2].

**The sticky element cannot be wrapped by any block level element without being contained by it.**

Sometimes we need the sticky element to escape its block level ancestor and rather use a box further up the ancestor chain as a constraint.
Fortunately the CSSWG is discussing something like a [`position-container` property][position-container] that will allow us to change the containing block.

Hopefully, this issue will soon be resolved.

## Defining insets from the containing block

The other issue is that it is cumbersome to define insets from the containing block.

In absolute positioning, you can simply use the [box inset properties][box-inset] to define insets from the containing block.

But for sticky positioning, the box inset properties are already used as insets from the scrollport.
Currently, they can't define insets from the containing block as well.

To define insets from the containing block we have to use the margins of the element.
But, the margin properties are _also_ used to define the in-flow margin.

Due to this dual interpretation, and that it is unclear how collapsing margins would apply,
[the CSSWG has resolved][ignore-margins] to not consider the margins when calculating the sticky position.

**This leaves us in a bind.**

Using margins is problematic, but currently it's the only way we can affect the insets from the containing block for sticky-pos elements.

**We need to define insets for multiple boxes, but can currently only affect _one_ using the box inset properties.**

## A proposal

Issue [#2496][sticky-limited] suggested adding a separate `sticky` property.
But, it could be confusing if containing block insets  sometimes are defined in the box inset properties, 
and other times in a separate property.

What if we could define multiple named box insets?

To define insets for a sticky positioned element that sticks to the scrollport and is inset 20px from the containing block, we could write this:

```css
inset-block:
  scrollport 0,
  containing-block 20px;
```

If the element was only to be sticky to the top, we could do this: 

```css
top: scrollport 0;
bottom: containing-block 20px;
```

Since scrollport would be the default inset name under sticky positioning, the name could be dropped in the `top` property. 
This would ensure backwards compatibility.

```css
top: 0;
bottom: containing-block 20px;
```

Inset names that have no effect under the positioning scheme would simply be ignored.

## TL;DR

Sticky positioning is still fairly limited.  
It's cumbersome to set insets from the containing block under sticky positioning, but it's _possible_ using margins.
Since the CSSWG has resolved to ignore margins, we need another way of defining these insets.

I have [proposed to support multiple named insets][proposal] in the box inset properties.

Hopefully we can find a solution in the not-so-distant future.


[^1]: Excluding IE that unfortunately stuck around for way to long.

[^2]: This is simplified. Check out [Identifying the containing block](https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block) for a more precise definition.

[box-inset]: https://developer.mozilla.org/en-US/docs/Web/CSS/inset
[stickypos-current]: https://www.w3.org/TR/2023/WD-css-position-3-20230403/#stickypos-insets
[ignore-margins]: https://github.com/w3c/csswg-drafts/issues/9052#issuecomment-1642600755
[sticky-limited]: https://github.com/w3c/csswg-drafts/issues/2496
[position-container]: https://github.com/w3c/csswg-drafts/issues/9868
[proposal]: [https://github.com/w3c/csswg-drafts/issues/10754]
