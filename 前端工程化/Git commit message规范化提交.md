# Commit Message格式
&emsp;&emsp;目前使用较多的是 Conventional Commits specification规范。Commit Message结构如下所示：
```text
<type>(<scope>): <subject>

<body>

<footer>
```
* type: commit类别
* scope：说明 commit 影响的范围，比如数据层、控制层、视图层等等，视仓库不同而不同
* subject：必填，描述主要修改类型和内容，以动词开头，第一个字母小写，结尾不加句号（.）。不能超过50个字符
* body：描述为什么修改，做了哪些修改，以及开发思路，可分为多行，不能超过72个字符
* footer：描述错误信息ID、Breaking changes或Closed issues、修复的 bug 的链接，在 Footer 中可以写上 Closes #123


### Commit Message Type类型：
| type     | 功能          | 英文                            | 描述                                                       | 图标                 | emoji |
| :------- | :------------ | :------------------------------ | :--------------------------------------------------------- | :------------------- | :---- |
| feat     | 增加新功能    | A new features                  |                                                            | \:sparkles\:         | ✨     |
| fix      | 修复bug       | Fixing a bug                    |                                                            | \:bug\:              | 🐛    |
| docs     | 修改文档      | Writing docs                    | 仅文档更改                                                 | \:pencil\:           | 📝    |
| ui       | 更新UI        | Updating the UI and style files | 更新用户界面和样式文件                                     | \:lipstick\:         | 💄    |
| refactor | 代码重构      | Refactoring code                | 既不修复错误也不添加功能的代码更改                         | \:recycle\:          | ♻️    |
| release  | 发布          | Releasing / Version tags        |                                                            | \:bookmark\:         | 🔖    |
| deploy   | 部署          | Deploying stuff                 |                                                            | \:rocket\:           | 🚀    |
| test     | 增删测试      | Updating tests                  | 不涉及生产环境的代码                                       | \:white_check_mark\: | ✅     |
| chore    | 更改配置文件  | Changing configuration files    | 构建过程或辅助工具的变动，包配置文件，不涉及生产环境的代码 | \:wrench\:           | 🔧    |
| del      | 删除代码/文件 | Removing code or files          |                                                            | \:fire\:             | 🔥    |
| init     | 初始提交      | Initial commit                  |                                                            | \:tada\:             | 🎉    |
| add      | 添加依赖      | Adding a dependency             |                                                            | \:heavy_plus_sign\:  | ➕     |
| minus    | 删除依赖      | Removing a dependency           |                                                            | \:heavy_minus_sign\: | ➖     |
| docker   | 使用docker    | Work about Docker               |                                                            | \:whale\:            | 🐳    |

# commit.template
&emsp;&emsp;commit.template设置“新文件提交消息模板文件的路径名”。
```
git config --get commit.template
```
&emsp;&emsp;用来测试是否在项目中使用Git模板。如果没有返回值：
```
git config --local commit.template ./.gitmessage
```
* .gitmessage
```text
<type>(<scope>): <subject>

<body>

<footer>
```

