罗马数字包含以下七种字符: `I`， `V`， `X`， `L`，`C`，`D` 和 `M`。

<pre><strong>字符</strong>          <strong>数值</strong>
I             1
V             5
X             10
L             50
C             100
D             500
M             1000</pre>

例如， 罗马数字 `2` 写做 `II` ，即为两个并列的 1 。`12` 写做 `XII` ，即为 `X` + `II` 。 `27` 写做  `XXVII`, 即为 `XX` + `V` + `II` 。

通常情况下，罗马数字中小的数字在大的数字的右边。但也存在特例，例如 4 不写做 `IIII`，而是 `IV`。数字 1 在数字 5 的左边，所表示的数等于大数 5 减小数 1 得到的数值 4 。同样地，数字 9 表示为 `IX`。这个特殊的规则只适用于以下六种情况：

* `I` 可以放在 `V` (5) 和 `X` (10) 的左边，来表示 4 和 9。
* `X` 可以放在 `L` (50) 和 `C` (100) 的左边，来表示 40 和 90。
* `C` 可以放在 `D` (500) 和 `M` (1000) 的左边，来表示 400 和 900。

给定一个罗马数字，将其转换成整数。

**示例 1:**

<pre><strong>输入:</strong> s = "III"
<strong>输出:</strong> 3</pre>

**示例 2:**

<pre><strong>输入:</strong> s = "IV"
<strong>输出:</strong> 4</pre>

**示例 3:**

<pre><strong>输入:</strong> s = "IX"
<strong>输出:</strong> 9</pre>

**示例 4:**

<pre><strong>输入:</strong> s = "LVIII"
<strong>输出:</strong> 58
<strong>解释:</strong> L = 50, V= 5, III = 3.
</pre>

**示例 5:**

<pre><strong>输入:</strong> s = "MCMXCIV"
<strong>输出:</strong> 1994
<strong>解释:</strong> M = 1000, CM = 900, XC = 90, IV = 4.</pre>

**提示：**

* `1 <= s.length <= 15`
* `s` 仅含字符 `('I', 'V', 'X', 'L', 'C', 'D', 'M')`
* 题目数据保证 `s` 是一个有效的罗马数字，且表示整数在范围 `[1, 3999]` 内
* 题目所给测试用例皆符合罗马数字书写规则，不会出现跨位等情况。
* IL 和 IM 这样的例子并不符合题目要求，49 应该写作 XLIX，999 应该写作 CMXCIX 。
* 关于罗马数字的详尽书写规则，可以参考 [罗马数字 - Mathematics ](https://b2b.partcommunity.com/community/knowledge/zh_CN/detail/10753/%E7%BD%97%E9%A9%AC%E6%95%B0%E5%AD%97#knowledge_article)。
