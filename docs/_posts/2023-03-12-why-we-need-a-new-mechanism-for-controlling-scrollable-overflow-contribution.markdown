---
layout: post
title:  "Why We Need a New Mechanism for Controlling Scrollable Overflow Contribution"
date:   2023-03-12 14:20:00 +0100
categories:
author: Johannes Odland, rephrased with the help of ChatGPT
---
<style>
    .visible-scrollbars {
        scrollbar-color: lightgray dimgray;
        scrollbar-width: thin;
        scrollbar-gutter: stable;
    }
    .visible-scrollbars::-webkit-scrollbar {
        width: 8px; 
        height: 8px;
        background-color: lightgray;
    }
    .visible-scrollbars::-webkit-scrollbar-thumb {
        background: dimgray;
        border-radius: 2px;
    }
    fieldset {
        box-sizing: border-box;
        border: 3px solid transparent;
        border-radius: 3px;
        background: linear-gradient(to right, white, white), conic-gradient(rgb(69.6% 37.4% 48%), rgb(70% 40.1% 26.2%), rgb(59.1% 47.7% 11.8%), rgb(37.6% 54.8% 27.5%), rgb(0% 57.3% 50.1%), rgb(3.82% 54.2% 68.3%), rgb(39.1% 47.4% 74.8%), rgb(58.7% 40.8% 66.7%), rgb(69.6% 37.4% 48%));
        background: linear-gradient(to right, white, white), conic-gradient(in lch, lch(51 36.8 0), lch(51 36.8 90), lch(51 36.8 180), lch(51 36.8 270), lch(51 36.8 360));
        background: linear-gradient(to right, white, white), conic-gradient(in oklch, oklch(0.59 0.11 0), oklch(0.59 0.11 90), oklch(0.59 0.11 180), oklch(0.59 0.11 270), oklch(0.59 0.11 360));
        background-clip: padding-box, border-box;
        background-origin: border-box;
    }
    fieldset legend {
        background: white;
        padding: 0 10px;
    }
    figcaption {
        padding: 10px 0;
    }
    .has-suport-info {
        display: block;
        background: floralwhite;
        border: 2px solid lemonchiffon;
        padding: 10px;
    }
    @supports selector(:has(p)) {
        .has-suport-info {
            display: none;
        }
    }
    
</style>

CSS is designed to ensure that content [is visible, accessible, and usable by default][content-should-be-visible]. 
When it comes to [scroll containers][scroll-container], 
this means that all descendant boxes should be viewable unless they are explicitly hidden. 
To achieve this, the scrollbars in the container must allow the user to scroll around and see all the child elements.

However, there are cases such as decorative elements where we don't necessarily want the entire element to be visible.
In this post, we'll discuss ways to prevent the scrollable area from being extended.
We will also explore why we need a new way to control which elements will extend the scrollable area.

## The scrollable overflow area

The rectangular area that the user can scroll around is called the [**scrollable overflow rectangle**][scrollable-overflow], 
and it should be the smallest rectangle that can contain all the descendant boxes while still aligning with the container's axes. 
The combined area of all the descendant boxes is known as the [**scrollable overflow area**][scrollable-overflow].

As an example, lets take a scroll container that has a fixed size of `200px by 200px`. 
It contains an element with dimensions of `50px by 50px` that is absolutely positioned at `top: "200px; left:200px;`. 
The **scrollable overflow area** will include the absolutely positioned child box, 
and thus the **scrollable overflow rectangle** will have to be at least `250px by 250px` large.

<figure>
<div id="example-1" class="visible-scrollbars">
    Scrollable overflow area will extend to include positioned element &#x2198;
    <div class="positioned"></div>
</div>
<style>
    #example-1 {
        position: relative;
        box-sizing: border-box;
        width: 200px;
        height: 200px;
        padding: 20px;
        overflow: scroll;
        background-color: thistle;
    }
    #example-1 .positioned {
        position: absolute;
        top: 200px;
        left: 200px;
        width: 50px;
        height: 50px;
        background-color: palevioletred;
    }
