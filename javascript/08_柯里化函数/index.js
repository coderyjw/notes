function currying(fn) {
  function curried(...args) {
    // 判断当前已接收的参数个数是否与fn函数一致
    // 1.当已经传入的参数数量 大于等于 需要的参数时，就执行函数
    if(args.length >= fn.length) {
      return fn.apply(this, args)
    } else {
      // 没达到个数时，需要返回一个新的函数，继续来接受参数
      return function (...args2) {
        // 接收到参数后，需要递归调用curried来检查函数的个数是否达到
        return curried.apply(this, [...args, ...args2])
      }
    }
  }
  return curried
}

function add (a,b,c,d) {
  return a + b + c + d
}

const curryingFn = currying(add)
console.log(curryingFn(1)(2)(3)(4))
console.log(curryingFn(1, 2)(3)(4))
console.log(curryingFn(1, 2, 3)(4))
console.log(curryingFn(1, 2, 3, 4))