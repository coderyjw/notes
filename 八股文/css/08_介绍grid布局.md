# 1. 是什么？

网格布局，是一个二位布局，由纵横相交的两组网格线形成的框架性布局结构，能够同时处理行与列
擅长将一个页面划分为几个主要区域，以及定义这些区域的大小、位置、层次等关系

# 2. 属性

- 容器属性

  1. display: grid / inline-grid
  2. grid-template-rows grid-template-columns
  3. grid-row-gap grid-column-gap grid-gap
  4. grid-template-area
  5. grid-auto-flow
  6. justify-items align-items place-items
  7. justify-content align-content place-content

- 项目属性
  1. grid-column-start grid-column-end grid-row-start grid-row-end
  2. grid-area
  3. justify-self align-self place-self

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .container {
        /* width: 200px; */
        display: grid;
        grid-template-rows: 100px 100px 100px;
        grid-template-columns: 100px 100px 100px;
        /* grid-template-columns: repeat(3, 50px); */
        /* grid-template-columns: repeat(3, 50px 100px); */
        /* grid-template-columns: repeat(auto-fill, 100px 150px); */
        /* grid-template-columns: 1fr 1fr; */
        /* grid-template-columns: 150px 1fr 2fr; */
        /* grid-template-columns: 1fr 1fr minmax(100px, 1fr); */
        /* grid-template-columns: 100px auto 100px; */
        /* grid-template-columns: 30% 70%; */
        /* grid-template-columns: repeat(12, 1fr); */

        /* grid-column-gap: 10px; */
        /* grid-row-gap: 10px; */
        /* grid-gap: 10px; */

        /* grid-template-areas:
          "a . c"
          "d . f"
          "g . i"; */

        /* grid-auto-flow: column; */

        /* justify-items: start;
        align-items: stretch; */
        place-items: stretch stretch;

        /* justify-content: center;
        align-content: center; */
        place-content: center center;
      }
      .item {
        font-size: 2em;
        text-align: center;
        border: 1px solid #e5e4e9;
      }

      .item-1 {
        background-color: #ef342a;
      }

      .item-2 {
        background-color: #f68f26;
      }

      .item-3 {
        background-color: #4ba946;
      }

      .item-4 {
        background-color: #0376c2;
      }

      .item-5 {
        background-color: #c077af;
      }

      .item-6 {
        background-color: #f8d29d;
      }

      .item-7 {
        background-color: #b5a87f;
      }

      .item-8 {
        background-color: #d0e4a9;
      }

      .item-9 {
        background-color: #4dc7ec;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item item-1">1</div>
      <div class="item item-2">2</div>
      <div class="item item-3">3</div>
      <div class="item item-4">4</div>
      <div class="item item-5">5</div>
      <div class="item item-6">6</div>
      <div class="item item-7">7</div>
      <div class="item item-8">8</div>
      <div class="item item-9">9</div>
    </div>
  </body>
</html>
```
