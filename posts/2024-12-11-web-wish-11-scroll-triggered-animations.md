---
layout: post
title: 'Web Wish 11: Srcset for Video'
date: 2024-12-11 16:00:00 +01:00
author: Johannes Odland
---

We often use IntersectionObserver to trigger animations based on scroll position.
This works, but it feels excessive load javascript boilerplate just to play and pause an animation.

Scroll-driven animations lets us declaratively bind animations to the scroll position, 
but there's currently no way to declaratively play and pause regular animations based on scroll position.

Fortunately, [Yehonatan Daniv][ydaniv] [has proposed][issue] a solution that the working group has resolved to draft into [CSS Animations Level 2][css-animations-2].
The proposal includes an `animation-trigger` property, allowing you to define animation triggers like this:

```css
  animation: --slide-in 330ms backwards;
  animation-trigger: view() alternate entry 50%;
```

I hope browsers will be interested in implementing this proposal. 
It would help us eliminate a lot of boilerplate JavaScript.

Relevant issues and PRs:

- [Add animation-trigger for triggering animations when an element is in a timeline's range][issue]

[css-animations-2]: https://drafts.csswg.org/css-animations-2/
[issue]: https://github.com/w3c/csswg-drafts/issues/8942
[ydaniv]: https://front-end.social/@ydaniv