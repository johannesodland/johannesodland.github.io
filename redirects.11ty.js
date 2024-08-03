export function data() {
  return {
    pagination: {
      data: 'redirects',
      size: 1,
      alias: 'redirect',
    },
    redirects: [
      {
        from: '/state/scroll-snap/scroll-driven-animations/2023/06/18/scroll-persisted-state.html',
        to: '/2023/06/18/scroll-persisted-state.html',
      },
    ],

    layout: 'redirect',
    eleventyComputed: {
      permalink: (data) => {
        return data.redirect.from
      },
    },
  }
}

export function render(data) {
  return ''
}