</style>
    <figcaption style="max-width: 300px;">
    The scrollable overflow rectangle is extended to include the absolute positioned element at (200px, 200px). 
    Scroll down to the bottom right corner to see the absolute positioned element.
    </figcaption>
</figure>

&nbsp;

## The negative scrollable overflow region
An area that automatically extends to contain your content is great, 
but what if you want to fully or partially hide some content from visual readers? 

One hack that was used historically was to place it beyond the top left corner.
Browsers didn't provide a scrolling mechanism to access this area.
This meant that the content would be hidden from visible readers while remaining accessible to screen readers and search engines.

This corner is called the [**scroll origin**][scroll-origin], and as browsers now support different writing modes it will change position based on the writing mode. 
The area beyond this corner is called the [**negative scrollable overflow region**][negative-scrollable-overflow-region], 
and due to web compatibility the scrollable area will not be extended into this region.

While the negative scrollable overflow region can be used to partially or fully hide content,
it's not very practical to use it for this purpose.
However, knowing that this region exists can help you understand why content sometimes is hidden and why the scrollable area is not extended to make it visible.

_I hope that we can extend the scrollable area into this region in the future, as this [could be beneficial for some scroll snapping use cases][include-snap-points]._

<figure>
<div id="example-2" class="visible-scrollbars">
    Scrollable overflow area will not include element positioned beyond the scroll origin &#x2196;
    <div class="positioned"></div>
</div>
<style>
    #example-2 {
        position: relative;
        box-sizing: border-box;
        width: 200px;
        height: 200px;
        padding: 20px;
        overflow: scroll;
        background-color: thistle;
    }
    #example-2 .positioned {
        position: absolute;
        top: -200px;
        left: -200px;
        width: 50px;
        height: 50px;
        background-color: palevioletred;
    }
</style>
    <figcaption style="max-width: 300px;">
    Example showing that the scrollable overflow rectangle is not extended to include the absolute positioned box at (-200px, -200px).
    </figcaption>
</figure>

## Hiding or clipping overflow

If we add a decorative element along one of the edges of our scroll container, 
the scrollable area will grow to show the entire element, something that we didn't intend.
We can prevent this by using CSS's aptly named `overflow` property, which we're already using to make the container scrollable.

We can clip the scrollable overflow area using `overflow: hidden` or, even better, `overflow: clip`. 
The former allows scrolling by script, while the latter clips the overflow without creating a scroll container. 
However, we can't use these properties directly on our scrollable container because they would prevent scrolling. 
Instead, we need to introduce a new element to contain the overflow.

_Support for `clip` is growing, but you should probably add a fallback to `hidden` for older browsers._

While this is inconvenient, we can live with it. 
But what if we could simply mark the decorative element as something that shouldn't contribute to the scrollable overflow area?
This is the idea behind a proposed new CSS property, `overflow-contribution: none`. Check out the proposal [here][overflow-contribution].

<figure id="example-3">
<div class="scroller visible-scrollbars">
    <div class="clipper">
        Overflow hidden will clip the absolute positioned element, 
        so that it does not contribute to the scrollable overflow area of the scroll container.
        <div class="positioned"></div>
    </div>
</div>
<fieldset style="max-width: 300px;">
    <legend>Overflow</legend>
    <label>
        <input type="radio" name="overflow1" value="visible">
        overflow: visible
    </label>
    <label>
        <input type="radio" name="overflow1" value="clip" checked>
        overflow: clip
    </label>
    <div class="has-suport-info">&#9888; This demo requires support for the `:has()` relational pseudo-class.</div>
