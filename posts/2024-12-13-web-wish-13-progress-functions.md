---
layout: post
title: 'Web Wish 13: Progress Functions'
date: 2024-12-13 16:00:00 +01:00
author: Johannes Odland
---

Continuing from yesterday's post,
one of the declarations that often causes repetition is setting up fluid typography.

This is a two key steps. 
1. Calculating the progress from a minimum to a maximum viewport size. 
2. Interpolating between two (font-size) values based on that progress.

While is possible to achieve this in browsers now, the setup is complex, hard to read, 
and can involve a lot of repetition when applying it to multiple values.

For a while the specs had a generic `mix()` function that could be used at the property level, 
and has since gained additional separate `*-mix()` functions that can be used as individual components,
such as `calc-mix()` that takes a `<progress>` value and two calc sums.

What remained was a method to simplify progress calculation.
With custom CSS functions, one could simplify the calculation and avoid repitition, 
but as this is a calculation many authors will have to set up, why not make it a native CSS feature?

Fortunately [CSS Values and Units Module Level 5][css-values-5] now defines such a general `progress()` function, 
and additionally a `media-progress()` and a `container-progress()`.

It the future, they can be used as below:

```css
h1 {
  font-size: mix(progress(100vw, 375px, 1600px), 22px, 26px); 
  /* Alternatively */
  font-size: calc-mix(progress(100vw, 375px, 1600px), 22px, 26px);
  font-size: calc-mix(media-progress(width, 375px, 1600px), 22px, 26px);
}
```

This Christmas, I'm wishing for a browser prototype for both the `progress()`, `*-progress()` and `*-mix()` functions 
to make progress towards a simpler and more readable setup of fluid typography.

- [Proposal for a 'progress' function to calculate progress between two <length> values][issue]
- [Interpolate values between breakpoints][container-animation-issue]

[issue]: https://github.com/w3c/csswg-drafts/issues/7268
[container-animation-issue]: https://github.com/w3c/csswg-drafts/issues/6245
[css-values-5]: https://drafts.csswg.org/css-values-5/#progress-func