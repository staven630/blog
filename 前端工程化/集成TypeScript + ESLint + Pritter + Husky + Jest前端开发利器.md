# 初始化
```
mkdir demo
cd demo

npm init -y
npm i -D typescript @types/node

npx tsc --init --rootDir src --outDir lib --esModuleInterop --resolveJsonModule --lib es6,dom --module commonjs --declaration true --strictNullChecks true
```

# tsconfig.json
tsconfig.json新增
```json
{
  "compilerOptions": {
    "target": "es5",
    "module": "commonjs",
    "lib": [
      "es6",
      "dom"
    ],
    "declaration": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": [
    "./src/**/*",
    "./src/*"
  ]
}
```
package.json新增
```json
{
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsc",
    "watch": "tsc -w"
  }
}
```

# eslint
```bash
npm i -D eslint @typescript-eslint/parser @typescript-eslint/typescript-estree @typescript-eslint/eslint-plugin

npm i -D prettier eslint-config-prettier eslint-plugin-prettier
```

* .prettierrc.js
```js
module.exports = {
  "printWidth": 120,
  "tabWidth": 2,
  "semi": false,
  "useTabs": false,
  "singleQuote": true,
  "trailingComma": "none",
  "bracketSpacing": false,
  "jsxBracketSameLine": false,
  "proseWrap": "always"
}
```

* .eslintrc.js
```js
module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json",
    // "tsconfigRootDir": ".",
    "ecmaFeatures": {
      "jsx": true, // Allows for the parsing of JSX
    },
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
  },
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  "rules": {
    /**
     * @description rules of eslint official
     */
    "no-unused-vars": [
      "error",
      {
        "vars": "local",
        "args": "none"
      }
    ],
    /**
     * @bug https://github.com/benmosher/eslint-plugin-import/issues/1282
     * "import/named" temporary disable.
     */
    "import/named": "off",
    /**
     * @bug?
     * "import/export" temporary disable.
     */
    "import/export": "off",
    "import/prefer-default-export": "off", // Allow single Named-export
    "no-unused-expressions": [
      "warn",
      {
        "allowShortCircuit": true,
        "allowTernary": true
      }
    ], // https://eslint.org/docs/rules/no-unused-expressions
    /**
     * @description rules of @typescript-eslint
     */
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/prefer-interface": "off", // also want to use "type"
    "@typescript-eslint/explicit-function-return-type": "off", // annoying to force return type
    /**
     * @description rules of eslint-plugin-react
     */
    // "react/jsx-filename-extension": ["warn", {
    //   "extensions": [".jsx", ".tsx"]
    // }], // also want to use with ".tsx"
    // "react/prop-types": "off", // Is this incompatible with TS props type?
    /**
     * @description rules of eslint-plugin-react-hooks
     */
    // "react-hooks/rules-of-hooks": "error",
    /**
     * @description rules of eslint-plugin-prettier
     */
    "prettier/prettier": [
      "error",
      {
        "printWidth": 120,
        "tabWidth": 2,
        "semi": false,
        "useTabs": false,
        "singleQuote": true,
        "trailingComma": "none",
        "bracketSpacing": false,
        "jsxBracketSameLine": false,
        "proseWrap": "always"
      }
    ]
  }
}
```

* package.json
```json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src/**"
  }
}
```

# Jest
```bash
npm i -D jest ts-jest @types/jest
```

