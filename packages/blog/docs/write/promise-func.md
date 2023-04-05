---
title: "手写实现 Promise 全部实例方法和静态方法"
tags: 
    - promise
    - 手写系列
---

# [手写实现 Promise 全部实例方法和静态方法，来看看 Promise.all、Promise.race 和 Promise.any 都是怎么实现的 - 掘金 (juejin.cn)](https://juejin.cn/post/7044088065874198536#heading-0)

## 1. 实现 Promise.resolve

**Promise.resolve(value)** 将给定的一个值转为Promise对象。

- 如果这个值是一个 promise ，那么将返回这个 promise ；
- 如果这个值是thenable（即带有`"then" `方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态；
- 否则返回的promise将以此值完成，即以此值执行`resolve()`方法 (状态为fulfilled)。

## 2. 实现 Promise.reject

`Promise.reject()`方法返回一个带有拒绝原因的`Promise`对象。

## 3. 实现 Promise.prototype.catch

`catch()` 方法返回一个`Promise`，并且处理拒绝的情况。它的行为与调用`Promise.prototype.then(undefined, onRejected)` 相同。

事实上, calling `obj.catch(onRejected)` 内部calls `obj.then(undefined, onRejected)`。(这句话的意思是，我们显式使用`obj.catch(onRejected)`，内部实际调用的是`obj.then(undefined, onRejected)`)

`Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

## 4. 实现 Promise.prototype.finally

`finally() ` 方法返回一个`Promise`。在promise结束时，无论结果是fulfilled或者是rejected，都会执行指定的回调函数。这为在`Promise`是否成功完成后都需要执行的代码提供了一种方式。

这避免了同样的语句需要在`then()`和`catch()`中各写一次的情况。该方法是 ES2018 引入标准的。

**由于无法知道promise的最终状态，所以`finally`的回调函数中不接收任何参数，它仅用于无论最终结果如何都要执行的情况。**

## 5. 实现 Promise.all

`Promise.all()` 方法接收一个`promise`的`iterable`类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个`Promise`实例， 输入的所有`promise`的`resolve`回调的结果是一个数组。

> 返回的这个Promise的resolve回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候。它的reject回调执行是，只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject的是第一个抛出的错误信息。

- `Promise.all` 等待所有都完成（或第一个失败）
- 如果传入的参数是一个空的可迭代对象，则返回一个已完成（already resolved）状态的 Promise
- 如果参数中包含非 promise 值，这些值将被忽略，但仍然会被放在返回数组中，如果 promise 完成的话 `(也就是如果参数里的某值不是Promise，则需要原样返回在数组里)`
- 在任何情况下，Promise.all 返回的 promise 的完成状态的结果都是一个数组，它包含所有的传入迭代参数对象的值（也包括非 promise 值）。
- 如果传入的 promise 中有一个失败（rejected），Promise.all 异步地将失败的那个结果给失败状态的回调函数，而不管其它 promise 是否完成

## 6. 实现 Promise.allSettled

Promise.allSettled(iterable)方法返回一个在所有给定的promise都已经fulfilled或rejected后的promise，并带有一个对象数组，每个对象表示对应的promise结果。

- 当你有多个彼此不依赖的异步任务成功完成时，或者你总是想知道每个promise的结果时，通常使用它。
- 相比之下，Promise.all() 更适合彼此相互依赖或者在其中任何一个reject时立即结束。

参数 iterable 是一个可迭代的对象，例如Array，其中每个成员都是Promise。

对于每个结果对象，都有一个 status 字符串。如果它的值为 fulfilled，则结果对象上存在一个 value 。如果值为 rejected，则存在一个 reason 。value（或 reason ）反映了每个 promise 决议（或拒绝）的值。

`Promise.allSettled(iterable)` 的参数 iterable 中传入一个非promise值

 **Promise.allSettled() 方法内部将非 Promise 值转换成 Promise 了**

## 7. 实现 Promise.any

**本质上，这个方法和Promise.all()是相反的。**

`Promise.any()` 接收一个Promise可迭代对象，只要其中的一个 promise 成功，就返回那个已经成功的 promise 。

如果可迭代对象中没有一个 promise 成功（即所有的 promises 都失败/拒绝），就返回一个失败的 promise 和`AggregateError`类型的实例，它是 Error 的一个子类，用于把单一的错误集合在一起。

- 如果传入的参数是一个空的可迭代对象，则返回一个 已失败（already rejected） 状态的 Promise。
- 如果传入的参数不包含任何 promise，则返回一个 异步完成 （asynchronously resolved）的 Promise。`(即将非Promise值，转换为Promise并当做成功)`
- 只要传入的迭代对象中的任何一个 promise 变成成功（resolve）状态，或者其中的所有的 promises 都失败，那么返回的 promise 就会 异步地（当调用栈为空时） 变成成功/失败（resolved/reject）状态。`(如果所有Promise都失败，则报错)`

## 8. 实现 Promise.race

`Promise.race(iterable)` 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。

一个待定的 Promise 只要给定的迭代中的一个promise解决或拒绝，就采用第一个promise的值作为它的返回值，从而异步地解析或拒绝（一旦堆栈为空）。

`race` 函数返回一个 `Promise`，它将与第一个传递的 promise 相同的完成方式被完成。它可以是完成（ resolves），也可以是失败（rejects），这要取决于第一个完成的方式是两个中的哪个。

- 如果传的迭代是空的，则返回的 promise 将永远等待。
- 如果迭代包含一个或多个非承诺值和/或已解决/拒绝的承诺，则 Promise.race 将解析为迭代中找到的第一个值。



