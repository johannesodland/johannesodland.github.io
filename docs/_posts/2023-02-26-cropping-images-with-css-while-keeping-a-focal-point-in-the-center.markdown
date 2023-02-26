---
layout: post
title:  "Cropping images with CSS while keeping a focal point in the center"
date:   2023-02-26 16:00:00 +0100
categories:
author: Johannes Odland, rephrased with the help of ChatGPT
---

{% assign imagealt1 = "The image is a digital landscape illustration. A waterfall cascades down the face of a fir clad cliff.
The scene is lit up by green northern lights. Above the waterfall an orb is glowing in the color of the sun." %}

{% assign imagealt2 = "The image is a digital illustration of a modernistic house on the edge of a lake.
The scene is set in the blue hour and lit up by green northern lights that reflect in the lake.
The lights in he house are on and the silhouette of a person looking out can be seen in the middle window.
The silhouette of a second person can be seen in the lower right of the image.
It is observing the house, holding something that can be perceived as a knife." %}

<style>
    figure {
        margin: 30px 0;
    }
    figure figure {
        margin: 0;
    }
    @media (min-width: 900px) {
       figure {
            margin: 30px 30px;
        } 
    }
    fieldset {
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
    .language-plaintext {
        white-space: nowrap;
    }
</style>

Images can be an impactful part of web content, 
but providing images that fit every device, from small to large screens, 
can be quite a challenge. 

Fortunately, the web platform offers several solutions for adjusting images to different screen sizes, 
including resolution switching and art-direction. 

**However, there are times when cropping an image on the client side is necessary, 
especially when the image needs to fit into a dynamically sized container.**

To crop an image effectively, 
it's important to prioritize a specific part of the image and preserve the essential content around it. 
One way to achieve this is by identifying the image's 'focal point' - the part of the image that is most important - and cropping the image around it.

In this post, I'll walk you through my technique for cropping images with CSS while preserving the image's focal point.

I've tried to describe all steps thoroughly, but if you prefer you can <a href="#tldr">skip directly to the TL;DR</a>.

<figure id="hero-illustration">
    <div class="grid">
        <div class="container">
            <img
                src="/assets/image-cropping/focus-point-resize.jpg"
                loading="lazy"
                alt="A horizontally cropped image. {{imagealt1}}"
            />
        </div>
        <div class="container">
            <img
                src="/assets/image-cropping/focus-point-resize.jpg"
                loading="lazy"
                alt="A squarely cropped image.  {{imagealt1}}"
            />
        </div>
        <div class="container">
            <img
                src="/assets/image-cropping/focus-point-resize.jpg"
                loading="lazy"
                alt="A vertically cropped image.  {{imagealt1}}"
            />
        </div>
    </div>
    <style>
        #hero-illustration .grid {
            display: grid;
            aspect-ratio: 1 / 1;
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-areas:
                "a a a"
                "b b c"
                "b b c";
        }
        #hero-illustration .container {
            box-sizing: border-box;
            container-type: size;
            position: relative;
            width: 100%;
            height: 100%;
            border: 4px solid black;
        }
        #hero-illustration .container:nth-child(1) {
            grid-area: a;
        }
        #hero-illustration .container:nth-child(2) {
            grid-area: b;
        }
        #hero-illustration .container:nth-child(3) {
            grid-area: c;
        }
        #hero-illustration img {
            --crop-focus-x: 0.32;
            --crop-focus-y: 0.56;
            --container-width: 100cqw;
            --container-height: 100cqh;
            --image-width: calc(-100% + var(--container-width));
            --image-height: calc(-100% + var(--container-height));
            display: block;
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: clamp(100%, calc(0.5 * var(--container-width) - var(--crop-focus-x) * var(--image-width)), 0%) clamp(100%, calc(0.5 * var(--container-height) - var(--crop-focus-y) * var(--image-height)), 0%);
        }
    </style>
    <figcaption>
        Image source placed into different sized containers in a grid. 
        The image is automatically cropped while centering the focal point if possible.
        (The focal point is the yellow sunny part above the waterfall, as you might have guessed.)
        <br>
        <small>Illustration: Created with the assistance of DALL·E 2</small>
    </figcaption>
