# 1. 创建节点
1. createElement
2. createTextNode
3. createDocumnetFragment
4. createAttribute


# 2. 获取节点
1. getElementById
2. getElementsByClassName
3. getElementsByTagName
4. querySelector
5. querySelectorAll

# 3.DOM的一些属性
1. parentNode
2. firstChild
3. lastChild
4. childNodes
5. nextSibling
6. previousSibling


# 4. 更新节点
1. innerHTML
2. innerText、textContent (区别是innerText不返回隐藏元素的文本，二textContent返回所有文本)
3. style

# 5. 添加节点
1. innerHTML
2. appendChild (获取一个现有的element 使用appendChild会删除原有位置，在新的位置添加)
3. insertBefore
4. setAttribute


# 6.删除节点
1. removeChild (删除后的节点虽然不在文档树中了，但其实它还在内存中，可以随时再次被添加到别的位置)