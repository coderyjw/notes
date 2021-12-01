## 1. 对Redux的认识

### 1.1 为什么需要Redux?

- JavaScript的应用程序已经变得越来越复杂了
  - javascript需要管理的状态越来越多，越来越复杂
  - 这些状态包括服务器返回的数据、缓存数据、用户操作产生的数据
- 管理不断变化的state非常困难:
  - 状态之间相互依赖，一个状态的变化会引起另一个状态的变化，View页面也可能会引起相应的变化
  - 当应用程序复杂的时候，state的变化会变的难以控制和跟踪
- React是在视图层帮助我们解决了DOM的渲染过程，但是State依然是留给我们自己管理
  - 无论是组件自己的props，还是组件之间的通信通过props传递;也包括Context之间的共享
  - React主要帮助我们管理视图，state如何维护最终还是我们自己决定

$$
UI = render(state)
$$

- Redux就是一个帮助我们管理状态的容器:



### 1.2 什么是Redux?

-  Redux 是 JavaScript 应用的状态容器，提供可预测的状态管理。
- 可以让你开发出行为稳定可预测的应用，运行于不同的环境（客户端、服务器、原生应用），并且易于测试。
- Redux 除了和 React 一起用外，还支持其它界面库。它体小精悍（只有2kB，包括依赖），却有很强大的插件扩展生态。



### 1.3 Redux的核心理念

1. store：存储数据

```javascript
{
  todos: [{
    text: 'Eat food',
    completed: true
  }, {
    text: 'Exercise',
    completed: false
  }],
  visibilityFilter: 'SHOW_COMPLETED'
}
```



2. action：Redux要求更新数据必须通过派发（dispatch）action来修改，action 就是一个普通 JavaScript 对象，用来描述发生了什么。强制使用 action 来描述所有变化带来的好处是可以清晰地知道应用中到底发生了什么。如果一些东西改变了，就可以知道为什么变。action 就像是描述发生了什么的指示器。

```javascript
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{ type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL' }
```

3. Reducer：把 action 和 state 串起来，reducer是一个接收 state 和 action，并返回新的 state 的纯函数

```javascript
// reducer1 接收 state 和 action，并返回新的 state 
function visibilityFilter(state = 'SHOW_ALL', action) {
  if (action.type === 'SET_VISIBILITY_FILTER') {
    return action.filter
  } else {
    return state
  }
}

// reducer1 接收 state 和 action，并返回新的 state 
function todos(state = [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return state.concat([{ text: action.text, completed: false }])
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        action.index === index
          ? { text: todo.text, completed: !todo.completed }
          : todo
      )
    default:
      return state
  }
}

// 再开发一个 reducer 调用这两个 reducer，进而来管理整个应用的 state：
function todoApp(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}
```



###  1.3 Redux的三大原则

1. 单一数据源
2. State是只读的
3. 使用纯函数来执行修改



## 2. Redux的基本使用

store.js

```javascript
import { createStore } from 'redux'
// const redux = require('redux')

// 根状态
const initState = {
  value: 0
}

/**
 * reducer函数 连接store和action 
 * @param {*} state 根状态 值通常是一个对象
 * @param {*} action 描述“发生了什么”的动作对象
 * @returns  返回一个新的状态值
 */
function counterReducer(state = initState, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 } // 不改变状态对象，而是在状态改变时返回一个新对象
    case 'counter/decremented':
      return { value: state.value - 1 } // 不改变状态对象，而是在状态改变时返回一个新对象
    default:
      return state
  }
}

// 创造一个store来存储状态
let store = createStore(counterReducer)

// 可以通过subscribe更新 UI 以响应状态更改
// 通常使用视图绑定库（例如 React Redux）而不是直接使用 subscribe()
store.subscribe(() => console.log('状态发生了变化', store.getState()))

// 改变内部状态的唯一方法是派发（dispatch）一个动作（action）
store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'counter/incremented' })
store.dispatch({ type: 'counter/decremented' })
```



## 3. Redux 融入 React

App.js

```javascript
import React, { PureComponent } from 'react'
import store from './App'

export default class App extends PureComponent {
  
  constructor(props) {
    super(props)
    this.state = {
      // store的api:getState  返回当前的状态
      counterState: store.getState()
    }
  }
  
  componentDidMount() {
    // store的api:subscribe 订阅监听状态的变化 更新 UI 以响应状态更改
    store.subscribe(() => {
      console.log(store.getState());
      this.unsubscribe = this.setState({
        counterState: store.getState()
      })
    })
  }

  componentWillUnmount() {
    // 取消订阅监听状态的变化
    this.unsubscribe()
  }

  render() {
    return (
      <>
        <div>counter: { this.state.counterState.value }</div>
        <button onClick={ e => store.dispatch({ type: 'counter/decremented' })}>-1</button> 
        <button onClick={ e => store.dispatch({ type: 'counter/incremented' })}>+1</button> 
      </>
    )
  }
}
	
```



