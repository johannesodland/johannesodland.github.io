import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
import markdownItFootnote from 'markdown-it-footnote'
const includeDrafts = process.env.DRAFTS === 'true'
export default async function (eleventyConfig) {
  eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(markdownItFootnote));
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPassthroughCopy('assets/**/*.*')
  eleventyConfig.addCollection('posts', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob(['posts/**/*', ...(includeDrafts ? ['drafts/**/*'] : [])])
      .filter((p) => p.data.published !== false)
      .reverse()
  })
  return {
    dir: {
      input: '.',
      layouts: '_layouts',
    },
  }
}