</figure>

## Use client-side cropping sparingly

While client-side cropping can be an effective way to adapt images further for display on different screens and devices, 
it can also be a wasteful technique.
The downside of cropping on the client is that we discard pixels that we've spent resources on transferring and decoding. 
As a result  we end up with larger file sizes, slower load times, and a less optimal user experience overall. 
As such, it's important to use client-side cropping sparingly and consider alternative responsive image techniques. 

The web platform offers a range of built-in solutions to optimize images for different screen sizes and devices, 
such as `srcset` and `sizes` attributes and the `<picture>` element. If you're not familiar with these solutions MDN has a great article on [providing responsive images][responsive-images].

<!--
While these techniques are useful, they do have limitations. 
For instance, they may not be able to handle situations 
where the image's dimensions or aspect ratio are known upfront.
This can occur when designing elements such as a hero image with a fixed height and dynamic width, 
or when using a viewport-sized image.

In the next chapter, we'll explore how to fit images into a dynamically sized box to address these limitations.
We'll build upon this technique in subsequent chapters.
-->

## Fitting the image into specific dimensions
Let's start by trying to fit an image into a 3 / 1 aspect ratio. 
We can do this by declaring the [`aspect-ratio`][aspect-ratio] property on the image.

The image will adjust by stretching to fit its dimensions.
This is not exactly what we want, but it is a step in the right direction.

<figure>
<img
    src="/assets/image-cropping/nordlys.png"
    loading="lazy"
    style="width: 100%; aspect-ratio: 3 / 1;"
    alt="An image stretched into a 3:1 aspect ratio. {{imagealt2}}"
/>
{% highlight css %}
width: 100%; 
aspect-ratio: 3 / 1;
{% endhighlight %}
</figure>

## Maintaining the aspect-ratio of the image
To tell the browser how to resize the image to fit its container, we can use the [`object-fit`][object-fit] property.

This property allows us to choose how the image should be scaled, using values like `contain`, `cover`, `fill`, `none`, or `scale-down`.
When we use the `cover` value, the image is scaled to fill the container while preserving its natural aspect ratio.

<figure>
<img 
    src="/assets/image-cropping/nordlys.png" 
    loading="lazy" 
    style="width: 100%; aspect-ratio: 3 / 1; object-fit: cover;" 
    alt="An image fitted into a 3:1 aspect ratio while maintaining the aspect ratio. 
        The image is cropped towards the center. 
        {{imagealt2}}"
/>
{% highlight css %}
width: 100%; 
aspect-ratio: 3 / 1; 
object-fit: cover;
{% endhighlight %}
</figure>

This is a step in the right direction, but there's still an issue: 
the image is cropped towards the center, and not necessarily towards where our subject is placed.

## Adjusting the position of the image
To address the issue of the image being cropped towards the center, 
we can use the [`object-position`][object-position] property in CSS to reposition the image within its container.
Initially, we'll hand-tune the value of this property to achieve a better crop.

To ensure that the repositioning works across different screen sizes, 
we'll use relative units like `<percentage>` values instead of absolute units like pixels.
A value of `0%` aligns the start edge of the image with the start edge of the container, 
while a value of `100%` aligns the end edge of the image with the end edge of the container. 

When using a two value syntax with percentage values, 
the horizontal position is declared first followed by the vertical position. 

Let's say, for example, that we want to reposition an image so that its subject is in the bottom left corner of the container.
We could use a value of `0% 100%` for the `object-position` property to achieve this.

For our example a value of `50% 62%` seems to give suitable results:

<figure>
<img 
    src="/assets/image-cropping/nordlys.png" 
    loading="lazy" 
    style="
        width: 100%; 
        aspect-ratio: 3 / 1; 
        object-fit: cover; 
        object-position: 50% 62%;" 
    alt="An image fitted into a 3:1 aspect ratio while maintaining the aspect ratio. 
        The image position is hand tuned to fit the house in the crop. 
        {{imagealt2}}"
/>
{% highlight css %}
width: 100%; 
aspect-ratio: 3 / 1; 
object-fit: cover; 
object-position: 50% 62%;
{% endhighlight %}
</figure>

