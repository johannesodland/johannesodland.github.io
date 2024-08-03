import { html } from '../lib/html.js'

export function render(data) {
  return html` <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <link rel="canonical" href="${data.redirect.to}" />
        <meta http-equiv="refresh" content="0; url=${data.redirect.to}" />
      </head>
      <body>
        <p>Redirecting…</p>
        <p><a href="${data.redirect.to}">Click here if you’re not redirected</a></p>
      </body>
    </html>`
}
