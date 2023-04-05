---
title: "Monorepo项目搭建"
--- 

# [从0搭建Vue3组件库(二):Monorepo项目搭建 - 掘金](https://juejin.cn/post/7200297595474001981)

## 什么是 Monorepo

其实很简单,就是一个代码库里包含很多的项目,而这些项目虽然是相关联的,但是在逻辑上是独立的,可以由不同人或者团队来维护

## 为什么要用 pnpm

pnpm 对于包的管理是很方便的,尤其是对于一个 Monorepo 的项目。因为对于我们即将开发的组件库来说可能会存在多个 package(包),而这些包在我们本地是需要相互关联测试的,刚好 pnpm 就对其天然的支持。其实像其它包管理工具,比如 yarn、lerna 等也能做到,但是相对来说比较繁琐。而 pnpm 现在已经很成熟了,像 Vant，ElementUI 这些明星组件库都在使用 pnpm,因此本项目也采用 pnpm 作为包管理工具。

## 初始化项目

在项目根目录执行 `pnpm init`,会自动生成`package.json`文件

```json
{
  "name": "easyest",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

## 包管理

我们新建一个 packages 文件夹用于后续来存放我们的各种包。假如我们有了 a 包和 b 包,在 packages 下新建 a 和 b(这里用于测试 pnpm 的本地引用),然后分别在 a 和 b 目录下执行`pnpm init`初始化

这里需要改一下包名，我这里将 name 改成 @easyest/a 表示这个 a 包是属于 easyest 这个组织下的。所以记住发布之前要登录 npm 新建一个组织；例如 easyest。比如此时 a 的 package.json

```js
{
  "name": "@easyest/a",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

这里我们的 a 包代表工具包,而 package.json 的 main 属性就是包的入口即 index.js。

所以在 a 目录下新建 index.js

```js
export default () => {
  console.log("我是@easyest/a包");
};
```

然后在 b 包下新建 index.js 进行引用

```js
import sayHello from "@easyest/a";
sayHello();
```

![image.png](http://cdn.chen-zeqi.cn/53801d2fdd714575aeca8210f9e5f99a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

我们用到了 a 包,所以需要先安装 a,在 B 目录下执行`pnpm add @easyest/a`,显然这样会报错的,因为我们还没有将两个包进行关联,那么如何进行关联呢,其实很简单

在根目录新建 pnpm 的工作区文件 pnpm-workspace.yaml 就可以将包进行关联

```vbnet
packages:
    - 'packages/**'
```

这样就表示 packages 目录下的所有包都被关联了,然后再执行`pnpm add @easyest/a`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1275901491e4932b79c207db5f12bb3~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

注意这里我们使用了 import es6 语法,所以我们要在 A 和 B 的`package.json`中新增字段`"type": "module"`

我们会发现直接在 b 目录的 node_modules 出现了 a 的软链接。同时,b的package.json的依赖字段多了`"@easyest/a": "workspace:^1.0.0"`,这就表示已经关联到本地的`@easyest/a`包了

![image.png](http://cdn.chen-zeqi.cn/8d74ed1dee00418c800bdd74af172450~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

这时候我们在 b 目录下执行

```js
node index.js
```

![image.png](http://cdn.chen-zeqi.cn/a9d8171bdfd744ceb24725f291fb82d8~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)