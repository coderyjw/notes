给你一个整数 `x` ，如果 `x` 是一个回文整数，返回 `true` ；否则，返回 `false` 。

回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

* 例如，`121` 是回文，而 `123` 不是。

**示例 1：**

<pre><strong>输入：</strong>x = 121
<strong>输出：</strong>true
</pre>

**示例 2：**

<pre><strong>输入：</strong>x = -121
<strong>输出：</strong>false
<strong>解释：</strong>从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
</pre>

**示例 3：**

<pre><strong>输入：</strong>x = 10
<strong>输出：</strong>false
<strong>解释：</strong>从右向左读, 为 01 。因此它不是一个回文数。
</pre>

**提示：**

* `-2<sup>31</sup> <= x <= 2<sup>31</sup> - 1`

 **进阶：** 你能不将整数转为字符串来解决这个问题吗？
