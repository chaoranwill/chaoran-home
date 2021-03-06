## 1. 作用域

#### 1.1. 编译原理

尽管通常将 JavaScript 归类为“动态” 或“解释执行” 语言， 但事实上它是一门编译语言。
程序中的一段源代码在执行之前会经历三个步骤， 统称为“编译”

1. 分词/词法分析（Tokenizing/Lexing）
    * 这个过程会将由字符组成的字符串分解成（对编程语言来说） 有意义的代码块， 这些代
码块被称为词法单元（token）。 例如， 考虑程序 var a = 2;。 这段程序通常会被分解成
为下面这些词法单元： var、 a、 =、 2 、 ;。

2. 解析/语法分析（Parsing）
    * 这个过程是将词法单元流（数组） 转换成一个由元素逐级嵌套所组成的代表了程序语法
结构的树。 这个树被称为“抽象语法树”（Abstract Syntax Tree， AST）。
    ![pic](./static/img/1.jpg)

3. 代码生成
    * 将 AST 转换为可执行代码的过程称被称为代码生成。 

#### 1.2. 作用域嵌套

当一个块或函数嵌套在另一个块或函数中时， 就发生了作用域的嵌套。 因此， 在当前作用
域中无法找到某个变量时， 引擎就会在外层嵌套的作用域中继续查找， 直到找到该变量，
或抵达最外层的作用域（也就是全局作用域） 为止。
将作用域处理的过程可视化，如下面的建筑：
![pic2](./static/img/2.png)

**作用域是一套规则， 用于确定在何处以及如何查找变量（标识符）。**

## 2. 词法作用域

作用域共有两种主要的工作模型：

* 词法作用域（重点讨论）
* 动态作用域（如bash脚本，perl中的一些模式）

#### 2.1. 词法阶段

> 词法化的过程会对源代码中的字符进行检查，如果是有状态的解析过程，还会赋予单词语义——名称来历

**词法作用域是由你在写代码时将变量和块作用域写在哪里来决定的**
如：

```js
function foo(a) {
    var b = a * 2;
    function bar(c) {
        console.log( a, b, c );
    }
    bar( b * 3 );
}

foo( 2 ); // 2, 4, 12
```

可以将以上代码想象成几个逐级包含的气泡
![context](./static/img/3.jpg)
① 包含着整个全局作用域， 其中只有一个标识符： foo。
② 包含着 foo 所创建的作用域， 其中有三个标识符： a、 bar 和 b。
③ 包含着 bar 所创建的作用域， 其中只有一个标识符： c。
**作用域气泡由其对应的作用域块代码写在哪里决定， 它们是逐级包含的。**

**查找**
作用域气泡的结构和互相之间的位置关系给引擎提供了足够的位置信息，作用域查找会在找到第一个匹配的标识符时停止

全局变量会自动成为全局对象（比如浏览器中的window对象）的属性，因此可以不直接通过全局对象的词法名称，而是间接地通过对全局对象属性的引用来对其进行访问。
*window.a*通过这种技术可以访问那些被同名变量所遮蔽的全局变量。 但非全局的变量
如果被遮蔽了， 无论如何都无法被访问到。

**无论函数在哪里被调用，也无论它如何被调用，它的词法作用域都只由函数被声明时所处的位置决定。**
**词法作用域查找只会查找一级标识符，比如a、b和c。如果代码中引用了foo.bar.baz，词法作用域查找只会试图查找 foo 标识符，找到这个变量后， 对象属性访问规则会分别接管对 bar 和 baz 属性的访问**

#### 2.2. 欺骗词法
JavaScript 中有两个机制可以“欺骗”词法作用域：eval(..)和with。前者可以对一段包
含一个或多个声明的“代码”字符串进行演算，并借此来修改已经存在的词法作用域（在
运行时）。后者本质上是通过将一个对象的引用当作作用域来处理，将对象的属性当作作
用域中的标识符来处理，从而创建了一个新的词法作用域（同样是在运行时）。


## 3. 函数作用域和块作用域

> 究竟是什么生成了一个新的气泡？只有函数会生成新的气泡吗？JavaScript中的其他结构能生成作用域气泡吗？


#### 3.1. 隐藏内部实现

##### 3.1.1. 最小授权|最小暴露原则

> 指在软件设计中，应该最小限度地暴露必要内容，而将其他内容都“隐藏”起来，比如某个模块或对象的API设计。——可延伸到如何选择作用域来包含变量和函数

如：

```js
function doSomething(a) {
    b = a + doSomethingElse(a * 2);
    console.log(b * 3);
}

function doSomethingElse(a) {
    return a - 1;
}
var b;
doSomething(2); // 15

/*在这个代码片段中， 变量 b 和函数 doSomethingElse(..) 应该是 doSomething(..) 内部具体实现的“私有” 内容。 给予外部作用域对 b 和 doSomethingElse(..) 的“访问权限” 不仅没有必要且危险*/
// 更合理
function doSomething(a) {
    function doSomethingElse(a) {
        return a - 1;
    }
    var b;
    b = a + doSomethingElse(a * 2);
    console.log(b * 3);
}
d
oSomething(2); // 15
//设计上将具体内容私有化
```

