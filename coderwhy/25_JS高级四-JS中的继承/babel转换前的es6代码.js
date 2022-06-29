class Person {
  constructor(name) {
    this.name = name;
  }
  sayHello() {
    console.log("你好，我是", this.name);
  }
}

class Student extends Person {
  constructor(name, sno) {
    super(name);
    this.sno = sno;
  }

  sayHello() {
    super.sayHello();
    console.log("我的学号是:", this.sno);
  }
}

// const stu = new Student("yjw", "001");
// stu.sayHello();
