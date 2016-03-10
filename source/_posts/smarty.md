---
title: smarty
date: 2016-03-10 22:18:48
tags:
- smarty
categories:
- smarty
---

#### smarty的进阶之路（持续更新(●˘◡˘●)）

- smarty中的定界符恰好也是{}，在JavaScript中也是，所以在smarty中{}两边是空格的时候，将会被自动忽略解析，这种特性可以通过设置smarty的$auto_literal为false来关闭
- {literal}…{/literal}可以让中间的内容忽略smarty的解析
- 必须使用双引号才能正常使用变量，单引号是不行的，如果在变量中存在 .则必须将该变量在双引号中庸单引号括起来
- 页面的请求变量，例如$_GET,$POST,$_COOKIE,$_SERVER,$_ENV,$_SESSION等可以通过
比如通过get方法请求地址为`http://www.examole.com/index/?page=1`,$smarty.get.page其他同理:
>$smarty.post.page,
$smarty.cookies.username
$smarty.server.SERVER_NAME
$smarty.env.PATH
$smarty.session.id
$smarty.request.username
- $smarty.now 当前的时间戳，从1970年1月1日计算到当前的秒数可以使用$smarty.now|date_format'%Y-%m-%d %H:%M:%S'来格式化显示
> $smarty.template返回当前的模板名称（不带目录名）;
> $smarty.block.child 返回子模版提供的区块代码;
> $smarty.block.parent 返回父模板提供的区块代码;

- 变量修饰符
> 用于变量，自定义函数或者字符串，使用的时候需要在变量后面加上|(竖线)并跟着修饰符名称
Smarty3存在的默认行为，在smarty2.X的版本中，需要在数组后加上@标识符来使用修饰器，例如{$articleTitle|@count}，smarty3则不再需要使用@，它会被忽略

- 学习到一个新的姿势啊，关于github，一个远程仓库上，如果直接clone，会拉去所有的commit，但是有可能我们并不需要，所以在拉取的时候可以添加 `--depth=1`，其中1表示最近一次的提交，即拉取最近的一次即可~

