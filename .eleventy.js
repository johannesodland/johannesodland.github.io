import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import markdownItFootnote from 'markdown-it-footnote'
import { feedPlugin } from '@11ty/eleventy-plugin-rss'

const includeDrafts = process.env.DRAFTS === 'true'
export default async function (eleventyConfig) {
  eleventyConfig.amendLibrary('md', (mdLib) => mdLib.use(markdownItFootnote))
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPassthroughCopy('assets/**/*.*')
  eleventyConfig.addCollection('posts', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob(['posts/**/*', ...(includeDrafts ? ['drafts/**/*'] : [])])
      .filter((p) => p.data.published !== false)
  })
  eleventyConfig.addPlugin(feedPlugin, {
    type: 'atom',
    outputPath: '/feed.xml',
    collection: {
      name: 'posts', // iterate over `collections.posts`
      limit: 10, // 0 means no limit
    },
    metadata: {
      language: 'en',
      title: 'Johannes Odland',
      subtitle: 'Infrequent posts about CSS and other frontend stuff.',
      base: 'https://johannesodland.github.io/',
      author: {
        name: 'Johannes Odland',
        email: '',
      },
    },
  })
  return {
    dir: {
      input: '.',
      layouts: '_layouts',
    },
  }
}