Although hand-tuning the object-position property allows us to create a nice crop for the current dimensions, 
it's not feasible to manually adjust the position for every image and every dimension. 
Instead, we need a more automated way to crop the image while preserving a focal point.

## Setting a focal point 
To define a custom focal point for cropping, we can declare [custom properties][custom-properties] like `--crop-focus-x` and `--crop-focus-y`,
and set these to values between 0 and 1. 
Using `<number>` values makes it possible to perform mathematical operations with [`<length-percentage>`][length-percentage] values using `calc()` .

For example, as the subject of our image is placed at around 60% horizontally and 60% vertically, we can set the custom properties accordingly:
* `--crop-focus-x: 0.6`
* `--crop-focus-y: 0.6`

While it's possible to use the custom focus point directly in `object-position`, 
you can see that the subject is not quite centered in the container. 

In the next sections we will dive into why we can't use the custom focus point directly, 
and explore a better method of calculating the `object-position` so that the focus point is centered in the container.

<figure>
<img 
    src="/assets/image-cropping/nordlys.png" 
    loading="lazy" 
    style="
        --crop-focus-x: 0.6;
        --crop-focus-y: 0.6;
        width: 100%; 
        aspect-ratio: 3 / 1; 
        object-fit: cover; 
        object-position: calc(var(--crop-focus-x) * 100%) calc(var(--crop-focus-y) * 100%);" 
    alt="An image fitted into a 3:1 aspect ratio while maintaining the aspect ratio. 
        The image is positioned using a simplistic scheme. 
        {{imagealt2}}"
/>
{% highlight css %}
--crop-focus-x: 0.6;
--crop-focus-y: 0.6;
width: 100%;
aspect-ratio: 3 / 1;
object-fit: cover;
object-position: 
    calc(var(--crop-focus-x) * 100%) 
    calc(var(--crop-focus-y) * 100%);
{% endhighlight %}
</figure>

## Why focus coordinates can not be used directly
To better understand why using focus coordinates directly in `object-position` doesn't work, 
let's take a look at an example image with three positions marked out along the horizontal axis: `25%`, `50%`, and `75%`.



<figure>
    <img
        id="percentages"
        src="/assets/image-cropping/percentages.png"
        loading="lazy"
        alt="An illustration with three focus points in the x axis marked out at 25%, 50% and 75% of the image width. 
            The points are marked with dark green dots, and a short line pointing down at a text showing the percentage distance."
        style="display: block; width: 100%; height: auto;"
        width="1000"
        height="250"
    />
</figure>

We can crop this image to a `1 / 1` aspect ratio and use the `--crop-focus-x` property to set the focus point to one of `0.25`, `0.5`, or `0.75`.
Below is an interactive demo where you can choose between the three values for `--crop-focus-x`:

<figure>
    <div id="percentages-illustration-1">
        <fieldset>
            <legend>--crop-focus-x</legend>
            <label><input type="radio" name="focus-point-x" value="25" checked/> 0.25</label>
            <label><input type="radio" name="focus-point-x" value="50"/> 0.50</label>
            <label><input type="radio" name="focus-point-x" value="75"/> 0.75</label>
        </fieldset>
        <img
            src="/assets/image-cropping/percentages.png"
            loading="lazy"
            alt="An image fitted into a 1:1 aspect ratio while maintaining the aspect ratio.
            The image is positioned using a simplistic scheme, so that values 25% and 75% are slightly off center when chosen."
        />
    </div>
    <style>
        #percentages-illustration-1 {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin-bottom: 20px;
        }
        #percentages-illustration-1 label {
            display: block;
        }
        #percentages-illustration-1 img {
            --crop-focus-x: 0.25;
            --crop-focus-y: 0.5;
            display: block;
            width: 33%;
            aspect-ratio: 1 / 1;
            object-fit: cover;
            object-position: calc(var(--crop-focus-x) * 100%) calc(var(--crop-focus-y) * 100%);
            transition: object-position 350ms ease-in-out;
        }
        #percentages-illustration-1 fieldset:has(input[value="25"]:checked) + img{
            --crop-focus-x: 0.25;
        }
        #percentages-illustration-1 fieldset:has(input[value="50"]:checked) + img{
            --crop-focus-x: 0.50;
        }
        #percentages-illustration-1 fieldset:has(input[value="75"]:checked) + img{
            --crop-focus-x: 0.75;
        }
    </style>
    <figcaption>
        `--crop-focus-x` is mapped directly to object position. 
        It is clearly visible that the desired focus point is not positioned in the center of the container.
        <br/>
        <small>Illustration: Created with the assistance of DALL·E 2</small>
    </figcaption>
