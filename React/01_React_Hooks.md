## 1.Hooks简介

​		Hooks是React 16.8的新增特性，它可以让我们在不编写class的情况下使用state以及其它的React特性（生命周期）

## 2.class组件的优点和缺点

  ###  2.1 优点

  1. class组件可以定义自己的state,用来保存组件的状态
      - 函数组件不可以，因为每次调用都会产生新的临时变量
  2. class组件有自己的生命周期,我们可以在对应的生命周期完成自己的逻辑

     - 比如在componentDidMount中可以发送网络请求，并且该生命周期只会执行1次
     - 函数式组件如果再函数中发送网络请求，意味着每次重新渲染都会重新发送一次网络请求
  3. class组件可以在状态改变时只会重新执行render函数以及我们希望重新调用的生命周期函数componentDidUpdate...  

     - 函数式组件在重新渲染时，整个函数都会被执行，似乎没有什么地方可以让我们调用一次

### 2.2 缺点

  1. 复杂组件变得难以理解
  1. 难以理解的class (比如this的指向)
  1. 组件复用状态很难

  

## 3.useState(stateHook)

### 3.1 使用class组件实现计数器
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
### 3.2 使用hooks 函数式组件实现计数器

``````javascript
// 引入 React 中的 useState Hook。它让我们在函数组件中存储内部 state。   
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



## 4. useEffect(effectHook)

*Effect Hook* 可以在函数组件中执行副作用操作

### 4.1 使用class组件修改tittle

``````javascript
import React, { PureComponent } from 'react'

export default class App extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      counter: 0
    }
  }

  componentDidMount() {
    document.title = this.state.counter
  }

  componentDidUpdate() {
    document.title = this.state.counter
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

在这个 class 中，我们需要在两个生命周期函数中编写重复的代码。**

### 4.2 使用hook修改title

``````javascript
import React , { useState, useEffect } from 'react'

   export default function App() {
     const [ counter, setCounter ] = useState(0)
    
     useEffect(() => {
       document.title = counter
     })
     return (
       <div>
         counter:{ counter }
         <button onClick={e => setCounter(counter + 1)}>+1</button>
       </div>
     )
   }		
``````

可以把 `useEffect` Hook 看做 `componentDidMount`，`componentDidUpdate` 和 `componentWillUnmount` 这三个函数的组合。

### 4.3 需要清除的 effect

``````javascript
import React , { useState, useEffect } from 'react'

   export default function App() {
     const [ counter, setCounter ] = useState(0)
     /**
     	useEffect实际上有两个参数
     	参数一:执行的回调函数
     	参数二:该useEffect在哪些state发生变化时，才重新执行;(受谁的影响)
     */
     useEffect(() => {
       document.title = counter
       console.log('订阅一些事件');
       return function () {
         // effect 返回一个函数 是清除机制
         console.log('取消一些订阅');
       }
     }, [count]) 
     return (
       <div>
         counter:{ counter }
         <button onClick={e => setCounter(counter + 1)}>+1</button>
       </div>
     )
   }	
``````

**在 effect 中返回一个函数** 这是 effect 可选的清除机制。每个 effect 都可以返回一个清除函数。如此可以将添加和移除订阅的逻辑放在一起。它们都属于 effect 的一部分。



## 5. useContext

组件间状态共享

### 5.1 不用hook之前的做法

```javascript
import React, { createContext } from 'react'

const UserContext = createContext()
const ThemeContext = createContext()

function Demo() {
  return (
    // 多个Context共享时的方式会存在大量的嵌套
    <UserContext.Consumer>
      {
        user => (
          <ThemeContext.Consumer>
            {
              theme => (
                <>
                  <div>name: { user.name }</div>
                  <div>color: { theme.color }</div>
                </>
              )
            }
          </ThemeContext.Consumer>
        )
      }
    </UserContext.Consumer>

  )
}

export default function App() {
  return (
    <UserContext.Provider value={{name: 'yjw', age: 18}}>
      <ThemeContext.Provider value={{color: '#fff'}}>
        <Demo/>
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}

```

### 5.2 使用hook后

```javascript
import React, { createContext, useContext } from 'react'

const UserContext = createContext()
const ThemeContext = createContext()

function Demo () {
  const user = useContext(UserContext)
  const theme = useContext(ThemeContext)
  return (
    <>
      <div>name: { user.name }</div>
      <div>color: { theme.color }</div>
    </>
  )
}

export default function App() {
  return (
    <UserContext.Provider value={{name: 'yjw', age: 18}}>
      <ThemeContext.Provider value={{color: '#fff'}}>
        <Demo/> 
      </ThemeContext.Provider>
    </UserContext.Provider>
  )
}

```



## 6. useReducer

useState的一种替代方案，某些场景下state的处理逻辑比较复杂，通过useReducer进行拆分

```javascript
import React , { useState, useReducer } from 'react'

function reducer(state, action) {
  switch(action.type) {
    case 'increment':
      return { ...state, counter: state.counter + 1 }
    default:
      return
  }
}

export default function App() {
  // const [ counter, setCounter ] = useState(0)
  const [state, dispatch] = useReducer(reducer, { counter: 0})     
  return (
    <div>
      {/* counter:{ counter } */}
      counter:{ state.counter }
      {/* <button onClick={e => setCounter(counter + 1)}>+1</button> */}
      <button onClick={e => dispatch({type: 'increment'})}>+1</button>
    </div>
  )
}	
```



## 7. useCallback

实际的目的是为了性能优化

useCallback返回一个函数的memoized(记忆的)

在依赖不变的情况下，多次定义的时候，返回的值是相同的
