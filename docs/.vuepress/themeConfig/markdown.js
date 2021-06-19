module.exports = {
  anchor: { permalink: true },
  toc: { includeLevel: [1, 2] },
  lineNumbers: true,
  extendMarkdown: md => {
    md.set({ breaks: true })
    md.use(require('markdown-it'))
  }
}