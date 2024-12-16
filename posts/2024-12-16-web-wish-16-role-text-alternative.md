---
layout: post
title: 'Web Wish 16: Role Text Next'
date: 2024-12-16 16:00:00 +01:00
author: Johannes Odland
---

How should `<span>C</span><span>A</span><span>T</span>` or `IV` be read by Assistive Technology (AT)?
Should it be pronounced “C-A-T” and “I-V” or as “cat” and “Roman numeral four”?

Currently, this decision is left up to AT and browsers, which is practical and “safe”.
As authors we can't predict if the content will be spoken aloud or rendered in braille.

However, the AT and the browser can't always infer the authors intent.
For example, splitting cat into separate spans might be purely decorative,
and “IV” could mean intravenous in stead of a numeral.

## Say Hello (and Goodbye) to `role=text`

For a time there was [a proposal to add `role=text`][role-text-re-add] to ARIA.
This role would flatten the accessibility tree, presenting the contents as plain text.
Additionally, it would allow `aria-label` to override the presentation of the contents.

Both WebKit and Blink implemented support for `role=text`, and many sites started to rely on it.
But in 2023 [WebKit dropped support][webkit-issue],
and ARIA closed the [re-add role=text issue][role-text-re-add] shortly after.

## Why `role=text` Failed

Many opposed `role=text`, and with good reason:

- Flatting the accessibility hides the underlying structure, which can deny the users the ability to inspect the original content.
- While breaking up `IV` into `I V` might help speech synthesis, it could confuse braille users by teaching incorrect spellings.
- Often there's a better solution, such as using `role=img` in `<span role="img" aria-label="love">♥︎</span> New York.`
  Here `role=img` communicates that “love” is represented as an icon.

Today `role=text` is practically dead, though it's still [behind a flag in WebKit][webkit-complete-removal-issue],
awaiting complete removal if there's no protests.

## Exploring Alternatives

For a while there was an initiative to [add a new `aria-textseparation` property][aria-text-separation-issue]
that would let authors specify how text content should be separated from neighbouring elements.
Unfortunately the proposal has been stagnant since 2019.

There has been some progress, though.
ARIA 1.3 has added `aria-braillelabel` that allows us to provide a separate accessible name for Braille.
There is also ongoing work to [enable text-to-speach to pronounce words correctly][wai-pronunciation].

## The Remaining Issue

An unresolved problem involves text that is split into separate inline elements for presentational purposes.

Consider the following example:

```html
<a href="#...">
  <span style="...">Fear the goverments</span>
  <span style="...">gift will be expencive</span>
</a>
```

Using VoiceOver on an iPhone, this will read as two separate elements:

- “Fear the governments, link”
- “gift will be expensive, link”.

Luckily, for anchor elements (and others with a role that accept `aria-label`) we can fix this:

```html
<a href="#..." aria-label="Fear the governments gift will be expensive">...</a>`
```

However, if the text isn't part of an element that support `aria-label`,
there is no way to tell AT whether to read the text continuously or with pauses.

It's important for AT users to inspect structural changes, but excessive detail can create noise.
I see that in many cases AT users should be able to inspect that something is happening with the text,
For instance: 
```html
<span>C</span><span>A</span><span>T</span>
```

This might be split for animation purposes, and would be invisible to users with `prefers-reduced-motion: reduce`.
However, some AT would still read each characters separately, leading to a noisy experience.

**Excessive verbosity can sometimes hinder more than help.**

## My holiday wish

This Holiday season, I'm wishing for a new solution to help AT interpret text that is split into individual elements.
It seems like `role=text` wasn't the answer. [`aria-textseparation`][aria-text-separation-issue] seems to have faded away.
What we need is the next `role=text`.

[gather-use-cases]: https://github.com/w3c/aria/issues/1803
[role-text-re-add]: https://github.com/w3c/aria/issues/870
[aria-text-separation-issue]: https://github.com/w3c/aria/issues/699
[webkit-drops-role-text]: https://github.com/w3c/aria/issues/2011
[webkit-issue]: https://bugs.webkit.org/show_bug.cgi?id=260641
[webkit-complete-removal-issue]: https://bugs.webkit.org/show_bug.cgi?id=260685
[wai-pronunciation]: https://www.w3.org/WAI/pronunciation/
