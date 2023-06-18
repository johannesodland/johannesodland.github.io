---
layout: post
title:  "Scroll-persisted State"
date:   2023-06-18 23:00:00 +0200
categories: state scroll-snap scroll-driven-animations
author: Johannes Odland, rephrased with the help of ChatGPT
---
While working on another article, I stumbled upon a fascinating discovery:
a way to manipulate and read state solely through style rules using HTML and CSS.

The hack builds upon one realization: Scroll containers can hold state in their scroll position.
This state can be set using scroll-snap, and read using scroll-driven animations.

**We can use a single div with style rules to write, store and read a state.**

Currently, this technique is exclusive to Chrome Canary or other browsers that support scroll-driven animation.
Also, it's worth mentioning that its implications on accessibility or performance haven't been thoroughly assessed. 
Therefore, while it makes for an intriguing play around, it's not quite production-ready just yet.

Let's dive into the details.

## Maintaining state
Storing state can be achieved by using a simple `<div>` element, 
and converting it into a scroll container using `overflow-x: scroll`.
To give it scrollable overflow, we add a pseudo-element to the div, 
placing it just outside the scroll-port.

The scroll position constitutes our state. 
Specifically, the scroll container is in one state when scrolled to the start, and another when scrolled to the end.
Visually, the state element takes on a red background color when the container is scrolled to the start, 
and transitions to green when scrolled to the end.

<figure id="example-1">
    <div class="state"></div>
    <style>
        @scope {
            *, *::before, *::after {
                box-sizing: border-box;
            }
            .state {
                display: flex;
                width: 80px;
                height: 30px;
                border-radius: 15px;
                overflow-x: scroll;
                background: red;
                margin: 10px;
                line-height: 20px;
                color: white;
                &::before, &::after {
                    content: '';
                    display: block;
                    flex: none;
                    width: 100%;
                    height: 100%;
                    padding: 5px 10px;
                    text-align: center;
                }
                &::before {
                    content: 'Scroll →';
                    background: red;
                }
                &::after {
                    content: 'ON';
                    background: green;
                }
            }
        }
    </style>
    <figcaption>
        Our initial scroll state element. <br/>
        The element must currently be scrolled manually to toggle the 'state'.
    </figcaption>
</figure>

```css
.state {
    display: flex;
    width: 80px;
    height: 30px;
    border-radius: 15px;
    overflow-x: scroll;

    &::before, &::after {
        content: '';
        display: block;
        flex: none;
        width: 100%;
        height: 100%;
    }

    &::after {
        background: green;
    }
}
```


## Altering State with Scroll-Snap

Now that we've got an element maintaining our state through its scroll position, we can attempt to modify this state.

The scroll position, and thereby the state, can be changed temporarily through the application of scroll-snap. 
Notably, the state remains preserved even after removing the scroll snapping declarations.

For illustrative purposes, in our example, we trigger scroll-snap on hover. 
Nevertheless, for more complex scenarios, [space-toggles][space-toggle] or [cyclic-toggles][cyclic-toggles] can come in handy.
<figure id="example-2">
    <div class="state"></div>
    <style>
        @scope {
            *, *::before, *::after {
                box-sizing: border-box;
            }
            .state {
                display: flex;
                width: 80px;
                height: 30px;
                border-radius: 15px;
                overflow-x: scroll;
                background: red;
                margin: 10px;
                line-height: 20px;
                color: white;
                scroll-snap-type: x mandatory;
                &::before, &::after {
                    content: '';
                    display: block;
                    flex: none;
                    width: 100%;
                    height: 100%;
                    padding: 5px 10px;
                    text-align: center;
                }
                &::before {
                    content: 'Hover';
                    background: red;
                }
                &::after {
                    content: 'ON';
                    background: green;
                }
                &:hover::after {
                    scroll-snap-align: end;
                }
            }
        }
    </style>
    <figcaption>
        Try hovering the element to toggle the 'state'.
    </figcaption>
</figure>

```css
.state {
    /* ... */
    scroll-snap-type: x mandatory;
    /* ... */
    &:hover::after {
        scroll-snap-align: end;
    }
}
```
## Reading the state
Awesome, we now have a mechanism to store and set the state. But, how do we read this state?

