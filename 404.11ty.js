import { html } from './lib/html.js'

export function data() {
  return {
    permalink: '/404.html',
    layout: 'default',
  }
}

export function render() {
  return html` <header>
      <a href="/" class="site-title">A Frontend Journal</a>
    </header>
    <style>
      .container {
        margin: 10px auto;
        max-width: 600px;
        text-align: center;
      }
      h1 {
        margin: 30px 0;
        font-size: 4em;
        line-height: 1;
        letter-spacing: -1px;
      }
    </style>
    <main class="container">
      <h1>404</h1>

      <p><strong>Page not found :(</strong></p>
      <p>The requested page could not be found.</p>
    </main>`
}
