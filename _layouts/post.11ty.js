import { html } from '../lib/html.js'

export function data() {
  return {
    layout: 'default',
    eleventyComputed: {
      permalink: (data) =>
        data.published !== false
          ? `${data.page.date.toISOString().substring(0, 10).replaceAll('-', '/')}/${data.page.fileSlug}.html`
          : false,
    },
  }
}

export function render(data) {
  return html` <header>
      <a href="/" class="site-title">${data.site.title}</a>
      <nav></nav>
    </header>

    <article role="main">
      <header>
        <time datetime="${data.date}" pubdate>
          ${new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            day: 'numeric',
            month: 'short',
            timeZone: 'Europe/Berlin',
          }).format(data.date)}
        </time>
        <h1>${data.title}</h1>
      </header>
      <div class="content">${data.content}</div>
    </article>`
}
