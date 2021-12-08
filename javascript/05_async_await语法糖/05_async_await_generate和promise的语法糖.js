function requestData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url)
    }, 1000)
  })
}

function* foo() {
  const res1 = yield requestData('aaa')
  const res2 = yield requestData(res1 + 'bbb')
  const res3 = yield requestData(res2 + 'ccc')
  console.log(res3)
}


// const generate = foo()
// generate.next().value.then(res1 => {
//   generate.next(res1).value.then(res2 => {
//     generate.next(res2).value.then(res3 => {
//       generate.next(res3)
//     })
//   })
// })

function execGenerator(generatorFn) {
  const generator = generatorFn()
  function exec(res) {
    const result =  generator.next(res)
    if(result.done) {
      return result.value
    }
    result.value.then(res => {
      exec(res)
    })
  }
  exec()
}
execGenerator(foo)

// async function asyncfoo() {
//   const res1 = await requestData('aaa')
//   const res2 = await requestData(res1 + 'bbb')
//   const res3 = await requestData(res2 + 'ccc')
//   console.log(res3)
// }

// asyncfoo()