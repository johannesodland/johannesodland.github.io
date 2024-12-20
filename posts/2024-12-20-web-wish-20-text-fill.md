---
layout: post
title: 'Web Wish 20: Text Fill'
date: 2024-12-20 16:00:00 +01:00
author: Johannes Odland
---

If you need a text with a fill, you can always put that fill in the background, 
clip the background to the text, and make the text transparent so that the clipped background becomes visible. 

It works across all modern browsers.

```css
background-image: linear-gradient(to bottom in oklch, blue, red);
background-clip: text;
color: transparent;
```

<p class="example-1"><span>Text with a gradient background fill</span></p>
<style>
.example-1 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.5em;
    text-align: center;
    span {
        background-image: linear-gradient(to bottom in oklch, blue, red);
        background-clip: text;
        color: transparent;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone;
    }
}
</style>

But, if you use `text-shadow` on the element, you might be in for a surprise.
The “text” you see is a clipped background, and the text-shadow will be painted on top of it.

```css
background-image: linear-gradient(to bottom in oklch, blue, red);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
text-shadow: 1px 1px 0 black;
```

<p class="example-2"><span>Text with a black text-shadow on top</span></p>
<style>
.example-2 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 1.5em;
    text-align: center;
    span {
        background-image: linear-gradient(to bottom in oklch, blue, red);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        text-shadow: 1px 1px 0 black;
        -webkit-box-decoration-break: clone;
        box-decoration-break: clone; 
    }
}
</style>

The [CSS Fill and Stroke Module][css-fill-and-stroke] defines a `fill-image` property that would let you fill the text properly, 
so that it would work in combination with the `text-shadow` property. 
As far as I know, none of the browsers implement this property for inline text elements.

Today I'm wishing for browser implementers to support the `fill-*` properties for inline text.

Relevant issues and PRs:

- [text-shadow paints on top of text styled with background-clip: text;][chromium-text-shadow-issue]

[chromium-text-shadow-issue]: https://issues.chromium.org/issues/354087606
[css-fill-and-stroke]: https://www.w3.org/TR/fill-stroke-3/