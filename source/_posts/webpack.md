---
title: webpack学习笔记（官网指南，持续更新）
date: 2017-10-15 19:38:15
tags:
- webpack
---
啰嗦一句，心情略微复杂，六月中旬的时候跳槽了，从重庆到了杭州，也算是一个全新的开始。

早在之前公司做项目的时候就打算沉下心来好好看看webpack，虽然项目中一直在用，但是都是一知半解，对于很多配置和参数都说模棱两可，然后在新公司过后，项目的量和时间相对没有那么紧，所以也有更多的个人时间，所以打算好好从官网的指南开始，过一遍webpack，这里算是笔记总结。首先所有的代码都在github上，[点击查看](https://github.com/Neras/webpack-in);

#### 开发
这里指的是构建开发环境，其他的都不用多说，根据[官网的文档](https://doc.webpack-china.org/guides/development/#-webpack-dev-server)，就能理解了。这里最开始强调了`source map`，用来更容易的追踪错误和警告，这个功能，将编译过后的代码映射回原始源代码，当然他也有很多[配置选项](https://doc.webpack-china.org/configuration/devtool);
这里还有一个个人觉得值得关注的点，那就是`webpack-dev-server`和`webpab-dev-middleware`，再项目中我们几乎（至少在我做的项目中）都是使用`webpack-dev-server`，在官网的中文文档里，`webpack-in-middleware`也是没有翻译（或许是简单易懂），个人理解，`webpack-in-middleware`提供个了更好的扩展性，原文中也有说到
> This is used in `webpack-dev-server` internally, however it's available as a separate package to allow more custom setups if desired.

#### 模块热替换(HMR , Hot Module Replacement)
模块热替换的特性就不再赘述，代码在[这里](https://github.com/Neras/webpack-in/tree/HMR)。启用HMR（Hot Module Replacement, 模块热替换）
1. HMR不使用生产环境，只能在开发环境中使用
2. **热替换模式中事件的重新绑定**
3. 热替换模式中 修改样式表

```javascript
import _ from 'lodash';
import './style.css';

function component(){
    var element = document.createElement('div');
    var btn = document.createElement('button');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check console';
    btn.onclick = printMe;

    element.appendChild(btn);
    return element;
}

let element = component();//当print.js改变导致页面重新渲染时，重新获取渲染的元素
document.body.appendChild(component());

if(module.hot){
    module.hot.accept('./print.js', function(){
        console.log('Accepting the updated printMe module!');
        document.body.removeChild(element);
        element = component();//重新渲染页面后，component更新click时间处理
        document.body.appendChild(element);
    })
}
```

#### 生产环境构建(build-production)
1. 在开发环境中，我们需要强大的、具有实时重新加载或者热模块替换能力的`source map`和`localhost server`
2. 在生产环境中，我们的目标转向于关注更小的bundle，更轻量的`source map`，以及更优化的资源，以及改善加载时间
3. 犹豫要遵循逻辑分离，建议为每个环境比那些彼此独立的webpack配置
4. 需要有一个通用配置，实用webpack-merge工具
5. 许多library将通过与`process.env.NODE_ENV`环境变量关联，以决定library中应该引用哪些内容。使用内置DefinePlugin为所有依赖定义这个变量
6. 任何位于`/src`的本地代码都可以关联到`process.env.NODE_ENV`环境变量。

#### 代码分离(code-split)
- 此特性能够把代码分离到不同的bundle中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的bundle，以及控制资源加载优先级，涉及到性能优化

- 常用的三种方法
 1. 入口起点：使用`entry`配置手动地分离代码
 2. 防止重复：使用`CommonChunkPlugin`去重和分离chunk
 3. 动态导入：通过模块的内联函数调用来分离代码


- 入口起点：如果入口chunks之间包含重复的模块，那些重复模块都会被引入到各个bundle中；这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码（重复引用问题，违背DRY原则）

- `CommonChunkPlugin`将公共的代码分离到单独的chunk，并从main bundle中移除，社区提供的很有帮助的插件和loaders:`ExtractTextPlugin`用于将css从主应用程序中分离；`bundle-loader`;`promise-loader`;

- 动态导入：(个人理解为这里就是以前经常听说的按需加载了)动态拆分代码时，webpack提供了两个技术。第一种，也是优先选择的方式，使用符合**[ECMAScript提案](https://github.com/tc39/proposal-dynamic-import)**的**`import()`语法**；第二种，则是使用webpack特定的`require.ensure`

- `import()`调用使用会在内部用到`pormises`，[import()文档](https://doc.webpack-china.org/api/module-methods#import-)

#### 懒加载(lazy-laod)
懒加载或者按需加载这种方法实际上是先把代码在一些逻辑断点处分离开，然后在一些代码中完成某些操作后，立即引用或即将引用另外一些新的代码块。
在代码分离的基础上。在脚本运行的时候产生一个分离的代码块`lodash.bundle.js`，在技术概念上“懒加载”它。问题是加载这个包并不需要用户的交互--意思是每次加载页面的时候都会请求它。这样并没有用。

用另一种方法：增加一个交互，当用户点击按钮的时候用console打印一些文字。但是会等到第一次交互的时候再加载那个代码块`print.js`。

```javascript
import _ from 'lodash';

function component(){
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');

    button.innerHTML = 'click me and look at the console';
    element.innerHTML = _.join(['hello','webpack'], ' ');
    element.appendChild(br);
    element.appendChild(button);

    //note that because a network request is invoked, some indication
    // of loading would need to be shown in a production-level site/app.
    button.onclick = e => import(/*webpackChunkName:"print"*/'./print').then(module => {
        var print = module.default;
        print();
    });
    return element;
}

document.body.appendChild(component());
```