</figure>

As you can see, when the focus point is set to 25% or 75%, the cropped image is off-center and the focus point is not centered in the container. 
This is not the behavior we want. 
Ideally, the cropped image should keep the focus point in the center. 
So what's causing this behavior?

## How percentage values in object-position work

Let's take a closer look at how percentage values in `object-position` work. 
According to the [CSS Backgrounds and Borders Module Level 3][background-position-percentage], 
the horizontal offset is calculated as a percentage of the difference between the width of the container and the width of the image, 
while the vertical offset is calculated as a percentage of the difference between the height of the container and the height of the image.

**In other words, if we have a container that is 200px wide and the image is scaled to be 300px wide, 
then a value of 100% will resolve to a used value of -100px.**

You can read more about percentages on [MDN][regarding-percentages].

<figure>
    <img src="/assets/image-cropping/percentage-values.png" width="1000" height="250"/>
    <figcaption>
        Percentage values in `object-position` are relative to the difference between sizes of the container and the scaled image. 
        When using `object-fit: cover` a value of 100% for `object-position` will resolve to a negative value as the image is wider than the container.

        <br/>
        <small>Illustration: Created with the assistance of DALL·E 2</small>
    </figcaption>
</figure>

This behavior is not a bug, but a clever feature of CSS.
For example, `object-position: 0% center` will align the image to the left border of the container, 
while `object-position: 100% center` will align the image to the right border of the container. 
As long as the author keeps the values between `0%` and `100%`, 
it is not possible to "overshoot" the position of the image.

However, using percentages directly in `object-position` won't help us achieve our goal of centering the focus point. 

**For instance, a declaration of `object-position: 25% 0%` means that a spot that is 25% from the left of the image will be placed 25% from the container's left _and not in the center_.** 
This is not be the behavior we want, since the focus point will end up off-center as we saw in the previous section.

In the next section we will address the problem of calculating `object-position` so that the focus point is kept in the center.

## Centering the focal point
To center the focal point in the container, 
we need to calculate the appropriate `object-position` values. 
Let's focus on the horizontal dimension and break down the calculation into two steps:
1. Move the left edge of the image to the center of the container
2. Then move the image to the left so that the focal point is in the center of the container


<figure>
    <img 
        src="/assets/image-cropping/steps.png"
        alt="Illustration in two parts. 
            The first part shows the container as a black outline. 
            An arrow that is half the width of the container is pointing to the right. 
            An image below the container is shifted this amount to the right so that the left image edge is in the center of the container.
            The second part shows the container as a black outline. 
            An arrow that is half the width of the image is pointing to the left. 
            The image below is now shifted this amount to the left so that the focal point marked with a yellow circle ends up in the center of the container."
        width="1000"
        height="600"
        style="width: 100%; height: auto;"
    />
    <figcaption>
        <small>Illustration: Created with the assistance of DALL·E 2</small>
    </figcaption>
</figure>

#### Step 1
First we need to move the left edge of the image to the center of the container.
For now, we'll assume that we know the width of the container, and store it in a custom-property called `--container-width`.
The amount we need to move can be calculated as `0.5 * var(--container-width)`:

<figure id="left-edge-to-center">
    <div class="wrapper">
        <div class="container">
            <img
                src="/assets/image-cropping/fp-example.png"    
            />
        </div>
    </div>
    <fieldset>
        <legend>Use the radio buttons to navigate through the steps</legend>
        <label>
            <input type="radio" name="left-edge-move" value="no-move">
            Initial position
        </label>
        <label>
            <input type="radio" name="left-edge-move" value="to-center" checked>
            Step 1
        </label>
    </fieldset>
