---
title: 面试题总结
tags:
 - 面试题
time: 2023/4/2
---

## 清除浮动有哪些方法？为什么要清除浮动？

### 什么是清除浮动？

**清除浮动是指清除由于子元素浮动带来父元素高度塌陷的影响。**

### 为什么要清除浮动？

1. **导致背景不能正常显示**，如果对父级设置了背景属性，导致父级不能撑开，会影响到背景图片不能正常打开。
2. **边框不能撑开**，由于子级使用了浮动效果，并且已经产生了浮动，父级不能撑开，所以影响边框不会随着内容的变化而变化。

### 清除浮动有哪些方法？

**1.额外标签法**（在最后一个浮动标签后，新加一个标签，给其设置clear：both；）**（不推荐）**

优点：通俗易懂，方便

缺点：添加无意义标签，语义化差

**2.父级添加overflow属性（父元素添加overflow:hidden）**（不推荐）

优点：代码简洁

缺点：内容增多的时候容易造成不会自动换行导致内容被隐藏掉，无法显示要溢出的元素

**3.使用after伪元素清除浮动**（推荐使用）

```vue
<style>
	.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
    .clearfix{
        *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
    }
</style>

 
<template>
    <div class="father clearfix">
        <div class="big">big</div>
        <div class="small">small</div>
        <!--<div class="clear">额外标签法</div>-->
    </div>
    <div class="footer"></div>
</template>
```

优点：符合闭合浮动思想，结构语义化正确

缺点：ie6-7不支持伪元素：after，使用zoom:1 触发 hasLayout.

**4.使用before和after双伪元素清除浮动**

```vue
<style>
	.clearfix:after,.clearfix:before{
        content: "";
        display: table;
    }
    .clearfix:after{
        clear: both;
    }
    .clearfix{
        *zoom: 1;
    }
</style>

 
<template>
     <div class="father clearfix">
        <div class="big">big</div>
        <div class="small">small</div>
 	</div>
 	<div class="footer"></div>
</template>
```

优点：代码更简洁

缺点：用zoom:1触发hasLayout.

## 闭包

### 什么是闭包

> 在 JS 忍者秘籍(P90)中对闭包的定义：闭包允许函数访问并操作函数外部的变量。红宝书上对于闭包的定义：闭包是指有权访问另外一个函数作用域中的变量的函数。
>
> MDN 对闭包的定义为：闭包是指那些能够访问自由变量的函数。这里的自由变量是外部函数作用域中的变量。

概述上面的话，闭包是指有权访问另一个函数作用域中变量的函数

### 闭包变量存储的位置

直接说明：闭包中的变量存储的位置是堆内存。

假如闭包中的变量存储在栈内存中，那么栈的回收 会把处于栈顶的变量自动回收。所以闭包中的变量如果处于栈中那么变量被销毁后，闭包中的变量就没有了。所以闭包引用的变量是出于堆内存中的。

### 闭包的作用

保护函数的私有变量不受外部的干扰。形成不销毁的栈内存。
保存，把一些函数内的值保存下来。闭包可以实现方法和属性的私有化

### 使用闭包需要注意什么

容易导致内存泄漏。闭包会携带包含其它的函数作用域，因此会比其他函数占用更多的内存。过度使用闭包会导致内存占用过多，所以要谨慎使用闭包。
