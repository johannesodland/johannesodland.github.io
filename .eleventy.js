import syntaxHighlight from '@11ty/eleventy-plugin-syntaxhighlight'
const includeDrafts = process.env.DRAFTS === 'true'
export default async function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPassthroughCopy('assets/**/*.*')
  eleventyConfig.addCollection('posts', (collectionApi) => {
    return collectionApi
      .getFilteredByGlob(['posts/**/*', ...(includeDrafts ? ['drafts/**/*'g] : [])])
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
