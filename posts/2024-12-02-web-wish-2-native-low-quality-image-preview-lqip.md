---
layout: post
title: 'Web Wish 2: Native Low Quality Image Preview (LQIP)'
date: 2024-12-02 18:30:00 +01:00
author: Johannes Odland
---

Implementing lazy-loading images has never been easier.

First we got support for the [`loading=lazy`][loading-lazy] attribute, making it easy to defer images.
Then came automatic aspect-ratio calculations based on [the `width` and `height` attributes][intrinsic-aspect-ratio],
fixing annoying layout shifts.
Just recently, support for [`sizes=auto`][sizes-auto] has started to arrive, 
taking away the hassle – and sometimes impossible task – of specifying image sizes upfront.

There is one thing that I think is missing from native lazy loading images, though.
That is having support for low quality image previews (LQIP).

On a fast fiber connection, you might not even notice that the images are lazy-loaded.
But on a slow connection, they can appear as blank placeholders before the actual image is loaded.

You _can_ use tricks like setting `background-image: url(lqip.webp)` for low quality previews,
but this only works for the simplest cases.

Things get messy if the image has multiple sources, or uses `object-fit` settings like `contain` or `cover` – 
at which point it can become [nearly impossible][replacement-box].

So, for Christmas, I wish that low quality image previews were natively supported,
and that we can set an LQIP source for each `<source>`element.

Relevant issues and PRs:

- [Controlling the appearance of images being loaded][appearance-while-loading]
- [Add 'replacement-box' as option to background-origin and background-clip][replacement-box]

[loading-lazy]: https://github.com/whatwg/html/issues/2806
[intrinsic-aspect-ratio]: https://github.com/WICG/intrinsicsize-attribute/issues/16#issuecomment-503245998
[sizes-auto]: https://github.com/whatwg/html/issues/4654
[replacement-box]: https://github.com/w3c/csswg-drafts/issues/8243
[appearance-while-loading]: https://github.com/whatwg/html/issues/3631