# Commitizen自动生成commit message
&emsp;&emsp;借助 [commitizen/cz-cli](http://commitizen.github.io/cz-cli/) 提供的 git cz 命令替代 git commit 命令生成符合规范的 commit message。

&emsp;&emsp;为 commitizen 指定一个 Adapter（适配器），如 [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog) (一个符合 Angular团队规范的 preset),使得 commitizen 按照指定的规范帮助生成 commit message。

```bash
npm i -g commitizen
commitizen init cz-conventional-changelog --save-dev --save-exact --force
```
* package.json
```json
"scripts": {
  "commit": "git-cz",
  "commit:retry": "git-cz --retry",
  "commit:noverify": "git-cz --no-verify",
},
"config": {
  "commitizen": {
    "path": "./node_modules/cz-conventional-changelog"
  }
}
```

# 校验message
&emsp;&emsp;[commitlint](https://github.com/conventional-changelog/commitlint)可以lint commit messages，如果提交的不符合指定的规范，直接拒绝提交。可以配置校验配置[@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional)
```
npm i -D commitizen @commitlint/config-conventional @commitlint/cli
```
* commitlint.config.js
```js
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

# 结合Husky
&emsp;&emsp;结合git hook来检验commit message
```
npm i -D husky
```
* package.json
```
"husky": {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

# 自动生成 CHANGELOG
&emsp;&emsp;[standard-version](https://github.com/conventional-changelog/standard-version)可以自动生成CHANGELOG,甚至是 语义化的版本号(Semantic Version)
```
npm i -D conventional-changelog conventional-changelog-cli standard-version
```
* package.json
```
"scripts": {
  "release": "standard-version"
}
```

# 使用
```
git add --all

git cz

npm run release
```

# 使用emoji

### lint校验自定义Adapter
```
npm i -D commitlint-config-cz 
```
* commitlint.config.js
```
module.exports = {
  extends: ['@commitlint/config-conventional', 'cz']
};
```

### 自定义Adapter
```
npm i -D cz-customizable
```
* package.json
```
"config": {
  "commitizen": {
    "path": "./node_modules/cz-customizable"
  },
  "cz-customizable": {
    "config": "./.cz-config.js"
  }
}
```
* ./cz-config.js
```js
'use strict';

module.exports = {

  types: [
    {
      value: 'feat',
      name: '✨  feat:     A new feature'  // 新增功能
    },
    {
      value: 'fix',
      name: '🐞  fix:      A bug fix' // 修复bug
    },
    {
      value: 'docs',
      name: '📚  docs:     Documentation only changes'  // 文档变更
    },
    {
      value: 'style',
      name: '💅  style:    Code Style, Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)'  // 代码格式（空格、分号等格式修改）
    },
    {
      value: 'refactor',
      name: '🛠  refactor: A code change that neither fixes a bug nor adds a feature' // 代码重构
    },
    {
      value: 'test',
      name: '🏁  test:     Add missing tests or correcting existing tests'  // 测试
    },
    {
      value: 'chore',
      name: '🗯  chore:    Changes that don\'t modify src or test files. Such as updating build tasks, package manager' // 变更构建流程或辅助工具
    },
    {
      value: 'revert',
      name: '⏪  revert:   Revert to a commit' // 代码回滚
    }
  ],

  scopes: [],

  allowCustomScopes: true,
  allowBreakingChanges: ["feat", "fix"]
};
```

### 使用commitlint-config-gitmoji
```
npm i -D @commitlint/cli commitlint-config-gitmoji @commitlint/core
```
* .cz-config.js
```
module.exports = {
  rules: {
    'type-enum': [
      2,
      'always',
      [
        ':art:',
        ':newspaper:',
        ':pencil:',
        ':memo:',
        ':zap:',
        ':fire:',
        ':books:',
        ':bug:',
        ':ambulance:',
        ':penguin:',
        ':apple:',
        ':checkered_flag:',
        ':robot:',
        ':green_ale:',
        ':tractor:',
        ':recycle:',
        ':white_check_mark:',
        ':microscope:',
        ':green_heart:',
        ':lock:',
        ':arrow_up:',
        ':arrow_down:',
        ':fast_forward:',
        ':rewind:',
        ':rotating_light:',
        ':lipstick:',
        ':wheelchair:',
        ':globe_with_meridians:',
        ':construction:',
        ':gem:',
        ':bookmark:',
        ':tada:',
        ':loud_sound:',
        ':mute:',
        ':sparkles:',
        ':speech_balloon:',
        ':bulb:',
        ':construction_worker:',
        ':chart_with_upwards_trend:',
        ':ribbon:',
        ':rocket:',
        ':heavy_minus_sign:',
        ':heavy_plus_sign:',
        ':wrench:',
        ':hankey:',
        ':leaves:',
        ':bank:',
        ':whale:',
        ':twisted_rightwards_arrows:',
        ':pushpin:',
        ':busts_in_silhouette:',
        ':children_crossing:',
        ':building_construction:',
        ':iphone:',
        ':clown_face:',
        ':ok_hand:',
        ':boom:',
        ':bento:',
        ':pencil2:',
        ':package:',
        ':alien:',
        ':truck:',
        ':age_facing_up:',
        ':busts_in_silhouette:',
        ':card_file_box:'
      ]
    ],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    // 'subject-case': [2, 'always', ['sentence-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', ['.']],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never']
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w*:)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
      headerCorrespondence: ['type', 'scope', 'subject', 'ticket']
    }
  }
}
```
* 中文版：
```
module.exports = {
  // types,
  types: [
    {
      value: ':sparkles: feat',
      name: '✨ 增加新功能'
    },
    {
      value: ':bug: fix',
      name: '🐛 修复bug'
    },
    {
      value: ':pencil: docs',
      name: '📝 修改文档(仅文档更改)'
    },
    {
      value: ':lipstick: ui',
      name: '💄 更新UI(更新用户界面和样式文件 )'
    },
    {
      value: ':art: style',
      name: '🎨 改进代码的结构（空白、格式、缺少分号等）'
    },
    {
      value: ':recycle: refactor',
      name: '♻️  重构代码'
    },
    {
      value: ':bookmark: release',
      name: '🔖 发布版本'
    },
    {
      value: ':rocket: deploy',
      name: '🚀 部署'
    },
    {
      value: ':white_check_mark: test',
      name: '✅ 增删测试'
    },
    {
      value: ':wrench: chore',
      name: '🔧 更改配置(构建过程或辅助工具的变动，包配置文件)'
    },
    {
      value: ':tada: init',
      name: '🎉 初次提交'
    },
    {
      value: ':heavy_plus_sign: dep_add',
      name: '➕ 添加依赖'
    },
    {
      value: ':heavy_minus_sign: dep_rm',
      name: '➖ 删除依赖'
    },
    {
      value: ':whale: docker',
      name: '🐳 Docker'
    }
  ],

  scopes: [
    { name: 'common' },
    { name: 'build' },
    { name: 'core' },
    { name: 'upgrade' }
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
```

# 总结
```
git config --get commit.template
git config --local commit.templete ./.gitmessage
```
* .gitmessage
```
<type>(<scope>): <subject>

<body>

<footer>
```

### cz-conventional-changelog
```
npm i -g commitizen
npm i -D @commitlint/cli @commitlint/config-conventional husky standard-version
commitizen init cz-conventional-changelog --save --save-exact --force
```
* commitlint.config.js
```
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```
* package.json
```
{
  "scripts": {
    "commit": "git-cz",
    "commit:retry": "git-cz --retry",
    "commit:noverify": "git-cz --no-verify",
    "release": "standard-version"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

### commitlint-config-gitmoji
```
npm i -D @commitlint/cli cz-customizable commitlint-config-gitmoji @commitlint/core husky standard-version
```
* commitlint.config.js
```
module.exports = {
  rules: {
    'type-enum': [
      2,
      'always',
      [
        ':art:',
        ':newspaper:',
        ':pencil:',
        ':memo:',
        ':zap:',
        ':fire:',
        ':books:',
        ':bug:',
        ':ambulance:',
        ':penguin:',
        ':apple:',
        ':checkered_flag:',
        ':robot:',
        ':green_ale:',
        ':tractor:',
        ':recycle:',
        ':white_check_mark:',
        ':microscope:',
        ':green_heart:',
        ':lock:',
        ':arrow_up:',
        ':arrow_down:',
        ':fast_forward:',
        ':rewind:',
        ':rotating_light:',
        ':lipstick:',
        ':wheelchair:',
        ':globe_with_meridians:',
        ':construction:',
        ':gem:',
        ':bookmark:',
        ':tada:',
        ':loud_sound:',
        ':mute:',
        ':sparkles:',
        ':speech_balloon:',
        ':bulb:',
        ':construction_worker:',
        ':chart_with_upwards_trend:',
        ':ribbon:',
        ':rocket:',
        ':heavy_minus_sign:',
        ':heavy_plus_sign:',
        ':wrench:',
        ':hankey:',
        ':leaves:',
        ':bank:',
        ':whale:',
        ':twisted_rightwards_arrows:',
        ':pushpin:',
        ':busts_in_silhouette:',
        ':children_crossing:',
        ':building_construction:',
        ':iphone:',
        ':clown_face:',
        ':ok_hand:',
        ':boom:',
        ':bento:',
        ':pencil2:',
        ':package:',
        ':alien:',
        ':truck:',
        ':age_facing_up:',
        ':busts_in_silhouette:',
        ':card_file_box:'
      ]
    ],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'header-max-length': [2, 'always', 72],
    'scope-case': [2, 'always', 'lower-case'],
    // 'subject-case': [2, 'always', ['sentence-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', ['.']],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never']
  },
  parserPreset: {
    parserOpts: {
      headerPattern: /^(:\w*:)(?:\((.*?)\))?\s((?:.*(?=\())|.*)(?:\(#(\d*)\))?/,
      headerCorrespondence: ['type', 'scope', 'subject', 'ticket']
    }
  }
}
```
* .cz-config.js
```
module.exports = {
  // types,
  types: [
    {
      value: ':sparkles: feat',
      name: '✨ 增加新功能'
    },
    {
      value: ':bug: fix',
      name: '🐛 修复bug'
    },
    {
      value: ':pencil: docs',
      name: '📝 修改文档(仅文档更改)'
    },
    {
      value: ':lipstick: ui',
      name: '💄 更新UI(更新用户界面和样式文件 )'
    },
    {
      value: ':art: style',
      name: '🎨 改进代码的结构（空白、格式、缺少分号等）'
    },
    {
      value: ':recycle: refactor',
      name: '♻️  重构代码'
    },
    {
      value: ':bookmark: release',
      name: '🔖 发布版本'
    },
    {
      value: ':rocket: deploy',
      name: '🚀 部署'
    },
    {
      value: ':white_check_mark: test',
      name: '✅ 增删测试'
    },
    {
      value: ':wrench: chore',
      name: '🔧 更改配置(构建过程或辅助工具的变动，包配置文件)'
    },
    {
      value: ':tada: init',
      name: '🎉 初次提交'
    },
    {
      value: ':heavy_plus_sign: dep_add',
      name: '➕ 添加依赖'
    },
    {
      value: ':heavy_minus_sign: dep_rm',
      name: '➖ 删除依赖'
    },
    {
      value: ':whale: docker',
      name: '🐳 Docker'
    }
  ],

  scopes: [
    { name: 'common' },
    { name: 'build' },
    { name: 'core' },
    { name: 'upgrade' }
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
```

* package.json
```
{
  "scripts": {
    "commit:retry": "git-cz --retry",
    "commit:noverify": "git-cz --no-verify",
    "release": "standard-version"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    },
    "cz-customizable": {
      "config": ".cz-config.js"
    }
  },
  "husky": {
    "hooks": {
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  }
}
```

# 扩展
* [cz-cli](https://github.com/commitizen/cz-cli)
* [gitmoji](https://gitmoji.carloscuesta.me/)
* [conventional-changelog-emoji](https://github.com/nielsgl/conventional-changelog-emoji)
* [commitlint-config-gitmoji](https://github.com/arvinxx/commitlint-config-gitmoji)
* [commitlint](https://commitlint.js.org)
* [Conventional Commits specification](https://www.conventionalcommits.org/zh/)
