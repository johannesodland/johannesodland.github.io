import { html } from './lib/html.js'

export function data() {
  return {
    layout: 'default',
  }
}

export function render(data) {
  return html`
    <header>
      <h1>${data.site.title}</h1>
    </header>
    <main>
      <div class="content">
        <section>
          <h2>Posts</h2>
          ${data?.collections?.posts?.toReversed()
            ?.map((post) => {
              return html`<article class="plug">
                <h3><a href="${post.url}">${post.data.title}</a></h3>
                <p>
                  ${new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    day: 'numeric',
                    month: 'short',
                    timeZone: 'Europe/Berlin',
                  }).format(post.data.date)}
                </p>
              </article>`
            })
            .join('\n')}
        </section>
      </div>
    </main>
  `
}
