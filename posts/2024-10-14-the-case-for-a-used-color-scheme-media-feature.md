---
layout: post
title: 'The Case for a Used-Color-Scheme Media Feature'
date: 2024-10-14 20:30:00 +02:00
author: Johannes Odland
---

The [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) media feature
currently lets us detect if a user has requested a light or a dark color scheme on a system level.
This feature allows us to provide specific styles, images and videos to adapt to users’ preferences.

**While useful in its current form, it might not be flexible enough for some sites.**

This is evident on sites like GitHub and Mastodon which don't rely solely on the system preferences.
Instead they allow the user to set a site-specific preference, giving the option between light, dark or system color scheme.

Some sites may also have pages that, by design, override the site-specific preferences.

For these sites to share common stylesheets or media elements,
they need to be able to query the _used color scheme_ for that specific page.

**In this post, I'll outline the efforts to tackle these challenges, 
including the reasoning for why I think we need a new media feature to query the used color scheme.**

## Site specific preferences

Implementing dark-mode across an entire site can be a major undertaking.
Once it's done, you may prefer giving users the option to switch to the new color scheme, 
rather than automatically aligning them with their system settings.
Users might be accustomed to the current color scheme, and forcing a change could lead to backlash.

Some users might prefer a dark color scheme for their system,
but still prefer to read certain sites in light mode, such
as Sara Soueidan [pointed out in this tweet](https://x.com/SaraSoueidan/status/1421857067111956486).
I agree with her; while I use a dark color scheme on a system level, I prefer to use some sites in light mode.

**To support this, you would need to provide a site-specific color scheme preference.**

## Page specific overrides

Even with a site-specific color scheme toggle, some pages might need to be exempted.
Some services or features might be designed to only work in light or dark mode.
One example is a video page that by design always uses dark mode, as [Josh Tumath mentions in this comment](https://github.com/w3c/csswg-drafts/issues/10249#issuecomment-2288822927).

**To support this, your stylesheets and media components must support page-specific overrides.**

## Current workarounds

Unfortunately, the built-in `prefers-color-scheme` currently supports neither site-specific preferences, nor page-specific overrides.

If you need this functionality on your site, it's up to you to implement your own custom darkmode toggle.
This is not straightforward and can require some duplication, as Bramus points out in his article
[Dark Mode Toggles Should be a Browser Feature](https://www.bram.us/2022/05/25/dark-mode-toggles-should-be-a-browser-feature/).

You would have to implement a toggle,
then persist the value, fetch it the next time the user visits and respond to changed system preferences.
(Check out how Hidde implemented his in [How I built a dark mode toggle](https://hidde.blog/dark-light/))

However, by implementing your own toggle, you can no longer rely on the `prefers-color-scheme` feature in your CSS,
or in your media sources.
This is a big issue if you need images or videos to match the color-scheme.

**For me, this is one of the most pressing issues with the current state of color-scheme preferences.**

A common issue I encounter is the need for illustrations or infographics to match the page's color scheme.

## Proposed solutions

It probably won't surprise you that I share the views of [Hidde](https://hidde.blog/dark-light/), [Bramus](https://www.bram.us/2022/05/25/dark-mode-toggles-should-be-a-browser-feature/) and [Jim Nielsen](https://blog.jim-nielsen.com/2022/browser-level-color-scheme-preference/)
that site-level dark-mode toggles should be a browser feature.

There are a few proposals that would solve this, at least partly.

### 1. Web Preferences API
I would prefer an API like the [proposed](https://github.com/w3c/csswg-drafts/issues/6517) [Web Preferences API](https://drafts.csswg.org/mediaqueries-5/#auto-pref①).  
This API would allow you to override the user preferences on your site using JavaScript.

```html
<script>
    navigator.preferences.colorScheme.requestOverride('dark');
</script>
<picture>
    <source media="(color-scheme: dark)" src="dark.jpg">
    <source src="light.jpg">
    <img alt="...">
</picture>
```

This would allow the migration of existing user preferences and allow the users to toggle color scheme alongside other site-wide preferences.

One issue though might be that you might no longer query the system wide preferences using `prefers-color-scheme`.

### 2. In browser settings per-site
[WebKit has opposed this API](https://github.com/WebKit/standards-positions/issues/252),
and suggests implementing per-site user preferences in the browser as an alternative.
I am less enthusiastic about this proposal. 
Sites would have to drop their current toggle and existing user preferences.

### 3. Custom script based media queries
An alternative solution could be to use a [custom script based media query](https://drafts.csswg.org/mediaqueries-5/#script-custom-mq), 
also a part of Media Queries Level 5.

```html
    <script>
    CSS.customMedia.set('--used-color-scheme', 'dark');
    </script>
    <style>
    @media (_used-color-scheme: 'dark') { ... }
    </style>
```

While this would allow sites to create their own dark-mode toggle it would encourage non-standard media queries, 
perhaps making it more difficult to share components across sites.

<p style="text-align: center;">⁂</p>

**While the above proposals for a site-specific user preference would be a significant improvement,
it won't address then need for page specific overrides.**

### 4. Meta affecting the prefers-color-scheme

[Tab has opened an issue](https://github.com/w3c/csswg-drafts/issues/10249) suggesting
that `<meta name=color-scheme>` should affect the `(prefers-color-scheme:dark)` media query.

If accepted, this change could provide a quick solution for both site-specific preference, and specific overrides.
Because it directly impacts the existing `prefers-color-scheme` it would also adress the issue of loading matching media assets[^1].


### 5. Style query

In the discussions on the issue above, 
opinions seem to be shifting towards a container style query letting you query the _used_ color-scheme property.
A regular style query would match on the calculated value and we need to match on the used value,
so a new mechanism would have to be introduced to do this.

```html
<script>
    document.body.style.colorScheme = 'dark'
</script>
<style>
    @container used-style(color-scheme: 'dark') {
        ...
    }
</style>
```

Unfortunately, this would not solve the need for matching media assets to the page's used color scheme, 
as media sources probably never will be selectable by style queries[^2].

### 6. Romans solution

Roman has found [a technique](https://blog.kizu.dev/querying-the-color-scheme/) 
that lets you capture the used value of the `color-scheme` property as a color using `light-dark()` and a registered custom property. 
With this captured value we can use style queries to adapt accordingly.
When used on `<html>` or `<body>`, this could solve the need for adapting to the used color-scheme.

This technique has some drawbacks, as Roman discusses in his article. 
Also, because it relies on style queries, 
it would not address my main concern of letting media assets adapt to the used color scheme.

## In conclusion

To avoid awkward workarounds, a site-level `prefers-color-scheme` toggle – preferably with a JavaScript API – is essential.
Additionally, there should be a way to override the preference per page, such as through `<meta name=color-scheme>`.

The resulting used color-scheme should be usable in a media query to load corresponding dark and light mode images. 
A style query would not adequately address this need.

**If its resolved that `prefers-color-scheme` is unaffected by `<meta name=color-scheme>`, 
we should look into a new `used-color-scheme` media feature.**

Josh Tumath has suggested opening a new issue for that [in this comment](https://github.com/w3c/csswg-drafts/issues/10249#issuecomment-2340321512).

[^1]: Video posters would be an exception, but that is a [whole other issue](https://github.com/whatwg/html/issues/4004#issuecomment-1588568569).
[^2]: Media sources can not be affected by style and layout, unless lazy-loaded.