s

本片文章旨在熟悉typescript的语法

## 1. 使用ts-node运行typescript代码

1. 安装ts-node

```
npm install ts-node -g
```

2. 另外ts-node需要依赖 tslib 和 @types/node 两个包：

```
npm install tslib @types/node -g
```

3. 现在就可以直接通过 ts-node 来运行TypeScript的代码

```
ts-node demo.ts
```



## 2. Typescript数据类型

### 2.1 变量的定义

var/let/const 标识符: 数据类型 = 赋值



### 2.2 javascript原有的类型

#### 2.2.1 number类型

```typescript
// 声明一个数字类型的变量 number
let num1: number = 100;
let num2: number = 0b100; // 二进制
let num3: number = 0o100; // 八进制
let num4: number = 0x100; // 十六进制
```



#### 2.2.2 boolean类型

```typescript
// 声明一个布尔类型的变量 boolean
let bool:boolean = true 
```



#### 2.2.3 string类型

```typescript
// 声明一个字符串类型的变量 string
let message: string = "hello typescript"; 
```



#### 2.2.4 null和undefined类型

```typescript
let n: null = null
let u: undefined = undefined
```



#### 2.2.5 Array类型

```typescript
// 声明数组类型 Array
let arr: Array<number> = [1, 2, 3]; // 方式一
let arr1: number[] = [1, 3, 4]; // 方式二
```



#### 2.2.6 Object类型

```typescript
// 声明一个对象类型 object
let obj: object = { name: "coder" }; // 但从obj中不能设置和获取属性 编译的时候就会提示object中没有该属性

// obj1对象包含
// 一个string类型的name属性
// 一个number类型的age属性
// 一个可选的string类型的phone属性 ?：表示可选
const obj1: {name: string, age:number, phone?: string} = {
  name: 'coder',
  age: 22
}
```



#### 2.2.7 Symbol类型

```typescript
let name: symbol = Symbol("coder");
```



#### 2.2.8 函数类型

1. 给参数加上类型

2. 给返回值加上类型 (开发中通常可以不加返回值类型，因为会自动推导)

   ```typescript
   function foo(num1: number, num2: number):void {
   	console.log(num1, num2)
   }
   ```

- 在上下文中的函数，可以不添加类型注解

  ```typescript
  const names = ['zhangsan', 'lisi', 'wangwu']
  // forEach中函数参数可以不写类型，因为根据上下文能推断出是string类型
  names.forEach(item => {
    conosle.log(item)
  })
  ```
  
-  详细写法

  ```typescript
  // 下面参数的名字num1 和num2 是必写的
  const add: (num1: number, num2: number) => number = (a1: number, a2: number) => {
    return a1 + a2;
  };
  ```

  



### 2.3 typescript中新增的类型

#### 2.3.1 any类型

```typescript
let messgae:any = 'hello typescript'
messgae = 1
messgae = true
```

- 一个变量在无法确定类型并且可能它会发生一些变化的时候，可以使用any类型
- any类型有点像一种讨巧的TypeScript手段
  - 可以对any类型的变量进行任何的操作，包括获取不存在的属性、方法；
  - 可以给一个any类型的变量赋值任何的值，比如数字、字符串的值；

#### 2.3.2 unknown类型

unknown是TypeScript中比较特殊的一种类型，它用于描述类型不确定的变量。

```typescript
let messgae:unknown = 'hello'
```



- unknown和any类型的区别

  - any类型：可以理解为任意类型，它能给任意类型赋值
- unknown类型：可以理解为不确定的类型，它只能赋值给any和unknown类型



#### 2.3.3 void类型

void通常用来指定一个函数是没有返回值的，那么它的返回值就是void类型：

可以将null和undefined赋值给void类型，也就是函数可以返回null或者undefined

```typescript
function foo() {
	console.log(123)
}
```

这个函数没有写任何类型，那么它默认返回值的类型就是void的，也可以显示的来指定返回

```typescript
function foo(): void {
	console.log(123)
}
```

#### 2.3.4 联合类型

```
// 表示foo既可以是string也可以是number
let foo: string | number = '123'
foo = 123
```

