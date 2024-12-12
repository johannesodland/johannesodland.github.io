---
layout: post
title: 'Web Wish 12: Custom CSS Functions'
date: 2024-12-12 16:00:00 +01:00
author: Johannes Odland
---

Some CSS declarations tend to repeat with only minor tweaks to their values 
– like converting `px` to `rem`, or setting up fluid typography. 

With the introduction of custom properties, 
it became possible to build function-like custom properties to reduce this repetition. 
[Miriam Suzanne][miriam-suzanne] demonstrated this brilliantly in [Custom Properties in the Cascade][custom-properties-in-the-cascade].

While useful, this technique has its limitations. 

Thankfully [Miriam][miriam-suzanne] has proposed a new solution: [Custom CSS Functions and Mixins][issue]. 
The [editors draft][draft] is beginning to take shape, 
and introduces the ability to define custom functions with `@function`. 

Here's how it could look:

```css
@function --as-rem(--length <length>) {
  result: calc(var(--length) / 16px * 1rem);     
}

h1 {
  font-size: --as-rem(22px);  
}
```

Mixins might still be a long way off, so this holiday, I'm wishing for a browser prototype of custom CSS functions, available behind a flag.

Relevant issues and PRs:
- [Proposal: Custom CSS Functions & Mixins][issue]

[explainer]: https://css.oddbird.net/sasslike/mixins-functions/
[issue]: https://github.com/w3c/csswg-drafts/issues/9350
[draft]: https://drafts.csswg.org/css-mixins-1/
[custom-properties-in-the-cascade]: https://www.smashingmagazine.com/2019/07/css-custom-properties-cascade/
[miriam-suzanne]: https://www.miriamsuzanne.com