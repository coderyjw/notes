# 1.题目

给你一个有序数组`nums`，请你 原地 删除重复出现的元素，使每个元素 **只出现一次** ，返回删除后数组的新长度。



不要使用额外的数组空间，你必须在 原地 **修改输入数组** 并在使用 O(1) 额外空间的条件下完成。



**说明:**



为什么返回数值是整数，但输出的答案是数组呢?



请注意，输入数组是以**引用**方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。



你可以想象内部操作如下:



\``` c

// nums 是以“引用”方式传递的。也就是说，不对实参做任何拷贝 

int len = removeDuplicates(nums);



// 在函数里修改输入数组对于调用者是可见的。 

// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。 

for (int i = 0; i < len; i++) { 

  print(nums[i]); 

}

\```



**示例 1：**



\```

输入：nums = [1,1,2] 

输出：2, nums = [1,2] 

解释：函数应该返回新的长度 2 ，并且原数组 nums 的前两个元素被修改为 1, 2。

不需要考虑数组中超出新长度后面的元素。 

\```

**示例 2：**



\```

输入：nums = [0,0,1,1,1,2,2,3,3,4] 

输出：5, nums = [0,1,2,3,4] 

解释：函数应该返回新的长度 5 ， 并且原数组 nums 的前五个元素被修改为 0, 1, 2, 3, 4 0。

不需要考虑数组中超出新长度后面的元素。

\```



**提示：**



\-  0 <= nums.length <= 3 * 10<SUP>4</SUP>

\-  -10<SUP>4</SUP> <= nums[i] <= 10<SUP>4</SUP>

\-  `nums` 已按升序排列



# 2. 解法一：使用双指针

定义两个指针 `fast` 和 `slow` 分别为快指针和慢指针，快指针表示遍历数组到达的下标位置，慢指针表示下一个不同元素要填入的下标位置，初始时slow指向0，fast指向1，fast向后遍历，判断是否等于slow，如果相等就删除该元素，不相等将fast赋值给slow,继续遍历。

\```javascript

/**

 \* @param {number[]} nums

 \* @return {number}

 */

 var removeDuplicates = function(nums) {

 let slow = 0

 let fast = 1

 while(fast < nums.length) {

  if(nums[slow] === nums[fast]) {

   nums.splice(fast, 1)

  } else {

   slow = fast++

  }

 }

 return nums.length

};

\```



![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d14f107825da439b8117581f4fd67739~tplv-k3u1fbpfcp-watermark.image?)

额，看了一下效率惨不忍睹...审题有误,看了答案后其实是不需要删除数组重复的元素的，将重复的数据往后移就好了。



# 3. 解法二：双指针优化

定义两个指针 `fast` 和 `slow` 分别为快指针和慢指针，快指针表示遍历数组到达的下标位置，慢指针表示下一个不同元素要填入的下标位置，初始时slow指向0，fast指向1，fast向后遍历，判断是否等于slow，如果不等于就赋值给slow，slow加1。最后返回slow + 1。

\```javascript

/**

 \* @param {number[]} nums

 \* @return {number}

 */

/**

 \* @param {number[]} nums

 \* @return {number}

 */

var removeDuplicates = function(nums) {

 let slow = 0

 let fast = 1

 const length = nums.length

 if(length === 0) {

  return 0

 }

 while(fast < length) {

  if(nums[slow] !== nums[fast]) {

   nums[++slow] = nums[fast]

  }

  fast++

 }

 return slow + 1

};

\```



![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7a979fa211b34cc49fba34c0ffad1144~tplv-k3u1fbpfcp-watermark.image?)



现在时空复杂度就好多啦~ 