</fieldset>
<style>
    #example-3 .scroller {
        position: relative;
        box-sizing: border-box;
        width: 200px;
        height: 200px;
        overflow: scroll;
        background-color: thistle;
    }
    #example-3 .clipper {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding: 20px;
        overflow: visible;
    }
    #example-3:has(input[value="clip"]:checked) .clipper {
        overflow: hidden;
        overflow: clip;
    }
    #example-3 .positioned {
        position: absolute;
        top: 0;
        right: -25px;
        width: 50px;
        height: 25px;
        transform-origin: 50% 0;
        transform: rotate(45deg);
        background: linear-gradient(
            #e50000 0% 16.7%, 
            #ff8d00 16.7% 33.3%,
            #ffee00 33.3% 50%,
            #028121 50% 66.7%,
            #004cff 66.7% 83.3%,
            #770088 83.3% 100%);
    }
    #example-3 label {
        display: block;
    }
</style>
    <figcaption style="max-width: 300px;">
    An extra element with overflow: clip can be used to prevent a descendant element from extending the scrollable overflow rectangle.
    Use the radio-buttons to toggle between overflow: clip and overflow: visible to see the effect.
    </figcaption>
</figure>

## When clipping breaks the content
While `overflow: clip` can be a useful tool for preventing elements from contributing to the scrollable overflow area, 
it has some limitations when it comes to 3D rendering contexts. 
In a 3D rendering context, elements can be transformed in three dimensions, creating a sense of depth and perspective on the page.

However, when an element with `overflow: clip` is inserted into a scroll container that creates a 3D rendering context, 
it prevents the descendant elements from participating in that context. 
The result can be seen in the example below, where you can toggle `overflow: clip` on an element to see how it breaks the 3D rendering context.

This limitation occurs because `overflow: clip` (and `overflow: hidden`) are [grouping property values][grouping-property-values] that require the browser to create a flattened representation of the element before they can be applied. 
This forces the used value of `preserve-3d` to be `flat`, effectively preventing the descendant elements from participating in the 3D rendering context.

As a result, `overflow: clip` and `overflow: hidden` cannot be used to prevent the elements from extending the scrollable overflow area in a 3D rendering context.
We have to explore other options to control the scrollable overflow region.

<figure id="example-4">
<div class="scroller">
    <div class="clipper">
        <div class="background"></div>
        <div class="midground"></div>
        <div class="foreground"></div>
        <div class="content">
            Scrollable overflow 
        </div>
    </div>
</div>
<fieldset>
    <legend>Overflow</legend>
    <label>
        <input type="radio" name="overflow2" value="visible" checked>
        overflow: visible
    </label>
    <label>
        <input type="radio" name="overflow2" value="clip">
        overflow: clip
    </label>
    <div class="has-suport-info">&#9888; This demo requires support for the `:has()` relational pseudo-class.</div>
</fieldset>
<style>
    #example-4 .scroller {
        --camera-distance: 100;
        --height: 300px;
        container-type: size;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: var(--height);
        overflow: scroll clip;
        background-color: thistle;
        transform-style: preserve-3d; 
        perspective: calc(1px * var(--camera-distance));
    }
    #example-4 .clipper {
        width: min-content;
        position: relative;
        transform-style: preserve-3d;
        overflow: visible;
    }
    #example-4:has(input[value="clip"]:checked) .clipper {
        overflow: clip;
    }
    #example-4 .background {
        --depth: 500;
        --scale: calc((var(--depth) + var(--camera-distance)) / var(--camera-distance));
        position: absolute;
        top: 0;
        left: 0;
        height: var(--height);
        width: calc(var(--height) / 512 * 1920);
        transform: scale(var(--scale)) translateZ(calc(-1px * var(--depth)));
        transform-origin: 50cqw calc(0.5 * var(--height));
        background: url(/assets/overflow-contribution/fjord-print-background.webp);
        background-size: 100%;
    }
    #example-4 .midground {
        --depth: 300;
        --scale: calc((var(--depth) + var(--camera-distance)) / var(--camera-distance));
        position: absolute;
        top: 0;
        left: 0;
        height: var(--height);
        width: calc(var(--height) / 512 * 1920);
        transform: scale(var(--scale)) translateZ(calc(-1px * var(--depth)));
        transform-origin: 50cqw calc(0.5 * var(--height));
        background: url(/assets/overflow-contribution/fjord-print-middleground.webp);
        background-size: 100%;
    }
    #example-4 .foreground {
        --depth: 200;
        --scale: calc((var(--depth) + var(--camera-distance)) / var(--camera-distance));
        position: absolute;
        top: 0;
        left: 0;
        height: var(--height);
        width: calc(var(--height) / 512 * 1920);
        transform: scale(var(--scale)) translateZ(calc(-1px * var(--depth)));
        transform-origin: 50cqw calc(0.5 * var(--height));
        background: url(/assets/overflow-contribution/fjord-print-foreground.webp);
        background-size: 100%;
    }
    #example-4 .content {
        box-sizing: border-box;
        height: var(--height);
        width: max-content;
        padding-left: 40px;
        padding-right: 40px;
        line-height: var(--height);
        font-size: calc(var(--height) / 2.5);
        font-family: Helvetica, sans-serif;
        font-weight: 600;
        letter-spacing: 12px;
        text-transform: uppercase;
        text-shadow: 0 0 30px #ffffff57;
        -webkit-text-stroke-width: 4px;
        -webkit-text-stroke-color: #0c0042;
        border: 10px solid #0c0042;
        color: rgba(168,194,253,0.6);
        transform: translateZ(0);
    }
