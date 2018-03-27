# Source Debug Plugin


```
npm i --save-dev source-debug-plugin
```


### 背景
当过去安装的依赖更新了，但在重新install前你想先进行调试，等调试成功后再install到依赖集，防止更新后依赖的一些新特性影响了现在的代码，这个插件就是为了解决这个问题

### 用法

```
var SourceDebugPlugin = require('source-debug-plugin')
...
...


plugins: [
        new SourceDebugPlugin([
            'sourcetest',
            //此处为指定文件夹名称
            {
                lodash: 'https://github.com/garinghu/lodash.git'
                //以键值对的形式加载依赖（包名：git地址）
            }
        ]),    
    ]
```

它会在根目录下创建可指定名称的文件夹，将更新的依赖通过**git clone**的方法放到该文件夹下，并动态修改config中的**alias**来实现源码调试

## 版本

### @1.0.0
最初版本，对于一些通过**git clone**和**npm install**两种方式获取的代码不一致的依赖（如lodash，jquery）不能通过此插件进行调试
