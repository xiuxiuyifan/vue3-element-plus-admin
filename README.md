# vue3-element-plus-admin
## 项目截图

### 登录

![1611591445252](C:\Users\code\vue\vue3-element-plus-admin\image\1611591445252.png)

## 安装依赖
```
yarn install
```

## 编译&启动
```
yarn serve
```

## 编译&打包
```
yarn build
```

## Lints and fixes files
```
yarn lint
```

## 参考文档
See [Configuration Reference](https://cli.vuejs.org/config/).

## 项目说明

本项目采用Vue3 + TypeScript + Vue-router4 +Vuex4 为核心，借助开源UI框架element plus的风格搭建的一个后台管理平台，有一下几个特点。

1. 动态路由（只需要和后台约定json就可以实现菜单权限控制）
2. 可定制型强（没有引入一些偏业务性的代码）
3. 只兼容PC端页面（少了一些冗余的代码）
4. 没有单元测试、没有Mock

### 约定

| 说明                    | 举例     |
| ----------------------- | -------- |
| 项目公共组件命名z为前缀 | z-icon   |
| 页面下的子组件以v为前缀 | v-header |
| 组件命名开头必须大写    | VHeader  |
| 文件夹用下划线命名      | side-bar |

## 实现思路还原

### 鉴权

### 渲染菜单

### 动态添加路由

