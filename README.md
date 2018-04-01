# Source Debug Plugin


```
npm i --save-dev source-debug-plugin
```


### 背景
当过去安装的依赖更新了，但在重新install前你想先进行调试，等调试成功后再install到依赖集，防止更新后依赖的一些新特性影响了现在的代码，这个插件就是为了解决以下问题

- 调试更新后依赖的源码
- 调试在依赖更新环境下的业务代码

### 用法

```
var SourceDebugPlugin = require('source-debug-plugin')
...
...


plugins: [
    new SourceDebugPlugin(
        // 指定根目录下文件夹名称，clone的依赖将会放在此文件夹中
        'sourcetest',
        //以对象数组的形式存放要调试的依赖配置
        [
            {
                // 第一个属性，输入要替换的包名及git路径（包名：git地址）
                packageName: 'gitUrl',
                // 第二个属性，对clone后的依赖进行文件夹或文件名替换
                transform: [
                    {
                        // 将该依赖下的src文件夹改名为lib
                        from: 'src',
                        to: 'lib'
                    },
                    {
                        // 将lib文件夹下的index.jsx文件改为index.js
                        from: 'lib/index.jsx',
                        to: 'lib/index.js'
                    }
                ]
            }
        ]
    )
]
```

它会在根目录下创建可指定名称的文件夹，将更新的依赖通过**git clone**的方法放到该文件夹下，并动态修改config中的**alias**来实现源码调试

## 版本

### @1.0.0
最初版本，对于一些上传至**git**库和**npm**库不同的依赖（如lodash，jquery这种作为依赖需要确定的入口，但在git库中却没有）不能通过此插件进行调试

### @1.0.1
可适配webpack4

### @1.0.2
为解决最初版本的问题，添加了用户可配置**git clone**后依赖文件结构功能，可通过修改文件夹及文件名称使依赖可用
