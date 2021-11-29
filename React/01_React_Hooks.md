## 1.class组件的有优点和缺点

- 优点

  1. class组件可以定义自己的state,用来保存组件的状态
      - 函数组件不可以，因为每次调用都会产生新的临时变量
  2. class组件有自己的生命周期,我们可以在对应的生命周期完成自己的逻辑

     - 比如在componentDidMount中可以发送网络请求，并且该生命周期只会执行1次
     - 函数式组件如果再函数中发送网络请求，意味着每次重新渲染都会重新发送一次网络请求
  3. class组件可以在状态改变时只会重新执行render函数以及我们希望重新调用的生命周期函数componentDidUpdate...  

     - 函数式组件在重新渲染时，整个函数都会被执行，似乎没有什么地方可以让我们调用一次

- 缺点

	1. 复杂组件变得难以理解
	1. 难以理解的class (比如this的指向)
	1. 组件复用状态很难

- 总结

  Hooks是React 16.8的新增特性，它可以让我们在不编写class的情况下使用state以及其它的React特性（生命周期）

  
  
## 2.使用class和hook实现计数器对比

1. 使用class组件实现计数器
``````javascript
import React, { PureComponent } from 'react'

export default class App extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      counter: 0
    }
  }

  render() {
    return (
      <>
        <div>
        counter: { this.state.counter }
        </div>
        <button onClick={e => this.increment()}>+1</button>
      </>
    )
  }

  increment() {
    this.setState({
      counter: this.state.counter + 1
    })
  }
}

``````
2. 使用hooks 函数式组件实现计数器
``````javascript
   import React , { useState } from 'react'
   
   export default function App() {
      /**
       * Hook: useState 来自react包
       * 参数：作用是给创建出来的状态一个默认值
       * 返回值：数组 元素1是当前state的值 元素2是设置新的值时使用的一个函数
       */
     const [ counter, setCounter ] = useState(0)
     
     return (
       <div>
         counter:{ counter }
         <button onClick={e => setCounter(counter + 1)}>+1</button>
       </div>
     )
   }	
``````

使用hook的两个额外原则

1. 只能在函数外层调用hook。不要再循环、条件判断或者子函数中调用
2. 只能在React的函数组件中调用Hook。不要再其他javascript函数中调用