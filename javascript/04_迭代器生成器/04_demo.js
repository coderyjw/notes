// const iterator = {
//   next: function() {
//     return { done: true, value: 123}
//   }
// }


// const names = ['zhangsan', 'lisi', 'wangwu']

// let index = 0
// const namesIterator = {
//   next: function() {
//     if(index < names.length) {
//       return { done: false, value: names[index++] }
//     } else {
//       return { done: true, value: undefined}
//     }
//   }
// }

// console.log(namesIterator.next())
// console.log(namesIterator.next())
// console.log(namesIterator.next())
// console.log(namesIterator.next())



// const iterableObj = {
//   names: ['zhangsan', 'lisi', 'wangwu'],
//   [Symbol.iterator]: function() {
//     let index = 0
//     return {
//       next: () => { // 一定要是箭头函数，this指向iterableObj才能访问到names属性
//         if(index < this.names.length) {
//           return { done: false, value: this.names[index++] }
//         } else {
//           return { done: true, value: undefined}
//         }
//       }
//     }
//   }
// }

// const iterator = iterableObj[Symbol.iterator]()
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())


// const obj = {
//   name: 'zhangsan',
//   age: 20
// }

// for(const key in iterableObj) {
//   console.log(key)
// }

// for(const key of iterableObj) {
//   console.log(key)
// }

// const arr = ['zhangsan', 'lisi', 'wangwu']
// const iterator = arr[Symbol.iterator]()
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

// function * foo(val) {
//   const next1 = yield 'yeild 1'
//   console.log({ next1 })
//   const next2 =  yield 'yeild 2'
//   console.log({ next2 })
// }

// const generator = foo(123)

// console.log(generator.next())
// console.log(generator.next('next1'))
// console.log(generator.next('next2'))

// function createIterator(arr) {
//     let index = 0
//     return {
//     next: () => {
//       if (index < arr.length) {
//         return { value: arr[index++], done: false}
//       } else {
//         return { value: undefined, done: true}
//       }
//     }
//   }
// }

function * createIterator(arr) {
  // for(const item of arr) {
  //   yield item
  // }
  yield* arr
}

const names = ['zhangsan', 'li', 'wangwu']

const iterator = createIterator(names)
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