#### 2.3.5 交叉类型

```typescript
// 表示foo既是string也是number 因为不可能有既是string也是number的类型 所以foo其实是一个never类型
let foo: string | number
```



#### 2.3.6 never类型

never 表示永远不会发生值的类型，比如一个函数

```typescript
// 1. 函数抛出一个异常 永远不会有返回值
function foo():never {
	throw new Error()
}

// 2. 函数死循环永远不会有返回值
function foo1():never {
  while(true) {
    cosnole.log(123)
  }
}

// 3. 变量check是一个never类型永远不会有值 而在函数中当message是boolean类型时 会给check赋值
function foo2(messgae: string | number | boolean) {
  switch (typeof messgae) {
    case "string":
      console.log(123);
      break;
    case "number":
        console.log(123);
        break;
    default:
      const check: never = messgae; // × 不能将类型“boolean”分配给类型“never”
  }
}

```



#### 2.3.7 tuple元组类型

- 多种元素的组合

```typescript
// 可以确定info数组第一个变量是string类型化，第二个变量是number类型
const info: [string, number] = ["string", 123]
```

应用场景

- React中useState

```typescript
// <T>是泛型看不懂先不管 主要先看函数返回的是一个元组类型[T, (newState: T) => void]
function useState<T>(state: T): [T, (newState: T) => void] {
  let currentState = state
  
  const changeState = (newState: T) => {
    currentState = newState
  }

  return [currentState, changeState]
}
```

## 3. Typescript类型补充

### 3.1 类型别名

- type用于定义类型别名

```typescript
type IDType = string | number | boolean
let id: IDType = '123'
id = 123
id = true
```

### 3.2 类型断言as

- 有时候TypeScript无法获取具体的类型信息，就可能需要使用类型断言（Type Assertions）。
  - 比如通过 document.getElementById，TypeScript只知道该函数会返回 HTMLElement ，但并不知道它具体的类型

  ```typescript
  const el = document.getElementById("img") as HTMLImageElement; // 默认拿到的是HTMLElement,转换成具体的HTMLImageElement类型
  el.src = "url地址";
  ```

- TypeScript只允许类型断言转换为 更具体 或者 不太具体 的类型版本，此规则可防止不可能的强制转换

  ```
  const num:number = 1123
  num as string // × 类型 "number" 到类型 "string" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。
  ```

  

### 3.3 **非空类型断言!**

- 下面的代码时，在执行ts的编译阶段会报错：

  - 这是因为传入的message有可能是为undefined的，这个时候是不能执行方法的；

```typescript
function foo(message?: string) {
	console.log(message.length);
}

foo("123");
```

- 这个时候可以使用非空类型断言
  - 非空断言使用的是 ! ，表示可以确定某个标识符是有值的，跳过ts在编译阶段对它的检测；

```typescript
function foo(message?: string) {
  console.log(message?.length);
}

foo("123");
```



### 3.4 可选链

- 可选链事实上并不是TypeScript独有的特性，它是ES11（ES2020）中增加的特性
  - 可选链使用可选链操作符 ?、
  - 它的作用是当对象的属性不存在时，会短路，直接返回undefined，如果存在，那么才会继续执行； 
  - 虽然可选链操作是ECMAScript提出的特性，但是和TypeScript一起使用更版本；

```typescript
type Person = {
  friend?: {
    name?: string;
    age: number;
  };
};
const obj: Person = {};

// console.log(obj.friend.name); // × obj.friend 是undefined 在undefined去name报错
console.log(obj.friend?.name) // undefined
```



### 3.5 ?? 和 !!

- n !!操作符：将一个其他类型转换成boolean类型；
- ??操作符：ES11增加的新特性, 空值合并操作符（??）是一个逻辑操作符，当操作符的左侧是 null 或者 undefined 时，返回其右侧操作数，则返回左侧操作数；

**?? 和 ||的区别：||是当左侧能转换成null 或者 undefined 时返回其右侧操作数**

```typescript
const foo = 0 || 1
const foo1 = 0 ?? 1
console.log(foo) // 1
console.log(foo1) // 0
```