<style>
    #left-edge-to-center {
        --container-width: 250px;
    }
     #left-edge-to-center .wrapper {
        padding: 4px;
        overflow: clip;
    }
    #left-edge-to-center .container {
        position: relative;
        margin: 20px auto;
        width: 250px;
        aspect-ratio: 4 / 3;
        outline: 4px solid black;
    }
    #left-edge-to-center .container::after {
        content: '';
        display: block;
        position: absolute;
        inset: 0;
        box-shadow: 0 0 0 100vw rgba(255,255,255,0.5);
        outline: 4px solid black;
    }
    #left-edge-to-center img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: var(--object-position);
        overflow: visible;
        transition: object-position 350ms ease-in-out;
    }
    #left-edge-to-center:has(input[value="no-move"]:checked) {
        --object-position: 0% 0%
    }
    #left-edge-to-center:has(input[value="to-center"]:checked) {
        --object-position: 
            calc(0.5 * var(--container-width)) 
            0%;
    }
    #left-edge-to-center fieldset {
        margin-bottom: 5px;
    }
    #left-edge-to-center label {
        white-space: nowrap;
    }
</style>
{% highlight css %}
--container-width: 250px;
object-position: calc(0.5 * var(--container-width)) 0%;
{% endhighlight %}
</figure>

#### Step 2

Next, we need to move the image to the left so that the focal point is centered in the container. 
To do this, we need to know the distance between the left edge of the image and the focal point. 
We can calculate this distance by using the `--crop-focus-x` custom property and multiplying it by the width of the scaled image.
But first we need to figure out the size of the scaled image.

Remember how 100% corresponded to the amount difference between the image size and the container size?
**To find the width of the scaled image, we can simply subtract 100% from the container size:**

{% highlight css %}
--image-width: calc(var(--container-width) - 100%);
{% endhighlight %}

To find the distance from the left edge of the image to the focal point, we simply multiply `--crop-focus-x` with `--image-width`. 
Now we can subtract the resulting value from the value from the previous step to calculate the appropriate `object-position`:

<figure id="focus-to-center">
<div class="wrapper">
    <div class="container">
        <img
            src="/assets/image-cropping/fp-example.png"    
        />
    </div>
</div>
<fieldset>
        <legend>Use the radio buttons to navigate through the steps</legend>
        <label>
            <input type="radio" name="focus-point-move" value="no-move">
            Initial position
        </label>
        <label>
            <input type="radio" name="focus-point-move" value="to-center" checked>
            Step 1
        </label>
        <label>
            <input type="radio" name="focus-point-move" value="to-focus-point" checked>
            Step 2
        </label>
    </fieldset>
<style>
    #focus-to-center {
        --crop-focus-x: 0.6;
        --container-width: 250px;
        --image-width: calc(var(--container-width) - 100%);
    }
    #focus-to-center .wrapper {
        padding: 4px;
        overflow: clip;
    }
    #focus-to-center .container {
        position: relative;
        margin: 20px auto;
        width: 250px;
        aspect-ratio: 4 / 3;
        outline: 4px solid black;
    }
    #focus-to-center .container::after {
        content: '';
        display: block;
        position: absolute;
        inset: 0;
        box-shadow: 0 0 0 100vw rgba(255,255,255,0.5);
        outline: 4px solid black;
    }
    #focus-to-center img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: var(--object-position);
        overflow: visible;
        transition: object-position 350ms ease-in-out;
    }
    #focus-to-center:has(input[value="no-move"]:checked) {
        --object-position: 0% 0%
    }
    #focus-to-center:has(input[value="to-center"]:checked) {
        --object-position: 
            calc(0.5 * var(--container-width)) 
            0%;
    }
    #focus-to-center:has(input[value="to-focus-point"]:checked) {
        --object-position: 
            calc(0.5 * var(--container-width) - var(--crop-focus-x) * var(--image-width))
            0%;
    }
    #focus-to-center fieldset {
        margin-bottom: 5px;
    }
    #focus-to-center label {
        white-space: nowrap;
    }