## 4. React-Redux

到目前为止我们其实已经掌握了redux的基本使用以及把它和react结合起来了，但其实当前代码还并不优雅,

因为每写一个组件都要来一次上面的逻辑，是不是可以尝试把重复逻辑抽离出去呢

### 4.1 自定义connect函数

connect.js

```javascript
import React, { PureComponent } from 'react'
import store from './App'

const connect = function(mapStateToProps,mapDispatchToProps) {
  return function(WrapperComponent) {
    return class extends PureComponent {
      constructor(props) {
        super(props)
        this.state = {
          counterState: mapStateToProps(store.getState())
        }
      }

      componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
          this.setState({
            counterState: store.getState()
          }, () => {
            console.log('状态发生了改变:', this.state.counterState.value);
          })
          
        })
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        return (
          <WrapperComponent 
            {...this.props} 
            {...mapStateToProps(store.getState())} 
            {...mapDispatchToProps(store.dispatch)}
          />
        )
      }
    }
  }
}

export defalut connect
```

App.js

```javascript
import connect from './connect.js'

function App(props) {
  return (
    <>
      <div>counter: { props.counterState.value }</div>
      <button onClick={ e => props.decremented()}>-1</button> 
      <button onClick={ e => props.incremented()}>+1</button> 
    </>
  )
}

// 不要直接赋值一个对象 依赖的store越少越好
// const mapStateToProps = {
//   counterState: store.getState()
// }

// 同理不要直接赋值一个对象 依赖的store越少越好
// const mapDispatchToProps = {
//     incremented() {
//       store.dispatch({ type: 'counter/incremented' })
//     },
//     decremented() {
//       store.dispatch({ type: 'counter/decremented' })
//     }
// }

const mapStateToProps = state => {
  return {
    counterState: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    incremented() {
      dispatch({ type: 'counter/incremented' })
    },
    decremented() {
      dispatch({ type: 'counter/decremented' })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
```

- 但上面的connect函数有一个很大的缺陷：依赖导入的store
- 我们希望当前封装的函数对store没有任何的依赖，正确的做法是提供一个Provider,Provider来自于我们创建的Context,让用户将store传入到value中即可



### 4.2 Context处理store

context.js

```javascript
import { createContext } from "react";

const StoreContext = createContext()

export default StoreContext
```

index.js

```javascript
import App from './App.js'
import SotreContext from './context.js'
import store from './store.js'

ReactDOM.render(
  <SotreContext.Provider value={store}>
    <App />
  </SotreContext.Provider>
  ,
  document.getElementById('root')
);
```

connect.js

```javascript
import React, { PureComponent } from 'react'
import store from './store.js'
import StoreContext  from './context.js'

const connect = function(mapStateToProps,mapDispatchToProps) {
  return function(WrapperComponent) {
    return class extends PureComponent {
      // static 关键字 相当于给添加一个类属性contextType 并赋值为StoreContext
      static contextType = StoreContext
      constructor(props, context) {
        super(props)
        this.state = {
          // context代替store
          counterState: mapStateToProps(context.getState())
        }
      }

      componentDidMount() {
        // context代替store
        this.unsubscribe = this.context.subscribe(() => {
          this.setState({
            counterState: this.context.getState()
          }, () => {
            console.log('状态发生了改变:', this.state.counterState.value);
          })
          
        })
      }

      componentWillUnmount() {
        this.unsubscribe()
      }

      render() {
        return (
          // context代替store
          <WrapperComponent 
            {...this.props} 
            {...mapStateToProps(this.context.getState())} 
            {...mapDispatchToProps(this.context.dispatch)}
          />
        )
      }
    }
  }
}
```



### 4.3 React-Redux的使用

React-redux 是一个官方视图绑定库，它让你的 React 组件从 Redux 存储中读取数据，并将操作分派到存储中以更新状态。

到这，要使用react-redux,其实已经很简单了，只需要对4.2中代码做很小的修改

index.js

```javascript
import { Provider } from 'react-redux'
import store from './store.js'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
```

App.js

```javascript
import React, { PureComponent } from 'react'
import store from './store.js'

import { connect } from 'react-redux'

function App(props) {
  return (
    <>
      <div>counter: { props.counterState.value }</div>
      <button onClick={ e => props.decremented()}>-1</button> 
      <button onClick={ e => props.incremented()}>+1</button> 
    </>
  )
}

const mapStateToProps = state => {
  return {
    counterState: state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    incremented() {
      dispatch({ type: 'counter/incremented' })
    },
    decremented() {
      dispatch({ type: 'counter/decremented' })
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)

```