### 3.6 字面量类型

```typescript
const message: 'hello' = 'hello'
```

默认情况下这么做是没有太大的意义的，但是我们可以将多个类型联合在一起；

```typescript
type Alignment = 'right' | 'left' | 'center'
const align: Alignment = 'right'
```



### 3.7 字面量推理

```typescript
const info = {
  name: 'coder',
  sex: 'male'
}

function readInfo(name: string, sex: 'male' | 'female') {
  console.log(name, sex)
}

readInfo(info.name, info.sex) // × 报错 是因为对象再进行字面量推理的时候，info其实是一个 {name: string, sex: string}，类型“string”的参数不能赋给类型“"male" | "female"”的参数。
```

解决办法

```typescript
// 方式一
readInfo(info.name, info.sex as 'male')
```

```typescript
// 方式二
const info = {
  name: 'coder',
  sex: 'male'
} as const
/*
这时候就会解析成
const info: {
  readonly name: "coder";
  readonly sex: "male";
}
*/
```

```typescript
// 方式三
type Person = {
  name: string,
  sex: 'male' | 'female'
}
const info: Person = {
  name: 'coder',
  sex: 'male'
}

function readInfo(name: string, sex: 'male' | 'female') {
  console.log(name, sex)
}

readInfo(info.name, info.sex)
```

### 3.8 类型缩小

类型缩小Type Narrowing：在给定的执行路径中，我们可以缩小比声明时更小的类型，这个过程称之为缩小

常见的类型缩小

1. typeof

   ```typescript
   type IDType = string | number
   
   let id:IDType 
   
   console.log(id.length) // × 类型“IDType”上不存在属性“length”。 类型“number”上不存在属性“length”
   if(typeof id === 'string') {
     console.log(id.length) // 因为已经确定id是string类型了，所以可以直接调用string的属性和方法
   }
   ```

   类似的还有 **平等缩小 (===、!==)**、**instanceof**、**in** 等等、、、

   

### 3.9 this的类型推导

 - 明确的类型 默认推导
  - 下面的代码是可以正常运行的，也就是TypeScript在编译时，认为我们的this是可以正确去使用的：
     - TypeScript认为函数 eating有一个对应的this的外部对象 info，所以在使用时，就会把this当做该对象。

   ```typescript
   const info = {
     name: "coder",
     eating() {
       console.log(this.name);
     },
   };
   
info.eating(); // coder
   ```

   - 不明确的类型

   ```typescript
   function eating() {
     console.log(this.name)
   }
   
   const info = {
     name: "coder",
     eating
   };
   
info.eating(); //× 运行报错
   ```

   	- 解决办法：指定类型

   ```typescript
   function eating(this: { name: string }) {
     console.log(this.name)
   }
   
   const info = {
     name: "coder",
     eating
   };
   
   info.eating(); 
eating.apply(info)
   ```

### 3.10 函数的重载

```typescript
function add (num1:number| string, num2:number|string) {
  return num1 + num2 // × 运算符“+”不能应用于类型“string | number”和“string | number”
}
```

- 如果希望可以对字符串和数字类型进行相加，可以用函数的重载

```typescript
function add (num1:string, num2: string) : number
function add (num1:number, num2: number) : number
function add (num1:number, num2: string) : number
function add (num1:string, num2: number) : number

function add (num1:any, num2:any): any {
  return num1 + num2
}

add(10, 20) // 执行了第2行函数定义
add(10, '20') // 执行了第3行函数定义
```



## 4. Typescript中的类

### 4.1 类的定义

- 使用class关键字来定义一个类；
- 声明一些类的属性：在类的内部声明类的属性以及对应的类型
  - 如果类型没有声明，那么它们默认是any的；
  - 也可以给属性设置初始化值；
  - 在默认的strictPropertyInitialization模式下面属性是必须初始化的，如果没有初始化，那么编译时就会报错；如果想要不初始化，可以使用 name!: string语法
- 类可以有自己的构造函数constructor，当我们通过new关键字创建一个实例时，构造函数会被调用；
  - 构造函数不需要返回任何值，默认返回当前创建出来的实例；