</style>
    <figcaption>
        Scroll to the right to see how far the scrollable overflow area has been extended. 
        With overflow: clip the scrollable overflow area is prevented from growing to include the background elements, 
        but it removes the background elements from the 3d rendering context. 
        Without overflow: clip the scrollable overflow area is extended to show all the background elements, 
        something that is not desired.
        <br/>
        <small>Illustration: Created with the assistance of DALL·E 2</small>
    </figcaption>
</figure>

## Are there any other solutions?
Currently, there are no known solutions to prevent 3D transformed elements from contributing to scrollable overflow. 
The only option is to size these elements to fit within the scrollable overflow area needed by the main content.

Unfortunately, 
only Firefox seem to take the perspective transform into account when calculating the size of the scrollable overflow area. 
In other browsers the scrollable overflow area are extended without taking perspective and the current scrollTop into account.

In the example below we have sized the content participating in the 3d rendering context so that it will not extend
the scrollable overflow area when scrolled all the way to the right. 
As we mentioned above, only Firefox will calculate the scrollable overflow area correctly.

_If you want browsers to handle perspective when calculating scrollable overflow, you should star these issues:
[643213](https://bugs.chromium.org/p/chromium/issues/detail?id=643213)
[1264086](https://bugs.chromium.org/p/chromium/issues/detail?id=1264086)
[1011442](https://bugs.chromium.org/p/chromium/issues/detail?id=1011442)_

_Calculating the appropriate size of a z-translated element to fit within the main content is a topic for a future post.._
    

<figure id="example-5">
<div class="scroller">
    <div class="clipper">
        <div class="background"></div>
        <div class="midground"></div>
        <div class="foreground"></div>
        <div class="content">
            Scrollable overflow 
        </div>
    </div>
</div>
<style>
    #example-5 .scroller {
        --camera-distance: 100;
        --height: 300px;
        container-type: size;
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: var(--height);
        overflow: scroll clip;
        background-color: thistle;
        transform-style: preserve-3d; 
        perspective: calc(1px * var(--camera-distance));
    }
    #example-5 .clipper {
        width: min-content;
        position: relative;
        transform-style: preserve-3d;
    }
    #example-5 .background {
        --depth: 500;
        --scale: calc((var(--depth) + var(--camera-distance)) / var(--camera-distance));
        position: absolute;
        top: 0;
        left: 0;
        height: var(--height);
        width: calc(100% / var(--scale) + 100cqw / var(--scale) * var(--depth) / var(--camera-distance));
        transform: scale(var(--scale)) translateZ(calc(-1px * var(--depth)));
        transform-origin: 50cqw calc(0.5 * var(--height));
        background: url(/assets/overflow-contribution/fjord-print-background.webp);
        background-size: auto 100%;
    }
    #example-5 .midground {
        --depth: 300;
        --scale: calc((var(--depth) + var(--camera-distance)) / var(--camera-distance));
        position: absolute;
        top: 0;
        left: 0;
        height: var(--height);
        width: calc(100% / var(--scale) + 100cqw / var(--scale) * var(--depth) / var(--camera-distance));
        transform: scale(var(--scale)) translateZ(calc(-1px * var(--depth)));
        transform-origin: 50cqw calc(0.5 * var(--height));
        background: url(/assets/overflow-contribution/fjord-print-middleground.webp);
        background-size: 100%;
    }
    #example-5 .foreground {
        --depth: 200;
        --scale: calc((var(--depth) + var(--camera-distance)) / var(--camera-distance));
        position: absolute;
        top: 0;
        left: 0;
        height: var(--height);
        width: calc(100% / var(--scale) + 100cqw / var(--scale) * var(--depth) / var(--camera-distance));
        transform: scale(var(--scale)) translateZ(calc(-1px * var(--depth)));
        transform-origin: 50cqw calc(0.5 * var(--height));
        background: url(/assets/overflow-contribution/fjord-print-foreground.webp);
        background-size: 100%;
    }
    #example-5 .content {
        box-sizing: border-box;
        height: var(--height);
        width: max-content;
        padding-left: 40px;
        padding-right: 40px;
        line-height: var(--height);
        font-size: calc(var(--height) / 2.5);
        font-family: Helvetica, sans-serif;
        font-weight: 600;
        letter-spacing: 12px;
        text-transform: uppercase;
        text-shadow: 0 0 30px #ffffff57;
        -webkit-text-stroke-width: 4px;
        -webkit-text-stroke-color: #0c0042;
        border: 10px solid #0c0042;
        color: rgba(168,194,253,0.6);
        transform: translateZ(0);
    }