* .eslintrc.js
```js
module.exports = {
  "env": {
    "jest": true
  }
}
```
* package.json
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "jest": {
    "verbose": true,
    "collectCoverageFrom": [
      "*.js",
      "*.ts"
    ],
    "coveragePathIgnorePatterns": [
      "/node_modules/"
    ],
    "coverageThreshold": {
      "global": {
        "statements": 100,
        "branches": 100,
        "functions": 100,
        "lines": 100
      }
    },
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    }
  }
}
```

# husky + lint-staged
```bash
npm i -D lint-staged husky
```
* package.json
```json
{
  "scripts": {
    "precommit": "npm run build && lint-staged",
    "push": "git push --follow-tags origin master",
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run precommit",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-push": "npm run test"
    }
  },
  "lint-staged": {
    "src/**/*.+(js|ts|tsx|md|css|sass|less|graphql|yml|yaml|scss|json|vue)": [
      "prettier --write",
      "eslint --fix",
      "eslint",
      "git add"
    ]
  }
}
```

# 总结
```bash
npm i -D typescript @types/node eslint @typescript-eslint/parser @typescript-eslint/typescript-estree @typescript-eslint/eslint-plugin prettier eslint-config-prettier eslint-plugin-prettier jest ts-jest @types/jest lint-staged husky
```

* package.json
```json
{
  "name": "pritter-eslint-ts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "commit:retry": "git-cz --retry",
    "commit:noverify": "git-cz --no-verify",
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write src/**",
    "release": "standard-version",
    "test": "jest",
    "test:watch": "jest --watch",
    "precommit": "npm run build && lint-staged",
    "push": "git push --follow-tags origin master",
    "build": "tsc",
    "watch": "tsc -w"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@commitlint/cli": "^8.1.0",
    "@commitlint/config-conventional": "^8.1.0",
    "@types/jest": "^24.0.15",
    "@types/node": "^12.6.8",
    "@typescript-eslint/eslint-plugin": "^1.12.0",
    "@typescript-eslint/parser": "^1.12.0",
    "@typescript-eslint/typescript-estree": "^1.12.0",
    "commitizen": "^4.0.3",
    "commitlint-config-cz": "^0.12.0",
    "conventional-changelog": "^3.1.8",
    "conventional-changelog-cli": "^2.0.21",
    "cz-customizable": "^6.2.0",
    "eslint": "^6.1.0",
    "eslint-config-prettier": "^6.0.0",
    "eslint-plugin-prettier": "^3.1.0",
    "husky": "^3.0.1",
    "jest": "^24.8.0",
    "lint-staged": "^9.2.0",
    "prettier": "^1.18.2",
    "standard-version": "^6.0.1",
    "ts-jest": "^24.0.2",
    "typescript": "^3.5.3"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run precommit",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-push": "npm run test"
    }
  },
  "lint-staged": {
    "src/**/*.+(js|ts|tsx|md|css|sass|less|graphql|yml|yaml|scss|json|vue)": [
      "prettier --write",
      "eslint --fix",
      "eslint",
      "git add"
    ]
  },
  "jest": {
    "verbose": true,
    "transform": {
      "^.+\\.tsx?$": "ts-jest"
    }
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-customizable"
    },
    "cz-customizable": {
      "config": "./.cz-config.js"
    }
  }
}
```
* .eslintrc.js
```js
module.exports = {
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "project": "./tsconfig.json",
    // "tsconfigRootDir": ".",
    "ecmaFeatures": {
      "jsx": true, // Allows for the parsing of JSX
    },
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "jest": true
  },
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  "rules": {
    /**
     * @description rules of eslint official
     */
    "no-unused-vars": [
      "error",
      {
        "vars": "local",
        "args": "none"
      }
    ],
    /**
     * @bug https://github.com/benmosher/eslint-plugin-import/issues/1282
     * "import/named" temporary disable.
     */
    "import/named": "off",
    /**
     * @bug?
     * "import/export" temporary disable.
     */
    "import/export": "off",
    "import/prefer-default-export": "off", // Allow single Named-export
    "no-unused-expressions": [
      "warn",
      {
        "allowShortCircuit": true,
        "allowTernary": true
      }
    ], // https://eslint.org/docs/rules/no-unused-expressions
    /**
     * @description rules of @typescript-eslint
     */
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/prefer-interface": "off", // also want to use "type"
    "@typescript-eslint/explicit-function-return-type": "off", // annoying to force return type
    /**
     * @description rules of eslint-plugin-react
     */
    // "react/jsx-filename-extension": ["warn", {
    //   "extensions": [".jsx", ".tsx"]
    // }], // also want to use with ".tsx"
    // "react/prop-types": "off", // Is this incompatible with TS props type?
    /**
     * @description rules of eslint-plugin-react-hooks
     */
    // "react-hooks/rules-of-hooks": "error",
    /**
     * @description rules of eslint-plugin-prettier
     */
    "prettier/prettier": [
      "error",
      {
        "printWidth": 120,
        "tabWidth": 2,
        "semi": false,
        "useTabs": false,
        "singleQuote": true,
        "trailingComma": "none",
        "bracketSpacing": false,
        "jsxBracketSameLine": false,
        "proseWrap": "always"
      }
    ]
  }
}
```
* .gitignore
```text
node_modules
coverage
```
* .prettierrc
```json
{
  "printWidth": 120,  // 设置单行字符数
  "tabWidth": 2,   // 缩进空格数
  "semi": true, // 代码行后面需不需要生成分号
  "useTabs": false,
  "singleQuote": true,  // 使用单引号
  "trailingComma": "none",  // 数组后面最后一个索引要不要添加逗号
  "bracketSpacing": false,  // 在对象字面量声明所使用的的花括号后（{）和前（}）输出空格
  "jsxBracketSameLine": false,  // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）
  "proseWrap": "always"
}
```
* .prettierignore
```text
dist
node_modules
coverage
build
```
* tsconfig.json
```json
{
  "compilerOptions": {
    "target": "es5", 
    "module": "commonjs", 
    "lib": [
      "es6",
      "dom"
    ], 
    "declaration": true, 
    "outDir": "dist", 
    "rootDir": "src", 
    "strict": true,
    "strictNullChecks": true, 
    "esModuleInterop": true, 
    "resolveJsonModule": true 
  },
  "include": [
    "./src/**/*",
    "./src/*"
  ]
}
```