##### 3.1.2. 规避冲突

1. 全局命名空间
    用变量作为库的命名空间
    *所有需要暴露给外界的功能都会成为这个对象（命名空间）的属性，而不是将自己的标识符暴漏在顶级的词法作用域中*
    如：

```js
var MyReallyCoolLibrary = {
    awesome: "stuff",
    doSomething: function() {
    // ...
    },
    doAnotherThing: function() {
    // ...26
    }
};
```

#### 3.2. 函数作用域

区分函数声明和表达式最简单的方法是看function关键字出现在声明中的位置（不仅仅是一行代码，而是整个声明中的位置）。如果function是声明中的第一个词，那么就是一个函数声明，否则就是一个函数表达式。

**1. 匿名和具名**
    始终给函数表达式命名是一个最佳实践

```js
setTimeout( function timeoutHandler() { // 快看， 我有名字了
    console.log( "I waited 1 second!" );
}, 1000 );
```

**2. 立即执行函数表达式**

```js
/*第一种*/
var a = 2;
(function foo() {
    var a = 3;
    console.log( a ); // 3
})();
console.log( a ); // 2

/* 第二种形式*/
(function foo(){ .. })()

/*进阶*/
/*将 window 对象的引用传递进去， 但将参数命名为 global*/
var a = 2;
(function IIFE( global ) {
    var a = 3;
    console.log( a ); // 3
    console.log( global.a ); // 2
})( window );

console.log( a ); // 2

/*IIFE 还有一种变化的用途是倒置代码的运行顺序， 将需要运行的函数放在第二位， 在 IIFE执行之后当作参数传递进去。*/
var a = 2;
(function IIFE( def ) {
    def( window );
})(function def( global ) {
    var a = 3;
    console.log( a ); // 3
    console.log( global.a ); // 2
});

```

*函数表达式 def 定义在片段的第二部分， 然后当作参数（这个参数也叫作 def） 被传递进
IIFE 函数定义的第一部分中。 最后， 参数 def（也就是传递进去的函数） 被调用， 并将
window 传入当作 global 参数的值。*

**函数不是唯一的作用域单元。块作用域指的是变量和函数不仅可以属于所处的作用域，也可以属于某个代码块（通常指 { .. } 内部）。**

## 变量提升

> 先有蛋（声明） 后有鸡（赋值）。

*JavaScript 引擎将 var a和 a = 2 当作两个单独的声明， 第一个是编译阶段的任务， 而第二个则是执行阶段的任务。无论作用域中的声明出现在什么地方，都将在代码本身被执行前首先进行处理。可以将这个过程形象地想象成所有的声明（变量和函数） 都会被“移动” 到各自作用域的最顶端， 这个过程被称为提升*

只有声明本身会被提升， 而赋值或其他运行逻辑会留在原地。

#### 函数优先

函数声明和变量声明都会被提升。 但是一个值得注意的细节（这个细节可以出现在有多个
“重复” 声明的代码中） 是 **函数会首先被提升， 然后才是变量。**

## 作用域闭包
> 闭包的创建和使用在你的代码中随处可见。 你缺少的是根据你自己的意愿
来识别、 拥抱和影响闭包的思维环境

#### 什么是闭包

当函数可以记住并访问所在的词法作用域时， 就产生了闭包，即使函数是在当前词法作用
域之外执行。

```js
function foo() {
  var a = 2;

  function bar() {
      console.log(a); // 2
  }
  bar();
}
f
oo();
//基于词法作用域的查找规则， 函数bar() 可以访问外部作用域中的变量 a
function foo() {
  var a = 2;

  function bar() {
      console.log(a);
  }
  return bar;
}
var baz = foo();
baz(); // 2 —— 朋友， 这就是闭包的效果。
```

bar() 显然可以被正常执行。 但是在这个例子中， 它在自己定义的词法作用域以外的地方执行
foo() 执行后垃圾回收器用来释放不再使用的内存空间,闭包的“神奇”之处正是可以阻止这件事情的发生。 事实上内部作用域依然存在,bar() 依然持有对该作用域的引用， 而 **这个引用就叫作闭包。**
常见的闭包：

```js
function wait(message) {
  setTimeout(function timer() {
    console.log(message);
  }, 1000);
}
wait("Hello, closure!");
//timer 具有涵盖 wait(..) 作用域的闭包， 因此还保有对变量 message 的引用。
//wait(..) 执行 1000 毫秒后， 它的内部作用域并不会消失， timer 函数依然保有 wait(..)作用域的闭包。
```

