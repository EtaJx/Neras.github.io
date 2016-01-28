---
title: 使用hexo与GitHub Pages搭建自己的博客
date: 2016-01-27 21:55:37
tags: 
- hexo
- duoshuo
- 搭建自己的博客
- GitHub Pages
categories:
- hexo
---
本文是我如何使用hexo与github pages搭建个人博客的过程，虽然网上教程已经很多了。那这就姑且算作回顾一下吧。

#### 使用的版本
 - node 4.2.2
 - hexo 3.1.1
 - Git 2.6.1


{% blockquote GitHub Pages http://pages.github.com pages.github.com%}
Git、Node的使用在这里就不赘述了。如何使用GitHub Pages，可以参考官方网站，仔细阅读，已经写得很详细了，特别是在新建仓库的时候，username.github.io中的username一定要和自己的username相同，区分大小写，不要问我为什么知道的。
{% endblockquote %}


#### Hexo的使用
{% blockquote HEXO http://hexo.io/zh-cn/docs hexo %}
关于hexo，一开始接触的时候会觉得茫然一片，不知道干啥，网上也有教程，但是搜到大部分教程已经过时，在package.json里面已经写好了依赖包，npm install的时候会安装好所需要的包，不用再单独去安装一次hexo server了，具体可以参考官方网站，文档已经写得很清楚了。
{% endblockquote %}



#### 评论插件
hexo自带的是Disqus，但是这个需要使用facebook，twitter，google+等登录，如果你没有，或者没有走到墙外面，你还可选择国内的 多说 ，我就是使用的这个，具体效果看文章最后的评论区域就知道。如何在博客中使用，这里可能有一点差异，有些主题可能已经集成了duoshuo，只需要在配置文件中开启即可，比如使用的 hexo-theme-next :https://github.com/iissnan/hexo-theme-next 有些主题没有集成，则需要去duoshuo的官网生成一段通用代码，复制到你的评论模板里面，覆盖原来的Disqus评论代码。


#### 使用主题
在使用hexo初始化一个博客之后，会有一个自带的默认主题landscape，当然，我们都是追求个性的人不是吗？虽然可以随便改这个默认主题的模板样式，但是我们需要追求更加高Big的。我使用的是比较收欢迎的next主题，上面已经给出了地址。你只需要通过git将它clone到你博客目录下的themes文件夹里面，然后在站点的配置文件里面将使用的名字改为你clone下来的next主题文件夹名字就可以了。


最后我捣鼓了大半天，最后总结到一个非常重要的知识点，学习一个新的东西，官方的文档真的真的真的（重要的事情说三遍）很重要。网上博客写出来的东西，有可能只是当时博主遇到的问题，也有可能当时博主搭建博客使用的东西版本与你目前使用的版本是有差距。所以官方文档才是最正宗的。
