module.exports = {
  // types,
  types: [
    {
      value: ':heavy_plus_sign: 新增',
      name: '➕ 添加文章'
    },
    {
      value: ':heavy_minus_sign: 删除',
      name: '➖ 删除文章'
    },
    {
      value: ':pencil: 修改',
      name: '📝 修改文章'
    },
    {
      value: ':art: 修改目录',
      name: '🎨 修改目录'
    },
    {
      value: ':bookmark: 发布',
      name: '🔖 发布版本'
    },
    {
      value: ':rocket: 发布',
      name: '🚀 发布文章'
    },
    {
      value: ':wrench: 更改',
      name: '🔧 更改配置'
    },
    {
      value: ':tada: 初始化',
      name: '🎉 初次提交'
    }
  ],

  scopes: [
    { name: '配置文件' },
    { name: '前端忍者之路' },
    { name: '深究JavaScript' },
    { name: '修炼React' },
    { name: '揭秘Vue' },
    { name: '实践TypeScript' },
    { name: 'Nuxt.js实践' },
    { name: '问道Angular' },
    { name: 'Electron指南' },
    { name: 'CSS秘籍' },
    { name: 'Nodejs备忘录' },
    { name: '前端性能优化' },
    { name: '前端实践' },
    { name: '进击Python' }
  ],

  // it needs to match the value for field type. Eg.: 'fix'

  // scopeOverrides: {
  // fix: [
  // { name: 'merge' },
  // { name: 'style' },
  // { name: 'e2eTest' },
  // { name: 'unitTest' },
  // ],
  // },
  scopeOverrides: {
    ':wrench: docs': [{ name: ':wrench: docs' }, { name: ':bulb: docs_code' }]
  },

  // override the messages, defaults are as follows
  messages: {
    type: '选择更改类型:',
    scope: '\n更改的范围:',
    // 如果allowcustomscopes为true，则使用
    // customScope: 'Denote the SCOPE of this change:',
    subject: '简短描述:\n',
    body: '详细描述. 使用"|"换行:\n',
    breaking: 'Breaking Changes列表:\n',
    footer: '关闭的issues列表. E.g.: #31, #34:\n',
    confirmCommit: '确认提交?'
  },

  allowCustomScopes: false,
  allowBreakingChanges: ['feat', 'fix']
}
