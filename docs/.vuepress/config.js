const config = require('./themeConfig/index')


module.exports = {
  theme:"antdocs",
  title: "全栈开发之路",
  description: "全链路学习知识库",
  base: "/blog/",
  cache: true,
  category: true,
  ...config,
};