</style>
{% highlight css %}
--container-width: 250px;
--image-width: calc(var(--container-width) - 100%);
--crop-focus-x: 0.6;
object-position: 
    calc(0.5 * var(--container-width) - var(--crop-focus-x) * var(--image-width))
    0%;
{% endhighlight %}
</figure>

After updating the example from the previous section with the new calculation, 
we can see that the focus point centered in the container:

<figure>
    <div id="percentages-illustration-2">
        <fieldset>
            <legend>--crop-focus-x</legend>
            <label><input type="radio" name="focus-x-2" value="25" checked/> 0.25</label>
            <label><input type="radio" name="focus-x-2" value="50"/> 0.50</label>
            <label><input type="radio" name="focus-x-2" value="75"/> 0.75</label>
        </fieldset>
        <img
            src="/assets/image-cropping/percentages.png"
            loading="lazy"
            alt="An image fitted into a 3:1 aspect ratio while maintaining the aspect ratio.
            The image is positioned using a simplistic scheme.
            {{imagealt2}}"
        />
    </div>
    <style>
        #percentages-illustration-2 {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin-bottom: 20px;
        }
        #percentages-illustration-2 label {
            display: block;
        }
        #percentages-illustration-2 img {
            --crop-focus-x: 0.25;
            --crop-focus-y: 0.5;
            --container-width: 250px;
            --container-height: 250px;
            --image-width: calc(-100% + var(--container-width));
            --image-height: calc(-100% + var(--container-height));
            display: block;
            width: var(--container-width);
            aspect-ratio: 1 / 1;
            object-fit: cover;
            object-position: calc(0.5 * var(--container-width) - var(--crop-focus-x) * var(--image-width)) calc(0.5 * var(--container-height) - var(--crop-focus-y) * var(--image-height));
            transition: object-position 350ms ease-in-out;
        }
        #percentages-illustration-2 fieldset:has(input[value="25"]:checked) + img {
            --crop-focus-x: 0.25;
        }
        #percentages-illustration-2 fieldset:has(input[value="50"]:checked) + img {
            --crop-focus-x: 0.50;
        }
        #percentages-illustration-2 fieldset:has(input[value="75"]:checked) + img {
            --crop-focus-x: 0.75;
        }
    </style>
    <figcaption>
       <em>object-position</em> is now calculated as a function of <em>--container-width</em>, <em>--image-width</em> and <em>--crop-focus-x</em>.
        The points should be centered in the container when selected.
        <br/>
        <small>Illustration: Created with the assistance of DALL·E 2</small>
    </figcaption>
</figure>

These two steps ensure that the focal point is centered horizontally in the container. 
To center the focal point vertically, we can follow the same steps, but use `--crop-focus-y`, `--container-height` and `--image-height` instead.
With these calculations, the focal point is centered both horizontally and vertically in the container.

{% highlight css %}
--crop-focus-x: 0.6;
--crop-focus-y: 0.5;
--container-width: 250px;
--container-height: 250px;
--image-width: calc(var(--container-width) - 100%);
--image-height: calc(var(--container-height) - 100%);
object-position: 
    calc(0.5 * var(--container-width) - var(--crop-focus-x) * var(--image-width)) 
    calc(0.5 * var(--container-height) - var(--crop-focus-y) * var(--image-height));
{% endhighlight %}

## Preventing image edges from entering the container
When using focus points close to the edges, 
we may run into the problem of the image edges entering the container.
To prevent this we can clamp the values of `object-position` between `100%` and `0%` using `clamp()`.

For example, if we set `--crop-focus-x` to `0.0` the left edge will move all the way to the center of the container.
By clamping `object-position` between `100%` to `0%` we make sure the edges of the image doesn't pass edges of the container.

{% highlight css %}
object-position:
    clamp(100%, calc(0.5 * var(--container-width) - var(--crop-focus-x) * var(--image-width)), 0%)
    clamp(100%, calc(0.5 * var(--container-height) - var(--crop-focus-y) * var(--image-height)), 0%);
{% endhighlight %}

