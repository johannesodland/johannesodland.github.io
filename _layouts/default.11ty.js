import { html } from '../lib/html.js'

export function render(data) {
  return html`<!doctype html>
<html>
  <head>
      <meta charset=utf-8>
      <title>${data.title ?? data.site.title}</title>
      <style>@layer reset, default, layout;</style>
      <link rel=stylesheet href=/assets/css/reset.css>
      <link rel=stylesheet href=/assets/css/fonts.css>
      <link rel=stylesheet href=/assets/css/default.css>
      <link rel=stylesheet href=/assets/css/layout.css>
      <link rel=stylesheet href=/assets/css/style.css>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel=canonical href="https://odland.dev${data.page.url}">
      <meta http-equiv="refresh" content="0; url=https://odland.dev${data.page.url}" />
      <link rel="me" href="https://front-end.social/@johannes">
  </head>
  <body>
  
  ${data.content}
  
    <footer>
      <h2>${data.site.title}</h2>
      <p>Infrequent posts about CSS and other frontend stuff.</p>
      <ul>
        <li><a href="https://front-end.social/@johannes">Mastodon</a></li>
        <li><a href="https://github.com/johannesodland">Github</a></li>
        <li><a href="/feed.xml">Atom feed</a></li>
      </ul>
      <p>Built with <a href="https://www.11ty.dev">Eleventy</a>.</p>
    </footer>
  </body>
</html>`
}
