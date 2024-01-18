# `gtfy_Package`

## node 版本

需要 16.14.0
建议下载一个 nvm 进行切换 node 版本.

## 可视化界面

<http://verdaccio.请换成你的地址.com.cn/>

## npm 添加私服用户

```
npm adduser --registry http://verdaccio.请换成你的地址.com.cn/
```

## npm 添加登录

```
npm login  --registry http://verdaccio.请换成你的地址.com.cn/
```

## npm 发包

lerna publish

## 新建包注意

1. pack.json 需要添加如下

```javascript
 "publishConfig": {
    "registry": "http://verdaccio.请换成你的地址.com.cn/"
  },
```

## 引用包需要添加文件`.npmrc`

```
registry=http://verdaccio.请换成你的地址.com.cn/

```

如果不加则会发布到 npm 官方镜像中.

## 生成文档

```
yarn doc
```

## api 文档

[访问我的文档](https://请换成你的地址.github.io//)