With the advent of scroll-driven animations, 
we can use these as a means to interpret the state. 
We can employ either a `view-timeline` or a `scroll-timeline` to expose the state's value, 
and with the use of `timeline-scope`, we can even elevate it to the root element if necessary.

I'll use [cyclic toggles][cyclic-toggles] to read the state as I think that's neat, 
but there are many ways to read out the state, 
either by using [space-toggles][space-toggle] or setting properties directly in the animation keyframes. 

<figure id="example-3">
    <div class="use-state">
        <div class="state"></div>
    </div>
    <style>
        @scope {
            *, *::before, *::after {
                box-sizing: border-box;
            }
            @keyframes read-state {
                contain 0% {
                    --state: var(--state--off);
                }
                contain 100% {
                    --state: var(--state--on);
                }
            }
            .state {
                display: flex;
                width: 80px;
                height: 30px;
                border-radius: 15px;
                overflow-x: scroll;
                background: red;
                margin: 10px;
                line-height: 20px;
                color: white;
                scroll-snap-type: x mandatory;
                &::before, &::after {
                    content: '';
                    display: block;
                    flex: none;
                    width: 100%;
                    height: 100%;
                    padding: 5px 10px;
                    text-align: center;
                }
                &::before {
                    content: 'Hover';
                    background: red;
                }
                &::after {
                    content: 'ON';
                    background: green;
                    view-timeline: --state-1 inline;
                }
                &:hover::after {
                    scroll-snap-align: end;
                }
            }
            .use-state {
                --state: var(--state--off);
                --state--off: var(--state, );
                --state--on: var(--state, );
                display: flow-root;
                height: 100px;
                timeline-scope: --state-1;
                animation: read-state;
                animation-timeline: --state-1;
                background: 
                    var(--state--off, pink)
                    var(--state--on, palegreen);
            }
        }
    </style>
    <figcaption>
        Try hovering the element to toggle the 'state'.
    </figcaption>
</figure>

```css
@keyframes read-state {
    contain 0% {
        --state: var(--state--off);
    }
    contain 100% {
        --state: var(--state--on);
    }
}

.state {
    /* ... */
    &::after {
        view-timeline: --state-1 inline;
    }
}

.use-state {
    --state: var(--state--off);
    --state--off: var(--state, );
    --state--on: var(--state, );
    height: 100px;
    timeline-scope: --state-1;
    animation: read-state;
    animation-timeline: --state-1;
    background: var(--state--off, pink) var(--state--on, palegreen);
}
```

## Manipulating the state trough custom properties
While directly writing the state with scroll-snap is effective, it can be a bit unwieldy.
A smoother alternative can be achieved by exposing custom properties,
which would then allow us to manipulate the state using [space-toggles][space-toggle] instead.

In this case, we will use `--write-state-on: ;` to switch the state to on and `--write-state-off: ;` to transition the state to off.
This method allows us to manipulate the state externally, outside the confines of the state element itself.

```css
.state {
    /* ... */
    &::before {
        scroll-snap-align: var(--write-state-off) start;
    }
    &::after {
        scroll-snap-align: var(--write-state-on) end;
    }
}
```

<figure id="example-4">
    <div class="use-state">
        <div class="state"></div>
        <div class="on"><span>ON</span></div>
        <div class="off"><span>OFF</span></div>
    </div>
    <style>
        @scope {
            *, *::before, *::after {
                box-sizing: border-box;
            }
            @keyframes read-state {
                contain 0% {
                    --state: var(--state--off);
                }
                contain 100% {
                    --state: var(--state--on);
                }
            }
            .state {
                display: flex;
                width: 80px;
                height: 30px;
                border-radius: 15px;
                overflow-x: scroll;
                background: red;
                margin: 10px;
                line-height: 20px;
                color: white;
                scroll-snap-type: x mandatory;
                &::before, &::after {
                    content: '';
                    display: block;
                    flex: none;
                    width: 100%;
                    height: 100%;
                    padding: 5px 10px;
                    text-align: center;
                }
                &::before {
                    content: 'OFF';
                    background: red;
                    scroll-snap-align: var(--write-state-off) start;
                }
                &::after {
                    content: 'ON';
                    background: green;
                    view-timeline: --state-1 inline;
                    scroll-snap-align: var(--write-state-on) end;
                }
            }
            .on, .off {
                display: grid;
                width: 100px;
                height: 100px;
                margin: 10px;
                border-radius: 5px;
                place-content: center;
                color: #fff;
            }
            .on { background: green; }
            .off { background: red; }
            :has(.on:hover) {
                --write-state-on: ;
            }
            :has(.off:hover) {
                --write-state-off: ;
            }
            .use-state {
                --state: var(--state--off);
                --state--off: var(--state, );
                --state--on: var(--state, );
                display: flow-root;
                timeline-scope: --state-1;
                animation: read-state;
                animation-timeline: --state-1;
                background: 
                    var(--state--off, pink)
                    var(--state--on, palegreen);
            }
        }
    </style>
    <figcaption>
        Try hovering the ON and OFF elements to toggle the 'state'.
    </figcaption>
