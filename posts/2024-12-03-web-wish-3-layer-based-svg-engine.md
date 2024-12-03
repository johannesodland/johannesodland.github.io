---
layout: post
title: 'Web Wish 3: Layer Based SVG Engine (LBSE)'
date: 2024-12-03 16:00:00 +01:00
author: Johannes Odland
---
I love listening to [Igalia Chats][igalia-chats], 
especially when they bring on people who have been an integral part of the development of the web.
One of my favourite episodes is where Nikolas Zimmermann talks about 
[how he and Rob Buis built the KSVG library][igalia-chats-zimmerman-episode] which eventually powered SVG rendering in WebKit.

In that episode he explains how HTML and SVG currently has two separate rendering paths in WebKit. 
While SVG was once more powerful than HTML and CSS, with support for transforms, filters and masking, 
HTML and CSS has since gained these capabilities _and_ now have a hardware accelerated rendering path. 

The current SVG engine in WebKit does not support hardware-accelerated compositing. 
Changes to transforms or opacity in an SVG triggers a full re-render, while in HTML and CSS such changes would 
be handled through hardware-accelerated compositing.

At the time of recording, Zimmerman and Igalia had prototyped a way to harmonize the rendering of HTML and SVG,
using the Layer Tree — a structure that organizes rendering layers for compositing — to enable hardware accelerated SVG rendering.
This harmonization would remove duplication and allow SVG to handle complex animations more efficiently.

It's almost five years since that episode aired, and a lot has happened in the meanwhile. 
While the prototype proved the concepts of the new [Layer Based SVG Engine (LBSE)][lbse-status], 
it was still just a prototype and needed to be upstreamed into the WebCore in manageable, reviewable chunks.

The [Status of the new SVG engine in WebKit][lbse-status] post on [wpewebkit.org](wpewebkit.org) covers the progress in detail. 

Currently, LBSE coexists with the legacy engine behind a compile-time flag.
The new engine adds hardware accelerated compositing, 3D-transforms, and z-index support for all SVG elements.

Before it can replace the legacy engine, the new SVG engine still needs to reach feature parity, 
meet security requirements, and match the legacy engine's performance benchmarks. 
An [update from this summer][lbse-update] covers the progress made over the last year, 
showing that the new engine is inching towards becoming a complete replacement.

While it _is_ getting closer to replace the old engine, there are still some issues that needs to be resolved before 
WebKit can make the switch.

While asking for LBSE to land before Christmas might be too much, 
I hope Igalia Chats will invite Nikolas Zimmermann back to discuss the progress made over the last five years.

Relevant issues and PRs:
- [Harmonize HTML & SVG rendering][issue]

[igalia-chats]: https://www.igalia.com/chats/
[igalia-chats-zimmerman-episode]: https://www.igalia.com/chats/Igalia-Chats-Niko-SVG-WPE
[lbse-status]: https://wpewebkit.org/blog/05-new-svg-engine.html
[lbse-update]: https://wpewebkit.org/blog/status-of-lbse-in-webkit.html
[issue]: https://bugs.webkit.org/show_bug.cgi?id=90738