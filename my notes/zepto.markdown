# zepto

## 1. overall

整体结构
```javascript

(function(global, factory) {                  //IIFE 匿名闭包，不暴露内部方法和变量
    if (typeof define === 'function' && define.amd)  //UMD 兼容了AMD和CommonJS
        define(function() { return factory(global) })
    else
        factory(global)
}(window, function(window) {
    //main
    var Zepto = (function() {
        ...
    })()

    window.Zepto = Zepto
    window.$ === undefined && (window.$ = Zepto)  //如果 $ 没有定义，也将 $ 赋值为 zepto 
}))
```

**zepto 的核心是一个闭包，加载完毕后立即执行。然后暴露给全局变量 zepto**
[关于UMD、AMD、CMD模块写法](http://www.jianshu.com/p/bd4585b737d7)

## 2. core

```javascript
var zepto = {}, $

function Z(doms) {
  var len = doms.length 
  for (var i = 0; i < len; i++) {
    this[i] = doms[i]
  }
  this.length = doms.length
}

zepto.Z = function(doms) {
  return new Z(doms)
}

zepto.init = function(doms) {
  var doms = ['domObj1','domObj2','domObj3']
  return zepto.Z(doms)
}

$ = function() {
  return zepto.init()
}

$.fn = {
  constructor: zepto.Z,
  method: function() {
    return this
  }
}

zepto.Z.prototype = Z.prototype = $.fn //z的实例继承$.fn的方法

return $
```

$ 其实是一个函数，同时在 $ 身上又挂了很多属性和方法（这里体现在 $.fn 身上）,可以通过添加方法作为 $.fn 的属性来写插件。

1. $ 调用了 zepto.init() 方法
2. 在 init 方法中，会获取到 dom 元素集合
3. 然后将集合交由 zepto.Z() 方法处理
4. 而 zepto.Z 方法返回的是函数 Z 的一个实例
5. 最后将zepto.z的原型重置为$.fn，$.fn的constructor调用zepto.z

**zepto模块**
[img1](static/img/zepto/1.jpg)

#### 2.1. $

首先来看下著名的$
```javascript
$(selector, [context])   ⇒ collection
$(<Zepto collection>)   ⇒ same collection
$(<DOM nodes>)   ⇒ collection
$(htmlString)   ⇒ collection
$(htmlString, attributes)   ⇒ collection v1.0+
Zepto(function($){ ... })
//通过执行css选择器，包装dom节点，或者通过一个html字符串创建多个元素 来创建一个Zepto集合对象。
//实现：
$('div')  //=> 所有页面中得div元素
$('#foo') //=> ID 为 "foo" 的元素

// 创建元素:
$("<p>Hello</p>") //=> 新的p元素
// 创建带有属性的元素:
$("<p />", { text:"Hello", id:"greeting", css:{color:'darkblue'} })
//=> <p id=greeting style="color:darkblue">Hello</p>

// 当页面ready的时候，执行回调:
Zepto(function($){
  alert('Ready to Zepto!')
})
```

源码实现：

```javascript
$ = function(selector, context) {
    return zepto.init(selector, context);
};
zepto.init = function(selector, context) {
        var dom;
        // If nothing given, return an empty Zepto collection
        if (!selector)
            return zepto.Z();

        else if ((typeof selector) == "string") { ... }
        else if (isFunction(selector))
            return $(document).ready(selector);

        else if (zepto.isZ(selector))
            return selector;

        else { ... }
        // create a new Zepto collection from the nodes found
        return zepto.Z(dom, selector);
      }
```

1. $(selector)
2. zepto.init(selector) 
    判断过程
    1. string
    2. 为function
        页面加载完成后执行
    3. 为z对象
        直接返回原对象
    4. 其他
3. 调用 z 函数
    zepto.Z(dom, selector) ，init 的最后，将收集到的 dom 集合和对应的 selector 传入 Z 函数，返回 Z 对象。

#### compact

```javascript
function compact(array) {
  return filter.call(array, function(item) {
    return item != null
  })
}
```

null 和 undefined 都会先转换成 false 再进行比较。