</figure>


## Trigger a state change using another scroll-timeline
Now that we can trigger the state change from outside the state element itself, 
we can trigger the state change from another scroll-driven animation.

<figure id="example-4">
    <div class="read-and-write-state">
        <div class="state"></div>
    </div>
    <style>
        @scope {
            *, *::before, *::after {
                box-sizing: border-box;
            }
            @keyframes read-state {
                contain 0% {
                    --state: var(--state--off);
                }
                contain 100% {
                    --state: var(--state--on);
                }
            }
            @keyframes write-state {
                100% {
                    --write-state-on: ;
                }
            }
            .state {
                display: flex;
                position: sticky;
                top: 10px;
                width: 80px;
                height: 30px;
                border-radius: 15px;
                overflow-x: scroll;
                background: red;
                margin: 10px;
                line-height: 20px;
                color: white;
                scroll-snap-type: x mandatory;
                &::before, &::after {
                    content: '';
                    display: block;
                    flex: none;
                    width: 100%;
                    height: 100%;
                    padding: 5px 10px;
                    text-align: center;
                }
                &::before {
                    content: 'OFF';
                    background: red;
                    scroll-snap-align: var(--write-state-off) start;
                }
                &::after {
                    content: 'ON';
                    background: green;
                    view-timeline: --state-1 inline;
                    scroll-snap-align: var(--write-state-on) end;
                }
            }
            .read-and-write-state {
                --state: var(--state--off);
                --state--off: var(--state, );
                --state--on: var(--state, );
                display: grid;
                height: 100px;
                grid-template-rows: 200px;
                overflow-y: scroll;
                timeline-scope: --state-1;
                animation: write-state, read-state;
                animation-timeline: scroll(self block), --state-1;
                background: 
                    var(--state--off, pink)
                    var(--state--on, palegreen);
            }
        }
    </style>
    <figcaption>
        Scroll down in the pink container to trigger a state change.
    </figcaption>
</figure>

```css

@keyframes write-state {
    100% {
        --write-state-on: ;
    }
}

.read-and-write-state {
    --state: var(--state--off);
    --state--off: var(--state, );
    --state--on: var(--state, );
    display: grid;
    height: 100px;
    grid-template-rows: 200px;
    overflow-y: scroll;
    timeline-scope: --state-1;
    animation: write-state, read-state;
    animation-timeline: scroll(self block), --state-1;
    background: 
        var(--state--off, pink)
        var(--state--on, palegreen);
}
```

## Acknowledgments

This exploration would not have been possible without the inspiration and groundbreaking work of many brilliant individuals in the field. 
I would like to express my gratitude to:

* The team behind CSS Day, whose event sparked my curiosity and led me down this fascinating path.
* Roman Komarov, who introduced us to the wonders of [Cyclic Toggles][cyclic-toggles].
* Lea Verou and Ana Tudor, among others, who unveiled the power and potential of [Space Toggles][space-toggle].
* Bramus, who cleverly found a way to hack modern CSS into supporting [Scroll Triggered Animations][scroll-triggered-animations].

Their contributions have significantly enriched our understanding of CSS and its capabilities. I am in awe of their ingenuity and thankful for their shared knowledge.

## TL;DR;
With the advent of scroll-driven animations we can store, write and read state from a single div. 
I'm not sure this is a good idea, but I think it's a neat discovery.

[cyclic-toggles]: https://kizu.dev/cyclic-toggles/
[space-toggle]: https://lea.verou.me/2020/10/the-var-space-hack-to-toggle-multiple-values-with-one-custom-property/
[scroll-triggered-animations]: https://www.bram.us/2023/06/15/scroll-triggered-animations/