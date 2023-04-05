--- 
title: "手写Promise"
tags: 
  - promise
  - 手写系列
--- 

# [手把手一行一行代码教你“手写Promise“，完美通过 Promises/A+ 官方872个测试用例](https://juejin.cn/post/7043758954496655397)

## 流程

### 	一、定义初始结构

### 	二、实现 resolve 和 reject

​		1、管理状态和结果

​		2、this指向问题

### 	三、实现 then 方法

​		1、状态不可变

​		2、执行异常 throw

​		3、参数校验

### 	四、实现异步

​		1、添加定时器

​		2、回调保存

​		3、验证 then 方法多次调用

### 	五、实现 then 方法的链式调用（promises/A+）

## 简易Promise代码

```js
class myPromise {
    static PENDING = 'pending';
    static FULFILLED = 'fulfilled';
    static REJECTED = 'rejected';
    constructor(func) {
        this.PromiseState = myPromise.PENDING;
        this.PromiseResult = null;
        this.onFulfilledCallbacks = []; // 保存成功回调
        this.onRejectedCallbacks = []; // 保存失败回调
        try {
            func(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error)
        }
    }
    resolve(result) {
        if (this.PromiseState === myPromise.PENDING) {
            this.PromiseState = myPromise.FULFILLED;
            this.PromiseResult = result;
            this.onFulfilledCallbacks.forEach(callback => {
                callback(result)
            })
        }
    }
    reject(reason) {
        if (this.PromiseState === myPromise.PENDING) {
            this.PromiseState = myPromise.REJECTED;
            this.PromiseResult = reason;
            this.onRejectedCallbacks.forEach(callback => {
                callback(reason)
            })
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => {
            throw reason;
        };
        if (this.PromiseState === myPromise.PENDING) {
            this.onFulfilledCallbacks.push(() => {
                setTimeout(() => {
                    onFulfilled(this.PromiseResult);
                });
            });
            this.onRejectedCallbacks.push(() => {
                setTimeout(() => {
                    onRejected(this.PromiseResult);
                });
            });
        }
        if (this.PromiseState === myPromise.FULFILLED) {
            setTimeout(() => {
                onFulfilled(this.PromiseResult);
            });
        }
        if (this.PromiseState === myPromise.REJECTED) {
            setTimeout(() => {
                onRejected(this.PromiseResult);
            });
        }
    }
}
```

## Promises/A+ 代码

[Promises/A+ 规范](https://promisesaplus.com/#notes)

```js
class myPromise {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  constructor(func) {
    this.PromiseState = myPromise.PENDING;
    this.PromiseResult = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    try {
      func(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      this.reject(error)
    }
  }

  resolve(result) {
    if (this.PromiseState === myPromise.PENDING) {
      this.PromiseState = myPromise.FULFILLED;
      this.PromiseResult = result;

      this.onFulfilledCallbacks.forEach(callback => {
        callback(result)
      })
    }
  }

  reject(reason) {
    if (this.PromiseState === myPromise.PENDING) {
      this.PromiseState = myPromise.REJECTED;
      this.PromiseResult = reason;

      this.onRejectedCallbacks.forEach(callback => {
        callback(reason)
      })
    }
  }

  then(onFulfilled, onRejected) {
    const promise2 = new myPromise((resolve, reject) => {
      if (this.PromiseState === myPromise.FULFILLED) {
        setTimeout(() => {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(this.PromiseResult)
            } else {
              let x = onFulfilled(this.PromiseResult);
              resolvePromise(promise2, x, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        });
      } else if (this.PromiseState === myPromise.REJECTED) {
        setTimeout(() => {
          try {
            if (typeof onRejected !== 'function') {
              reject(this.PromiseResult)
            } else {
              let x = onRejected(this.PromiseResult);
              resolvePromise(promise2, x, resolve, reject)
            }

          } catch (error) {
            reject(error)
          }

        });
      } else if (this.PromiseState === myPromise.PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onFulfilled !== 'function') {
                resolve(this.PromiseResult)
              } else {
                let x = onFulfilled(this.PromiseResult);
                resolvePromise(promise2, x, resolve, reject)
              }
            } catch (error) {
              reject(error)
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              if (typeof onRejected !== 'function') {
                reject(this.PromiseResult)
              } else {
                let x = onRejected(this.PromiseResult);
                resolvePromise(promise2, x, resolve, reject)
              }

            } catch (error) {
              reject(error)
            }
          });
        });
      }
    })

    return promise2;
  }
}

/**
 * 对resolve()、reject() 进行改造增强 针对resolve()和reject()中不同值情况 进行处理
 * @param  {promise} promise2 promise1.then方法返回的新的promise对象
 * @param  {[type]} x         promise1中onFulfilled或onRejected的返回值
 * @param  {[type]} resolve   promise2的resolve方法
 * @param  {[type]} reject    promise2的reject方法
 */

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    throw new TypeError('Chaining cycle detected for promise #<Promise>')
  }

  if (x instanceof myPromise) {
    x.then(y => {
      resolvePromise(promise2, y, resolve, reject)
    }, reject)
  } else if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      var then = x.then;
    } catch (e) {
      reject(e)
    }

    if (typeof then === 'function') {
      let called = false;
      try {
        then.call(x, y => {
          if (called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if (called) return;
          called = true;
          reject(r)
        })
      } catch (e) {
        if (called) return;
        called = true;
        reject(e)
      }
    } else {
      resolve(x)
    }
  } else {
    return resolve(x)
  }
}

myPromise.deferred = function () {
  let result = {};
  result.promise = new myPromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
  })

  return result;
}

module.exports = myPromise
```

## 测试 Promises/A+ 代码

### 1、安装测试工具

```shell
npm install promises-aplus-tests -D
```

### **2、使用 CommonJS 对外暴露 myPromise 类**

```js
class myPromise {
	...
}

function resolvePromise(promise2, x, resolve, reject) { 
	...
}

module.exports = myPromise;
```

### 3、实现静态方法 deferred

要使用 `promises-aplus-tests` 这个工具测试，必须实现一个静态方法`deferred()`，官方对这个方法的定义如下:

![在这里插入图片描述](http://cdn.chen-zeqi.cn/370aab7c0bed4cd6b360ddee24b0cd0d~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

意思就是：

我们要给自己手写的`myPromise`上实现一个静态方法`deferred()`，该方法要返回一个包含`{ promise, resolve, reject }`的对象：

- `promise` 是一个处于`pending`状态的 Promsie。
- `resolve(value)` 用`value`解决上面那个`promise`
- `reject(reason)` 用`reason`拒绝上面那个`promise`

**`deferred()`的实现如下：**

```js{8-16}
class myPromise {
	...
}

function resolvePromise(promise2, x, resolve, reject) { 
	...
}

myPromise.deferred = function () {
    let result = {};
    result.promise = new myPromise((resolve, reject) => {
    result.resolve = resolve;
    result.reject = reject;
    });
    return result;
}

module.exports = myPromise;
```

### 4、配置 package.json

我们实现了`deferred `方法，也通过 CommonJS 对外暴露了`myPromise`，最后配置一下`package.json`就可以跑测试啦~😺

新建一个 `package.json` ，**配置如下：**

```javascript
// package.json
{
  "devDependencies": {
    "promises-aplus-tests": "^2.1.2"
  },
  "scripts": {
    "test": "promises-aplus-tests myPromise"
  }
}
```

### 5、**执行测试命令：**

```shell
npm run test
```