**It's worth noting that we clamp from `100%` to `0%` and not the other way around. 
This is because `100%` is a negative value representing the difference between the container width and the image width.**

For example, if our container was 100px wide and our image 200px wide, then `100%` would resolve to `-100px`. 
By clamping between `100%` and `0%` we effectively keep the value between `-100px` and `0px`. 
If we clamped between `0%` and `100%` we would clamp between a minimum value of `0px` and a maximum value of `-100px`. 
Then the value would always be `0px` and the image would always be aligned to the left edge of the container, 
no matter where we put the focus point.


## Container queries
Previously, we assumed we already knew how big our container was.  
This is fairly reasonable when the container is sized with media queries or according to some known dimension such as the viewport.

However, there are many cases where we can not reliably know the dimensions of the container upfront. 
For example, when the container is put in a grid or a flexbox, it might be resized based on the surrounding content.

Until now, there hasn't really been a way to reliably know the dimensions of our container. But that has changed recently. 

After Firefox 110 was released, all the major browser now support [container queries][container-queries].
Container queries lets us define a **containment context** on an element, so that we can query the dimension of that context later. 

If we put our image into another element we can make this element a containment context by setting `container-type` to `size`. 
Then we can use [container query length units][container-query-length-units] to get the dimensions of our container:


{% highlight css %}

.container {
    container-type: size;
}

img {
    --crop-focus-x: 0.6;
    --crop-focus-y: 0.5;
    --container-width: 100cqw;
    --container-height: 100cqh;
    --image-width: calc(var(--container-width) - 100%);
    --image-height: calc(var(--container-height) - 100%);
    object-position:
        clamp(100%, calc(0.5 * var(--container-width) - var(--crop-focus-x) * var(--image-width)), 0%)
        clamp(100%, calc(0.5 * var(--container-height) - var(--crop-focus-y) * var(--image-height)), 0%);
    }
{% endhighlight %}

<figure id="cqu-illustration">
    <div class="grid">
        <div class="container">
            <img
                src="/assets/image-cropping/focus-point-resize.jpg"
                loading="lazy"
                alt="A horizontally cropped image. {{imagealt1}}"
            />
        </div>
        <div class="container">
            <img
                src="/assets/image-cropping/focus-point-resize.jpg"
                loading="lazy"
                alt="A squarely cropped image.  {{imagealt1}}"
            />
        </div>
        <div class="container">
            <img
                src="/assets/image-cropping/focus-point-resize.jpg"
                loading="lazy"
                alt="A vertically cropped image.  {{imagealt1}}"
            />
        </div>
        <div class="container">
            <img
                src="/assets/image-cropping/focus-point-resize.jpg"
                loading="lazy"
                alt="A vertically cropped image.  {{imagealt1}}"
            />
        </div>
    </div>
    <style>
        #cqu-illustration .grid {
            display: grid;
            aspect-ratio: 4 / 3;
            grid-template-rows: 1fr 1fr 1fr;
            grid-template-areas:
                "a b b b"
                "a c c d"
                "a c c d";
        }
        #cqu-illustration .container {
            box-sizing: border-box;
            container-type: size;
            position: relative;
            width: 100%;
            height: 100%;
            border: 4px solid black;
        }
        #cqu-illustration .container:nth-child(1) {
            grid-area: a;
        }
        #cqu-illustration .container:nth-child(2) {
            grid-area: b;
        }
        #cqu-illustration .container:nth-child(3) {
            grid-area: c;
        }
        #cqu-illustration .container:nth-child(4) {
            grid-area: d;
        }
        #cqu-illustration img {
            --crop-focus-x: 0.32;
            --crop-focus-y: 0.56;
            --container-width: 100cqw;
            --container-height: 100cqh;
            --image-width: calc(-100% + var(--container-width));
            --image-height: calc(-100% + var(--container-height));
            display: block;
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: clamp(100%, calc(0.5 * var(--container-width) - var(--crop-focus-x) * var(--image-width)), 0%) clamp(100%, calc(0.5 * var(--container-height) - var(--crop-focus-y) * var(--image-height)), 0%);
        }
    </style>
    <figcaption>
        The final cropping solution demonstrated by placing the images into different sized grid areas.
        <br>
        <small>Illustration: Created with the assistance of DALL·E 2</small>
    </figcaption>