</style>
    <figcaption>
        Scroll to the right to see how far the scrollable overflow area has been extended. 
        The background elements are sizes so that they will not extend further than the main content when scrolled to the right.
        Unfortunately only Firefox seem to take the perspective transform into account when extending the scrollable overflow area.
        <br/>
        <small>Illustration: Created with the assistance of DALL·E 2</small>
    </figcaption>
</figure>

## Could there be a better solution?
For some content, there's no need to extend the scrollable overflow area. 
If we could mark these elements,
the browser could simply skip them when calculating the scrollable overflow area.
This would save resources as well as solving our problem.

I have [proposed to add a method to prevent elements from contributing to scrollable overflow][overflow-contribution], 
and the CSS Working Group has fortunately resolved to add such a feature.

One day in the future we might be able to mark elements using `overflow-contribution: none`, `contain: overflow-contribution` or something similar.


## TL;DR
By default, the scrollable overflow area of a scroll container extends to include all descendant elements.
While we can use `overflow: clip` and `overflow: hidden` to somewhat control this area, 
it might require adding extra elements 
and cannot be used if descendant elements are participating in a 3d rendering context created by the scroll container.

To address this issue I have argued for the need to mark elements that should not contribute to the scrollable overflow area by setting a property like `overflow-contribution: none`.
Fortunately, the CSSWG [has resolved to add such a feature][overflow-contribution] to CSS Overflow Module Level 4. 

[content-should-be-visible]: https://www.w3.org/TR/design-principles/#css-content-should-be-visible
[scroll-container]: https://www.w3.org/TR/css-overflow-3/#scroll-container
[scrollable-overflow]: https://www.w3.org/TR/css-overflow-3/#scrollable
[overflow-contribution]: https://github.com/w3c/csswg-drafts/issues/8361
[include-snap-points]: https://github.com/w3c/csswg-drafts/issues/7885
[grouping-property-values]: https://www.w3.org/TR/css-transforms-2/#grouping-property-values
[negative-scrollable-overflow-region]: https://drafts.csswg.org/css-overflow-3/#negative-scrollable-overflow-region
[scroll-origin]: https://drafts.csswg.org/css-overflow-3/#scroll-origin