## webpack经验总结
#### [package](http://javascript.ruanyifeng.com/nodejs/packagejson.html)
  * scripts：指定了运行脚本命令的npm命令行缩写
    - 如： npm run start
  * dependencies：项目运行所依赖的模块
  * devDependencies：项目开发时的依赖
  * npm install node-sass --save-dev (--save参数表示将该模块写入dependencies属性，--save-dev表示将该模块写入devDependencies属性)

## vue经验总结
#### 命名
  * props
    - 普通变量（字符串如：info）
    - 事件（命名：短线连接如：on-vote，使用：驼峰如onVote)*非必需，便于分别*

#### click
  * 普通元素： @click
  * 组件元素： @click.native

#### slot
  * 非必要元素
  * 可自定义

#### router
  * router-link
    - tag   指定渲染标签类型
    - active-class  激活时样式
  * router-reload
    - 模仿reload

    ```js
    $router.go({
        path: $router.path,
        query: {
            t: + new Date()
        }
    })
    ```


#### v-if && v-for 共存
  * 先做v-for的loop,随后对每一个loop再应用v-if判断

#### vue beforeDestroy
  * 定时器
  * 对dom初始化的插件
  * watch（监听）
    vm.$watch 返回一个取消观察函数，用来停止触发回调

    ```js
    vm.$watch('a.b.c', function (newVal, oldVal) {
       // 做点什么
    })
     // 函数
    vm.$watch(
      function () {
         return this.a + this.b
      },
      function (newVal, oldVal) {
         // 做点什么
      }
    )
    //vm.$watch 返回一个取消观察函数，用来停止触发回调：
    var unwatch = vm.$watch('a', cb)
    // 之后取消观察
    unwatch()
    ```


## javascript 经验总结

#### js命名
  * function语句
    - 用　'var foo = function (){}' 代替 'function foo (){}'
     **解析时第二种会变量提升，违背了函数应该先定义后使用的要求**
  * 创建对象
    ```js
    Object.beget = function (o) {
    　　　　var F = function (o) {};
    　　　　F.prototype = o ;
    　　　　return new F;
    　　};
    //创建对象时就利用这个函数，对原型对象进行操作：
    　　var Cat = {
    　　　　name:'',
    　　　　saying:'meow'
    　　};
    　　var myCat = Object.beget(Cat);
    // 对象生成后，可以自行对相关属性进行赋值：
    　　myCat.name = 'mimi';
    ```

#### js传参
  * function (opt)
    - opt.handleClick && opt.handleClick()

#### ES6
  * this
    - 箭头函数中，没有this。如果你在箭头函数中使用了this，那么该this一定就是外层的this
    - 箭头函数的this绑定看的是this所在的函数定义在哪个对象下，绑定到哪个对象则this就指向哪个对象
    - 如果有对象嵌套的情况，则this绑定到最近的一层对象上
    - 非箭头函数的情况下还是要看宿主对象是谁，如果没有被对象调用，函数体中的this就绑定的window上
    ```javascript
    var obj1={
      num:4,
      fn:function(){
          var f=() => {
              console.log(this); //object,f()定义在obj1对象中，this就指向obj1,这就是箭头函数this指向的关键  
              setTimeout(function() {
                  console.log(this);//window，非箭头函数的情况下还是要看宿主对象是谁，如果没有被对象调用，函数体中的this就绑定的window上  
              });
          }
          f();
      }
    }
    obj1.fn();
    ```
  * [ES6：export default 和 export 区别](http://www.jianshu.com/p/edaf43e9384f)

#### 箭头函数与react
  * [为什么在 React 的 Render 中使用箭头函数和 bind 会造成问题](https://zhuanlan.zhihu.com/p/29266705?utm_source=com.tencent.wework&utm_medium=social)
  *性能问题：是因为每次父元素重新 render 后，传给子元素的是新的函数*

#### fetch
  * [深入浅出Fetch API](http://web.jobbole.com/84924/)
  * [在 JS 中使用 fetch 更加高效地进行网络请求](http://blog.parryqiu.com/2016/03/02/using_fetch_in_nodejs/)

#### asyn 函数
  * [asyn 函数的含义和用法](http://www.ruanyifeng.com/blog/2015/05/async.html)

#### ES6 解构
  * window.location

  ```js
  var { protocol, host, pathname, search } = window.location
  ```

# css 经验总结
#### 动画
  * [css滤镜（css blur）](http://www.cnblogs.com/nzbin/p/6380679.html)


## 高效开发
## 工具设置
#### webpack
    * [引入sass 全局变量，minxin，function等](https://zhuanlan.zhihu.com/p/28159877)

## 常用库
  * [图标](http://fontawesome.dashgame.com/)