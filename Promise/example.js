doSomething(function(result){
    doSomethingElse(result, function(newResult){
        doThirdThing(newResult, function(finalResult){
            console.log('Got the final result: ' + finalResult);
        }, failureCallback);
    }, failureCallback);
}, failureCallback);

doSomething().then(function(result){
    return doSomethingElse(result);
})
.then(function(newResult){
    return doThirdThing(newResult);
})
.then(function(finalResult){
    console.log('Got the final result: ' + finalResult);
})
.catch(failureCallback);

doSomething()
.then(result => doSomethingElse(result))
.then(newResult => doThirdThing(newResult))
.then(finalResult => {
    console.log(`Got the final result: ${finalResult}`);
})
.catch(failureCallback);

var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
function Promise() { 
    // 保存状态
    var state = PENDING;

    //当已实现时保存值;当已拒绝时保存错误 
    var value = null;

    //当调用.then或.done时保存成功或失败句柄
    var handlers = [];
}

var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
function Promise() {
    var state = PENDING;
    var value = null;
    var handlers = [];
    function fulfill(result) {
        state = FULFILLED;
        value = result;
    }
    function reject(error) {
        state = REJECTED;
        value = error;
    } 
}

var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
function Promise() {
    var state = PENDING;
    var value = null;
    var handlers = [];
    function fulfill(result) {
        state = FULFILLED;
        value = result;
    }
    function reject(error) {
        state = REJECTED;
        value = error;
    }
    function resolve(result) {
        try {
            var then = getThen(result);
            if (then) {
                doResolve(then.bind(result), resolve, reject)
                return 
            }
            fulfill(result);
        } catch (e) {
            reject(e); 
        }
    } 
}


/**
* 检查value是不是一个promise，如果是，返回这个promise的then方法 *
* @param {Promise|Any} value
* @return {Function|Null}
*/
function getThen(value) {
    var t = typeof value;
    if (value && (t === 'object' || t === 'function')) {
      var then = value.then;
      if (typeof then === 'function') {
        return then;
      }
  }
    return null;
  }
  /**
  * 取一个可能有问题的resolver函数，保证onFulfilled和onRejected只被调用一次 *
  * 不保证异步 *
  * @param {Function} fn 一个不一定能被信任的resolver函数 * @param {Function} onFulfilled
  * @param {Function} onRejected
  */
  function doResolve(fn, onFulfilled, onRejected) {
    var done = false;
    try {
      fn(function (value) {
        if (done) return
        done = true
        onFulfilled(value)
      }, function (reason) {
        if (done) return
        done = true
        onRejected(reason)
      })
    } catch (ex) {
      if (done) return
      done = true
      onRejected(ex)
  } 
}

var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
function Promise(fn) {
    var state = PENDING;
    var value = null;
    var handlers = [];

    function fulfill(result) {
        state = FULFILLED;
        value = result;
        handlers.forEach(handle);
        handlers = null;
    }

    function reject(error) {
        state = REJECTED;
        value = error;
        handlers.forEach(handle);
        handlers = null;
    }

    function resolve(result) {
        try {
            var then = getThen(result);
            if (then) {
                doResolve(then.bind(result), resolve, reject)
                return 
            }
            fulfill(result);
        } catch (e) {
            reject(e); 
        }
    }

    function handle(handler) {
        if (state === PENDING) {
            handlers.push(handler);
        } else {
            if (state === FULFILLED && typeof handler.onFulfilled === 'function') {
                handler.onFulfilled(value);
            }
            if (state === REJECTED && typeof handler.onRejected === 'function') {
                handler.onRejected(value);
            }
        } 
    }
    this.done = function (onFulfilled, onRejected) { //保证我们一直异步
        setTimeout(function () {
            handle({
                onFulfilled: onFulfilled,
                onRejected: onRejected
            }); 
        }, 0);
    }

    doResolve(fn, resolve, reject);
}

this.then = function (onFulfilled, onRejected) {
    var self = this;
    return new Promise(function (resolve, reject) {
        return self.done(function (result) {
            if (typeof onFulfilled === 'function') {
                try {
                    return resolve(onFulfilled(result));
                } catch (ex) {
                    return reject(ex);
                }
            } else {
                return resolve(result);
            }
        }, function (error) {
            if (typeof onRejected === 'function') {
                try {
                    return resolve(onRejected(error));
                } catch (ex) {
                    return reject(ex);
                }
            } else {
                return reject(error);
            }
        }); 
    });
}

var promise1 = Promise.resolve([1, 2, 3]);

promise1.then(function(value){
    console.log(value);
    // expected output: Array [1, 2, 3]
});

Promise.reject(new Error("fail")).then(function(result){
    // 未被调用
}, function(error){
    console.log(error); // stacktrace
});

Promise.race = function (values) {
    // 这个实现只支持array-likes
    return new Promise(function (resolve, reject) {
        values.forEach(function(value){
            Promise.resolve(value).then(resolve, reject);
        }); 
    });
};

var p1 = new Promise(function(resolve, reject){
    setTimeout(resolve, 500, "one");
});
var p2 = new Promise(function(resolve, reject){
    setTimeout(resolve, 100, "two");
});

Promise.race([p1, p2]).then(function(value){
    console.log(value); // "two"
    // Both resolve, but p2 is faster
});

var p3 = new Promise(function(resolve, reject){
    setTimeout(resolve, 500, "three");
});
var p4 = new Promise(function(resolve, reject){
    setTimeout(reject, 100, "four");
});

Promise.race([p3, p4]).then(function(value){
    // not called
}, function(reason){
    console.log(reason); // "four"
    // p4 is faster, so it rejects
});

Promise.all = function (arr) {
    // 这个实现只支持array-likes
    var args = Array.prototype.slice.call(arr);
    return new Promise(function (resolve, reject) {
        if (args.length === 0) return resolve([]);
        var remaining = args.length;
        function res(i, val) {
            if (val && (typeof val === 'object' || typeof val === 'function')) {
                var then = val.then;
                if (typeof then === 'function') {
                    var p = new Promise(then.bind(val));
                    p.then(function (val) {
                        res(i, val);
                    }, reject);
                    return;
                } 
            }
            args[i] = val;
            if (--remaining === 0) {
                resolve(args);
            }
        }
        for (var i = 0; i < args.length; i++) {
            res(i, args[i]);
        }
    }); 
};

var promise = Promise.resolve(3);
Promise.all([true, promise]).then(values => {
    console.log(values); // [true, 3]
});