- 类中可以有自己的函数，定义的函数称之为方法；

```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  eating() {
    console.log(this.name + " is eating");
  }
}

const p = new Person("coder", 22);
p.eating();

```

### 4.2 类的继承

- 面向对象的其中一大特性就是继承，继承不仅仅可以减少代码量，也是多态的使用前提
- 使用extends关键字来实现继承，子类中使用super来访问父类

```typescript
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  eating() {
    console.log(this.name + " is eating");
  }
}

class Student extends Person {
  sno: string;
  constructor(name: string, age: number, sno: string) {
    super(name, age);
    this.sno = sno;
  }

  studying() {
    console.log("学号是" + this.sno + "的学生正在学习");
  }
}
const s = new Student("yjw", 22, "001");
s.eating();
s.studying();

```

- Student类可以有自己的属性和方法，并且会继承Person的属性和方法；

- 在构造函数中，通过super来调用父类的构造方法，对父类中的属性进行初始化；

### 4.3 **类的成员修饰符**

- 在TypeScript中，类的属性和方法支持三种修饰符： public、private、protected
  - public 修饰的是在任何地方可见、公有的属性或方法，默认编写的属性就是public的；
  - private 修饰的是仅在同一类中可见、私有的属性或方法；
  - protected 修饰的是仅在类自身及子类中可见、受保护的属性或方法；
- public是默认的修饰符，也是可以直接访问的，这里来演示一下protected和private。

```typescript
class Person {
  private name: string;
  protected age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  eating() {
    console.log(this.name, this.age);
  }
}

class Student extends Person {
  sno: string;
  constructor(name: string, age: number, sno: string) {
    super(name, age);
    this.sno = sno;
  }
}
const p = new Person("coder", 22);
// console.log(p.name); // × 编译错误 属性“name”为私有属性，只能在类“Person”中访问。
// console.log(p.age);  // × 编译错误 属性“age”受保护，只能在类“Person”及其子类中访问。
p.eating(); // √
```

### 4.4 **只读属性readonly**

- 如果有一个属性不希望外界可以任意的修改，只希望确定值后直接使用，那么可以使用readonly：

```typescript
class Person {
  readonly name:string
  constructor(name: string) {
    this.name = name
  }
}

const p = new Person('coder')

p.name = 'coderyjw' // × 无法分配到 "name" ，因为它是只读属性
```

### 4.5 **getters/setters**

在前面一些私有属性我们是不能直接访问的，或者某些属性我们想要监听它的获取(getter)和设置(setter)的过程，

这个时候我们可以使用存取器。

```typescript
class Person {
  private _name: string;

  constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }
  set name(newName) {
    this._name = newName;
  }
}

const p = new Person("coder");

p.name = 'coderyjw'
console.log(p.name);

```

### 4.6 static 静态成员

用于定义类级别的成员和方法。

```typescript
class Person {
  static time: string = "2021-12-26";
}

console.log(Person.time);

```

### 4.7 抽象类

```typescript
// abstract定义的类叫抽象类
// 抽象类不能被实例化，抽象类
// 抽象类中必须要有抽象方法
abstract class Shape {
  // abstract定义的函数叫抽象函数
  // 抽象方法，必须存在于抽象类中；
  // 抽象方法必须被子类实现，否则该类必须是一个抽象类；
  abstract getArea(): number; 
}

class Circle extends Shape {
  r: number;
  constructor(r: number) {
    super();
    this.r = r;
  }
  getArea(): number {
    return this.r * this.r * Math.PI;
  }
}

const c = new Circle(5);
console.log(c.getArea());
```

## 5. Typescript中的接口

#### 5.1 接口的声明

```typescript
interface Person {
	name: string,
	age: number
}
```

#### 5.2 可选属性

```typescript
interface Person {
	name: string,
	age?: number
}
```

#### 5.3 只读属性

```typescript
interface Person {
	readonly name: string,
	age: number
}
```

#### 5.4 索引类型

```typescript
interface INdexLanguage  {
  [index: number]: string
}

const Language: INdexLanguage = {
  '0': 'javascript',
  '1': 'java',
  '2': 'c',
}
```

