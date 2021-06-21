const nav = require('./nav')
const sidebar = require('./sidebar.json')
const markdown = require('./markdown')
const head = require('./head')
const plugins = require('./plugins')

module.exports = {
  head,
  markdown,
  plugins,
  themeConfig: {
    logo: '/logo.jpg',
    smoothScroll: true,
    nav,
    sidebar,
    lastUpdated: "Last Updated",
    sidebarDepth: 2,
    repo: "https://github.com/staven630/blog",
    editLinks: false,
    footer: {
      createYear: 2021,
      copyrightInfo: 'staven | <a target="_blank" href="https://github.com/staven630" target="_blank">MIT License</a>'
    },
    author: {
      name: 'staven',
      link: 'https://github.com/staven630'
    }
  }
}
