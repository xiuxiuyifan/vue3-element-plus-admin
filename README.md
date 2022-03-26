## 初始化项目

```bash
git clone https://github.com/xiuxiuyifan/vue3-element-plus-admin.git

yarn install
yarn start
```



## 文件目录
```
├── babel.config.js   // babel 配置文件
├── commitlint.config.js  // git commit 规范配置文件，自动生成的
├── package-lock.json
├── package.json
├── prettierignore       // prettier 忽略文件
├── public               // 静态文件
│   ├── api              // 模拟api
│   │   ├── login.json
│   │   ├── menu.json
│   │   └── userInfo.json
│   ├── favicon.ico
│   ├── img
│   │   └── bg-left.png
│   └── index.html
├── README.md
├── src
│   ├── App.vue
│   ├── assets    
│   │   ├── img   // 需要压缩的图片
│   │   │   ├── avatar.png
│   │   │   ├── bg.png
│   │   │   └── logo.png
│   │   └── less
│   │       ├── base.less
│   │       ├── element-plus-#0054FE
│   │       ├── index.less
│   │       └── theme.less
│   ├── base-ui     // 基础的 ui组件
│   │   ├── base-table-search
│   │   │   ├── form-item.vue
│   │   │   ├── index.vue
│   │   │   └── types.ts
│   │   └── breadcrumb
│   │       ├── index.ts
│   │       ├── src
│   │       └── types
│   ├── components   // 业务公用的组件
│   │   └── Layout
│   │       ├── hooks
│   │       ├── index.ts
│   │       ├── Layout.vue
│   │       └── Menu
│   ├── config   //  最开始的配置，后面用cli 自带的.env 文件替换了
│   │   └── index.ts
│   ├── global   // 全局的一些配置，入口，
│   │   ├── index.ts
│   │   └── register-element.ts
│   ├── main.ts
│   ├── mock
│   │   └── index.ts
│   ├── router   // 公共的路由
│   │   └── index.ts
│   ├── service   // api 接口
│   │   ├── index.ts
│   │   ├── login
│   │   │   ├── login.ts
│   │   │   └── types.ts
│   │   ├── request
│   │   │   ├── index.ts
│   │   │   └── types.ts
│   │   └── types.ts
│   ├── shims-vue.d.ts
│   ├── store
│   │   ├── index.ts
│   │   ├── login
│   │   │   ├── login.ts
│   │   │   └── types.ts
│   │   └── types.ts
│   ├── utils   // 辅助函数
│   │   ├── local-catch.ts
│   │   ├── mapping-menu.ts
│   │   └── types.ts
│   └── views   // 页面
│       ├── back-end
│       ├── business-component
│       │   └── search-table
│       ├── data-structure
│       ├── database
│       ├── front-end
│       │   ├── base-language
│       │   └── framework-study
│       ├── home
│       │   └── index.vue
│       └── login
│           ├── cpns
│           ├── hooks
│           ├── index.vue
│           └── types.ts
├── tsconfig.json
├── vue.config.js
└── yarn.lock
```
## 初步展示

![image-20220326215853491](https://s2.loli.net/2022/03/26/FwqfTGj2ukHQm3i.png)

![image-20220326215919025](https://s2.loli.net/2022/03/26/87OFVadButXSKU6.png)


## [源码地址](https://github.com/xiuxiuyifan/vue3-element-plus-admin)
## editorconfig规范
```
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行首的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false

```
## prettier 规范

```shell
yarn add prettier -D
```
+.prettierrc

```
{
  "useTabs": false,
  "tabWidth": 2,    
  "printWidth": 100,   // 100个字符换行
  "singleQuote": true,   // 单引号
  "trailingComma": "none",  //在对象或数组最后一个元素后面是否加逗号
  "bracketSpacing": true,  // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  "semi": false     // 句尾添加分号
}
```

+prettierignore
```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```
添加脚本进行格式化修复
```
"prettier": "prettier --write ."
```
让eslint 和prettier结合起来两个插件
```
yarn add eslint-config-prettier eslint-plugin-prettier -D
```
eslintrc.js
```javascript
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
    'plugin:prettier/recommended'  // 新增
  ],
```

## git 和eslint

```
npx husky-init && yarn instal
```

.husky/pre-commit
```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

yarn lint
```
## git commit 规范

```
yarn add commitizen -D
npx commitizen init cz-conventional-changelog --save-dev --save-exact
```
在package.json里面可以看见
```
"config": {
"commitizen": {
  "path": "./node_modules/cz-conventional-changelog"
  }
}
```

然后再使用进行提交代码
```
git add.
npx cz
```

## 代码提交限制
```
yarn add @commitlint/config-conventional @commitlint/cli -D
```
+commitlint.config.js
```
module.exports = {
  extends: ['@commitlint/config-conventional']
}
```

添加 message hook拦截 执行以下命令

```
npx husky add .husky/commit-msg "npx --no-install commitlint --edit $1"
```
## element-plus引入

按需引入
```
yarn add babel-plugin-import -D
```
## 环境区分



## 引入axios

```
yarn add axios
```

## mock 数据

```
yarn add @types/mockjs mockjs -D
```

## css 初始化
```
yarn add normalize.css
```

+ `view` 下面的文件命名 采用中划线
+ 页面子组件放在 `cpns` 下面


## 用到的ts 知识点

```
ts 获取组件实例的类型
const instance = ref<InstanceType<typeof ElForm>>()
```

## 用户登录

```
处理用户的token过期，一般是放在后台来控制，然后前端在拦截器里面做处理。

前端也可以在写localstorage里面，同时写入过期时间，但是不推荐。
```

## ts 使用问题


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/91095fee490548658d5a2ddb360fbd97~tplv-k3u1fbpfcp-watermark.image?)

## 小结。

代码还在优化中， 支不支持移动端是一个纠结的问题，个人倾向于不支持移动端，还有的就都在代码里面了，具体大家可以在代码仓库查看或者留言，有更好的建议可以一起分享。
