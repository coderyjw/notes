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

### 2.2 缺点（使用Hook的动机）

  1. 复杂组件变得难以理解
     - 我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。
    2. 难以理解的class 
       - 比如this指向
    3. 组件复用状态很难
       - 使用providers，consumers，高阶组件复用组件状态常常会形成嵌套地狱

  

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

useCallback返回一个函数的memoized(记忆的)回调函数

在依赖不变的情况下，多次定义的时候，返回的值是相同的

一般情况是将一个组件中的函数，传递给子元素进行回调使用时，使用useCallback对函数进行处理

- 用法

```javascript
// useCallback 在依赖（用例中指a、b）不变的情况下，多次定义的时候，返回的值是相同的
const memoizedCallback = useCallback(
  () => {
    doSomething(a,b)
  },  
  [a,b],
)
```



## 8. useMemo

useMemo实际的目的也是为了进行性能的优化

useMemo也是返回一个memoized(记忆的)值

在依赖不变的情况下，多次定义的时候，返回的值是相同的

- 用法

```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- useCallBack 和 useMemo的区别

useCallBack 的返回值是一个函数 ，对函数做优化，而useMemo的返回值可以是普通的值、对象或者函数，对返回值做优化

```
useCallback(fn, deps)` 相当于 `useMemo(() => fn, deps)
```



## 9. useRef

useRef返回一个ref对象，返回的ref对象在组件的整个生命周期保持不变

- 用法

1. 引入DOM(或者组件，需要时class组件，因为函数式组件没有实例对象)元素

```javascript
export default function App() {
  const ref = useRef()
  const changeText = () => {
    ref.current.innerHTML = 'world'
  }
  return (
    <>
      <div ref={ref}>hello</div>
      <button onClick={changeText}>CHANGE</button>
    </>
  )
}
```



1. 保存一个数据，这个对象在整个生命周期中可以保持不变

```JAVASCRIPT
import React,{useState, useEffect, useRef} from 'react'


export default function App() {
  const [counter, setCounter] = useState(0)
  const numRef = useRef(counter)

  // 点击按钮+10重新渲染组件后调用 变更 .current 属性不会引发组件重新渲染
  // 所以页面上numRef.current会一直显示上一次的值，其实已经改了但是没有渲染，下次点击+10渲染后numRef.current相对于counter又是上一次的值
  useEffect(() => {
    numRef.current = counter
    console.log('numRef.current:',numRef.current)
  }, [counter])
  
  return (
    <>
      <div>counter上一次的值： {numRef.current}</div>
      <div>counter这一次的值: {counter}</div>
      <button onClick={e => setCounter(counter + 10)}>+10</button>
    </>
  )
}

```



## 10. useImperativeHandle

`useImperativeHandle` 可以让你在使用 `ref` 时自定义暴露给父组件的实例值

因为react希望我们不应该把子组件所有的东西都暴露给父组件

```javascript
import React, {forwardRef,useRef,useImperativeHandle } from 'react'

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  // 父组件只能调用current中的focus方法
  useImperativeHandle(ref, () => ({
    focus: () => {
      console.log('useImperativeHandle中的focus')
      inputRef.current.focus();
    }
  }), [inputRef.current]);
  return <input ref={inputRef}  />;
})

export default function App() {
  const ref = useRef()
  return (
    <div>
      <FancyInput ref={ref}/>
      <button onClick={e => ref.current.focus()}>聚焦</button>
    </div>
  )
}

```



## 11. useLayoutEffect

- useLayoutEffect和useEffect非常相似，实际上他们只有一点区别
  - useEffect会在渲染的内容更新到DOM上后执行，不会阻塞DOM的更新
  - useLayoutEffect会在渲染的内容更新到DOM上之前执行，会阻塞DOM的更新
- 如果希望在某些操作发生之后在更新DOM，应该选择useLayoutEffect





## 12. 自定义Hook

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。

当我们想在两个函数之间共享逻辑时，我们会把它提取到第三个函数中。而组件和 Hook 都是函数，所以也同样适用这种方式。

**自定义 Hook 是一个函数，其名称以 “`use`” 开头，函数内部可以调用其他的 Hook。**



## 13. 认识ReactFiber

默认的情况下js的线程、页面的布局和绘制都是运行在浏览器的主线程中的，如果js运算花了很长时间，就会持续占用主线程，导致页面无法及时更新而出现掉帧。

Fiber就是将js运算切分为多个步骤，分批完成，也就是说完成一部分更新一部分页面，让浏览器有时间进行页面的渲染。等浏览器忙完之后，再继续之前未完成的任务。























