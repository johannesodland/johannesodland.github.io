---
layout: post
title: 'Web Wish 6: Responsive Posters'
date: 2024-12-06 16:00:00 +01:00
author: Johannes Odland
---

Last year, we finally regained support for [using media queries for delivering responsive video][using-responsive-video],
thanks to [Scott Jehl][scott-jehl].

That is awesome, but there's still room for improvement. 

The `<video>` element still supports only a single source for the poster image. 
Wouldn't it be great if you could deliver responsive poster images along with the responsive video?

One way to do this would be [allowing a child `<picture>` element to control the `<video>` poster][child-picture-element]. 
This would enable support for using media-queries to art direct the poster images, matching the video source. 
It would also allow for multiple resolutions of the poster image, 
lazy-loading of the poster image and adding an alt-text to the poster image.

This Christmas, I'm wishing for a way to add responsive poster images to the `<video>` element.

Relevant issues and PRs:
- [HTML Video: Allow a child Picture Element to Control the Video Poster Image][child-picture-element]
- [Lazy loading video element poster attribute][lazy-loading-poster]
- [Considerations for providing alternative text to video poster graphics][alt-text-poster]

[using-responsive-video]: https://scottjehl.com/posts/using-responsive-video/
[scott-jehl]: https://scottjehl.com/
[child-picture-element]: https://github.com/whatwg/html/issues/10378
[lazy-loading-poster]: https://github.com/whatwg/html/issues/6636
[alt-text-poster]: https://github.com/whatwg/html/issues/7954