module.exports = {
  // types,
  types: [
    {
      value: ':heavy_plus_sign: dep_add',
      name: '➕ 添加文章'
    },
    {
      value: ':heavy_minus_sign: dep_rm',
      name: '➖ 删除文章'
    },
    {
      value: ':pencil: docs',
      name: '📝 修改文章'
    },
    {
      value: ':art: style',
      name: '🎨 修改目录'
    },
    {
      value: ':bookmark: release',
      name: '🔖 发布版本'
    },
    {
      value: ':rocket: deploy',
      name: '🚀 发布文章'
    },
    {
      value: ':tada: init',
      name: '🎉 初次提交'
    }
  ],

  scopes: [{ name: '修炼React' }, { name: '前端工程化' }],

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