</figure>

## TL;DR
In case you found the above sections to tedious, and just want the solution I've summarized it here:
1. Declare the desired focus point with `--crop-focus-x` and `--crop-focus-y`.
2. Use `object-fit: cover` to scale and crop the image to fit the container dimensions while maintaining its aspect ratio..
3. Figure out the container size and store it as `--container-width` and `--container-height`. Use container query length units if necessary.
4. Use the container width to calculate the size of the resized image by setting `--image-width: calc(var(--container-width) - 100%)` and `--image-height: calc(var(--container-height) - 100%)`.
5. Figure out the length from the edge of the image to the focus point by multiplying `--crop-focus-x` with `--image-width`. Do the same for the vertical dimension.
6. The position can now be calculated as `0.5 * var(--container-width) - var(--crop-focus-x) * var(--image-width)`.
7. Clamp the final position between `100%` and `0%` so that the edges of the image are not moved into the container.

_Make sure you only use client-side cropping as a progressive enhancement,
and that images are still usable in browsers where new technology like ´container queries` are not supported yet._

{% highlight css %}

.container {
    container-type: size;
}

img {
    --crop-focus-x: 0.6;
    --crop-focus-y: 0.5;
    --container-width: 100cqw;
    --container-height: 100cqh;
    --image-width: calc(var(--container-width) - 100%);
    --image-height: calc(var(--container-height) - 100%);
    object-position:
        clamp(100%, calc(0.5 * var(--container-width) - var(--crop-focus-x) * var(--image-width)), 0%)
        clamp(100%, calc(0.5 * var(--container-height) - var(--crop-focus-y) * var(--image-height)), 0%);
}
{% endhighlight %}

<figure id="percentages-illustration-3">
    <div class="wrapper">
        <div class="container">
            <img
                src="/assets/image-cropping/focus-point-resize.jpg"
                loading="lazy"
                alt="alt"
            />
        </div>
    </div>
    <style>
        #percentages-illustration-3 .wrapper {
            width: 100%;
            aspect-ratio: 1 / 1;
            display: flex; 
            justify-content: center;
            align-items: center;
            padding: 0;
        }
        #percentages-illustration-3 .container {
            box-sizing: border-box;
            container-type: size;
            width: 100%;
            height: 100%;
            min-width: 30px;
            min-height: 30px;
            max-width: 100%;
            max-height: 100%;
            border: 4px solid black;
            overflow: hidden;
            resize: both;
        }
        #percentages-illustration-3 img {
            --crop-focus-x: 0.32;
            --crop-focus-y: 0.56;
            --container-width: 100cqw;
            --container-height: 100cqh;
            --image-width: calc(var(--container-width) - 100%);
            --image-height: calc(var(--container-height) - 100%);
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 
                clamp(100%, calc(0.5 * var(--container-width) - var(--crop-focus-x) * var(--image-width)), 0%) 
                clamp(100%, calc(0.5 * var(--container-height) - var(--crop-focus-y) * var(--image-height)), 0%);
        }
    </style>
    <figcaption>
        Final cropping solution using container units and object-position. 
        Resize the image by dragging the handle in the lower right corner of the image.
        (This example currently doesn't work in Safari as <em>resize</em> is disabled when the element has a child size container.)
        <br/>
        <small>Illustration: Created with the assistance of DALL·E 2</small>
    </figcaption>
</figure>


[aspect-ratio]:https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio
[responsive-images]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
[object-fit]: https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
[object-position]: https://developer.mozilla.org/en-US/docs/Web/CSS/object-position
[custom-properties]: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
[background-position-percentage]: https://w3c.github.io/csswg-drafts/css-backgrounds-3/#valdef-background-position-percentage
[regarding-percentages]: https://developer.mozilla.org/en-US/docs/Web/CSS/background-position#regarding_percentages
[length-percentage]: https://developer.mozilla.org/en-US/docs/Web/CSS/length-percentage
[container-queries]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries
[container-query-length-units]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries#container_query_length_units