#### 5.5 函数类型

```typescript
interface CalcFn {
  (n1:number, n2: number): number
}

const add: CalcFn = (n1:number, n2:number) => {
  return n1 + n2
}
```

#### 5.6 接口的继承

```typescript
interface Person {
  name: string
}

interface Animal {
  running: () => void
}

// 多继承
interface Student extends Person, Animal {
  sno: number
}
```

#### 5.7 接口的实现

- 接口定义后，也是可以被类实现，通过implements关键字实现接口
  - 一个类可以实现多个接口，并且必须实现接口中对应的属性和方法；
  - 如果被一个类实现，那么在之后需要传入接口的地方，都可以将这个类传入；

```typescript
interface Person {
  name: string;
}

class Student implements Person {
  name: string;
  sno: string;

  constructor(name: string, sno: string) {
    this.name = name;
    this.sno = sno;
  }
}

function study(p: Person) {
  console.log(p);
}

const s = new Student("coder", "001");
study(s);
```

#### 5.8 interface和type的区别

- 如果是定义非对象类型，通常推荐使用type，比如Direction、Alignment、一些Function；
- 如果是定义对象类型，那么他们是有区别的：
  - interface 可以重复的对某个接口来定义属性和方法；
  - 而type定义的是别名，别名是不能重复的；

1. interface可以重复定义同一个接口

```typescript
interface IPerson {
  name: string;
}

interface IPerson {
  name: string;
  age: number;
}

class Person implements IPerson {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
```

2. type不能重复定义同一个别名

```
type Person = {
  name: string
}

// × 标识符“Person”重复。
type Person = {
  name: string
  age: number
}
```

## 6. 枚举类型

- 枚举类型是为数不多的TypeScript特性有的特性之一：
  - 枚举其实就是将一组可能出现的值，一个个列举出来，定义在一个类型中，这个类型就是枚举类型；
  - 枚举允许开发者定义一组命名常量，常量可以是数字、字符串类型；

```typescript
enum  Direction {
  LEFT,
  RIGHT,
  TOP,
  BOTTOM
}
```

枚举类型默认是有值的

上面的枚举值可以看做

```typescript
enum  Direction {
  LEFT = 0,
  RIGHT = 1,
  TOP = 2,
  BOTTOM = 3
}
```

当然也可以手动赋其他值

## 7. 泛型

### 7.1  认识泛型

- 泛型：将类型进行参数化
  - 需要在这里使用一种特性的变量 - 类型变量（type variable），它作用于类型，而不是值

```typescript
function foo<T>(arg: T): T { 
  return arg
}
```

上面的函数**可以使用两种方式来调用它：** 

- 方式一：通过 <类型> 的方式将类型传递给函数
- 通过类型推到，自动推到出我们传入变量的类型

```typescript
// 方式一
console.log(foo<string>('hello'))
console.log(foo<number>(1))

// 方式二
console.log(foo('hello'))
console.log(foo(1))
```

### 7.2 基本补充

可以传入多个类型：

```
function foo<T,K>(a1: T, a2: K) {

}
```

- 平时在开发中我们可能会看到一些常用的名称：
  - T：Type的缩写，类型
  - K、V：key和value的缩写，键值对
  - E：Element的缩写，元素
  - O：Object的缩写，对象

### 7.3 **泛型接口**

```typescript
interface IPerson<T> {
	name: T,
  friends: T[]
	foo: (num: T) => void
}
```

### 7.4 **泛型类**

```typescript
class Person<T> {
	x: T
  y: T

  constructor(x: T, y: T) {
    console.log(x, y)
  }
}
```

## 7.5 泛型约束

- 有时候我们希望传入的类型有某些共性，但是这些共性可能不是在同一种类型中：
  - 比如string和array都是有length的，或者某些对象也是会有length属性的；
  - 那么只要是拥有length的属性都可以作为我们的参数类型，那么应该如何操作呢？

```typescript
interface ILength {
  length: number;
}

function getLength<T extends ILength>(l: T) {
  console.log(l.length);
}

getLength("123");
getLength([1, 2, 3]);

```

