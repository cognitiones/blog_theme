---
title: "class 类"
tags: 
  - class
---

# Class 类

类的数据类型就是函数，类本身就指向构造函数。

```js
class Point {
  // ...
}

typeof Point // "function"
Point === Point.prototype.constructor // true
```

构造函数的`prototype`属性，在 ES6 的“类”上面继续存在。事实上，类的所有方法都定义在类的`prototype`属性上面。

```js
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

# 构造函数 constructor

**`constructor`** 是一种用于创建和初始化`class`创建的对象的特殊方法。

`constructor()`方法是类的默认方法，**通过`new`命令生成对象实例时，自动调用该方法**。一个类必须有`constructor()`方法，如果没有显式定义，一个空的`constructor()`方法会被默认添加。`constructor()`方法默认返回实例对象（即`this`）

类必须使用`new`调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用`new`也可以执行。

在一个类中只能有一个名为 “constructor” 的特殊方法。 一个类中出现多次构造函数 (`constructor)`方法将会抛出一个 `SyntaxError`错误。

使用实例的`__proto__`属性改写原型，必须相当谨慎，不推荐使用，因为这会改变“类”的原始定义，影响到所有实例。