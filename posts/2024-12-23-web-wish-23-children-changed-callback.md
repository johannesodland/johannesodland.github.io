---
layout: post
title: 'Web Wish 23: Children Changed Callback'
date: 2024-12-23 16:00:00 +01:00
author: Johannes Odland
---

Handling nested custom elements can be frustrating. 

When the parent element is connected, it might have all, some or none of its children connected, 
depending on how the custom element is constructed.
More children can be added later by the parser or a script.

```html
<script>
    class ChildCountComponent extends HTMLElement {
        connectedCallback() {
            console.log(`${this.localName} has ${this.children.length} children when connected`);
        }
    }
    customElements.define("component-a", class ComponentA extends ChildCountComponent {});
</script>
<component-a><p>Child</p></component-a>
<component-b><p>Child</p></component-b>
<script>
    customElements.define("component-b", class ComponentB extends ChildCountComponent {});
</script>
```

In the example above, `<component-a>` will have 0 children when connected, as the element is already defined when the parser encounters the element. 
`<component-b>` will have 1 child when connected, as the custom element is upgraded after the parser is done.

To handle all of these cases, you have to set up a `MutationObserver` and react to the addition (and removals) of child nodes.
You could set a timeout, and pray the browser is done parsing the component when it yields. Risky business 😅.

Even if you manage handle the addition and removal of children, there's a remaining issue. 
If the child is a custom-element itself, can you be sure it's upgraded?

You could wait for `customElements.whenDefined()` if you control that child element yourself, 
but that doesn't work if the definition of that custom element is out of your control. 

To make all of this a bit simpler, I wish for `childChangedCallback()` and `childDefinedCallback()` lifecycle callbacks.

Relevant issues and PRs:

– [Need a callback for when children changed or parser finished parsing children][children-changed-or-parser-finished]

[children-changed-or-parser-finished]: https://github.com/WICG/webcomponents/issues/809
