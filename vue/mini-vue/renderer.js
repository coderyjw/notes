// 1. 通过h函数创建一个vnode虚拟节点
function h(type, props, children) {
  return {
    type,
    props,
    children
  }
}

// 2. 通过mount函数把虚拟DOM挂载到页面上
function mount(vnode, container) {
  // 1. 创建出真实的元素，并且在vnode上保留el
  const el = vnode.el = document.createElement(vnode.type)

  // 2. 处理props
  if(vnode.props) {
    for(const key in vnode.props) {
      const value = vnode.props[key]
      
      // 判断属性是否是事件属性
      if(key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLocaleLowerCase(), value)
      } else {
        el.setAttribute(key, value)
      }
    }
  }

  // 3. 处理children
  if(vnode.children) {
    if(typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else if(vnode.children instanceof Array) {
      vnode.children.forEach(item => {
        mount(item, el)
      })
    } else if (typeof vnode.children === 'object') {
      mount(vnode.children, el)
    }
  }

  // 4. 挂载到container上面
  container.appendChild(el)

  return container
}

// 3. patch函数 对比两个vnode，决定如何处理新的VNode
function patch(n1, n2) {
  if(n1.type !== n2.type) {
    // 3.1 标签名不相同 直接移除原来的元素 挂载新的vnode
    const n1ParentEl = n1.el.parentElement
    n1ParentEl.removeChild(n1.el)
    mount(n2, n1ParentEl)
  } else {
    // 3.2 标签名相同
    // 3.2.1 去除element对象，并且在能中进行保存
    const el = n2.el = n1.el

    // 3.2.2 处理props
    const oldProps = n1.props || {}
    const newProps = n2.props || {}
    
    // 添加新的属性
    for(const key in newProps) {
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      if(oldValue !== newValue) {
        if(key.startsWith('on')) {
          el.addEventListener(key.slice(2).toLocaleLowerCase(), newValue)
        } else {
          el.setAttribute(key, newValue)
        }
      }
    }

    // 删除旧的属性
    for(const key in oldProps) {
      const oldValue = oldProps[key]
      const newValue = newProps[key]
      if(oldValue !== newValue) {
        if(key.startsWith('on')) {
          el.removeEventListener(key.slice(2).toLocaleLowerCase(), oldValue)
        } else {
          el.removeAttribute(key)
        }
      }
    }

    // 3.2.3 处理children
    // 字符串
    const oldChildren = n1.children
    const newChildren = n2.children
    // 情况一：新的children是字符串
    if(typeof newChildren === 'string') {
      if(newChildren !== oldChildren) {
        el.textContent = newChildren
      }
    } 
    // 情况二：新的children是数组
    else if (newChildren instanceof Array) {
      if(typeof oldChildren === 'string') {
      newChildren.forEach(item => {
          mount(item, el)
        })
      } else {
      // 新旧都是数组（不考虑key的情况）
        const commonLength = Math.min(oldChildren.length, newChildren.length)
      for(let i = 0; i < commonLength; i++) {
          patch(oldChildren[i], newChildren[i])
        }

        if(newChildren.length > oldChildren) {
          newChildren.slice(oldChildren.length).forEach(item => {
            mount(item, el)
          })
        }
        
        if(newChildren.length < oldChildren) {
          oldChildren.slice(oldChildren.length).forEach(item => {
            el.removeChild(item.el)
          })
        }
      }
    }
  }
}



