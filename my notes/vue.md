[TOC]
## 属性与方法
不要在实例属性或者回调函数中（例如,`vm.$watch('a', newVal => this.myMethod())`使用箭头函数。因为箭头函数会绑定父级上下文，所以 `this` 不会按照预期指向 Vue 实例，然后 `this.myMethod` 将是未定义。

## 语法

#### v-  指令是带有v-的特殊属性
  1. v-if 条件渲染
  2. v-show
  2. v-else   (必须在v-if/v-else-if/v-show指令后)
  3. v-else-if  (v-if/v-else-if后)
  4. v-for    (遍历)
  5. v-html   (绑定HTML属性中的值)
  6. v-bind   (响应更新HTML特性，绑定自定义属性，如绑定某个class元素或style)
  7. v-on  (监听指定元素的dom事件)
  8. v-model (内置的双向数据绑定，用在表单控件，绑定的value通常是静态字符串)
  9. v-cloak 关于vuejs页面闪烁{{message}}
  10. v-once  只渲染元素和组件一次，随后的重新渲染,元素/组件及其所有的子节点将被视为静态内容并跳过
  ```html
    <p v-if="seen">超然haha</p>
    <p v-else></p>

    <div v-show="isSeen">超然haha</div>
    <div v-else></div>

    <ul  v-bind:class="{'class1': class1}">
      <li v-for="item in items">{{ item }}</li>
    </ul>

    <button v-on:click="handleClick">click</button>

    <div>
      <p>{{ message }}</p>
      <input v-model="message">
    </div>

    <!-- v-for -->
    <!--  可以通过一个对象的属性来迭代数据 -->
    <li v-for="value in object">
      {{ value }}
    </li>
    <!-- 也可以提供第二个的参数为键名 -->
    <li v-for="(value, key) in object">
      {{ key }} : {{ value }}
    </li>
    <!-- 第三个参数为索引 -->
    <li v-for="(value, key, index) in object">
      {{ index }}. {{ key }} : {{ value }}
    </li>
    <!-- 也可以循环整数 -->
    <li v-for="n in 10">
     {{ n }}
    </li>

    <!-- v-cloak -->
    <!-- 和CSS规则如[v-cloak]{display:none}一起用时，这个指令可以隐藏未编译的Mustache标签直到实例准备完毕 -->
    [v-cloak]{
      display:none;
    }
    <div v-cloak>{{message}}</div>

    <!-- v-once -->
    <!-- 组件 -->
    <my-component v-once :comment="msg"></my-component>
  ```
#### 表达式——提供了JavaScript表达式支持
#### 参数——指令后以冒号声明
```html
  <a v-bind:href="url">超然haha</a>
```
#### 过滤器
```html
<div id="app">
  {{ message | capitalize }}
</div>
    
<script>
new Vue({
  el: '#app',
  data: {
    message: 'runoob'
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
})
</script>
```
#### 缩写
  1. v-bind
  2. v-on
  ```html
  <!-- 完整语法 -->
  <a v-bind:href="url"></a>
  <!-- 缩写 -->
  <a :href="url"></a>

  <!-- 完整语法 -->
  <a v-on:click="doSomething"></a>
  <!-- 缩写 -->
  <a @click="doSomething"></a>
  ```

## 计算属性
#### computed 属性默认只有 getter ，不过在需要时你也可以提供一个 setter 
```javascript
 var vm = new Vue({
  el: '#app',
  data: {
    name: 'Google',
    url: 'http://www.google.com'
  },
  computed: {
    site: {
      // getter
      get: function () {
        return this.name + ' ' + this.url
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.name = names[0]
        this.url = names[names.length - 1]
      }
    }
  }
})
// 调用 setter， vm.name 和 vm.url 也会被对应更新
vm.site = '菜鸟教程 http://www.runoob.com';
document.write('name: ' + vm.name);
document.write('<br>');
document.write('url: ' + vm.url);
```

## 特殊属性
#### key   主要用在 Vue的虚拟DOM算法，在新旧nodes对比时辨识VNodes

  ```html
  <li v-for="item in items" :key="item.id">...</li>
  ```

#### ref   给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上

  ```html
    <!-- vm.$refs.p will be the DOM node -->
  <p ref="p">hello</p>
  <!-- vm.$refs.child will be the child comp instance -->
  <child-comp ref="child"></child-comp>
  ```

#### is  用于动态组件,决定哪个组件被渲染

  ```html
    <!-- 动态组件由 vm 实例的属性值 `componentId` 控制 -->
  <component :is="componentId"></component>
  <!-- 也能够渲染注册过的组件或 prop 传入的组件 -->
  <component :is="$options.components.child"></component>
  ```

#### keep-alive  缓存不活动的组件实例，而不是销毁它们,保留组件状态避免重新渲染

  ```html
  <!-- 基本 -->
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
  ```

#### include && exclude 允许组件有条件的缓存
  

## vue 样式绑定
#### class属性
  * v-bind:class
  ```html
  <div v-bind:class="{ active: isActive }"></div>
  ```
  * v-bind:class 数组绑定
    ```html
    <div v-bind:class="[activeClass, errorClass]"></div>
    ```
#### style(内联样式)
  * v-bind:style 
  ```html
    <div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }">超然haha</div>
  ```
  * v-bind:style (将多个样式绑定到一个元素)
  ```html
  <div v-bind:style="[baseStyles, overridingStyles]">超然haha</div>
  ```
  *当 v-bind:style 使用需要特定前缀的 CSS 属性时，如 transform ，Vue.js 会自动侦测并添加相应的前缀。*

## vue事件处理器
#### v-on
  * 接收方法
  ```html
  <button v-on:click="greet">Greet</button>
  ```
  * 内联js语句
  ```html
  <button v-on:click="say('hi')">Say hi</button>
  ```
  * 事件修饰符
    * .stop    阻止单击事件冒泡
    * .prevent 不再重载页面
    * .capture 使用事件捕获模式
    * .self    只当事件在该元素本身（不是子元素）触发时触发
    * .once    事件只会触发一次
  * 键值修饰符
    * .enter
    * .tab
    * .delete (捕获 “删除” 和 “退格” 键)
    * .esc
    * .space
    * .up
    * .down
    * .left
    * .right
    * .ctrl
    * .alt
    * .shift
    * .meta
  * 鼠标按键修饰符
    * .left
    * .right
    * .middle

## 表单控件绑定
#### 基础用法
  * 文本
  * 复选框
  * 单选按钮
  * 选择列表
  ```html
  <!-- 文本 -->
  <input v-model="message" placeholder="edit me">
  <p>Message is: {{ message }}</p>

  <!-- 复选框 -->
  <input type="checkbox" id="checkbox" v-model="checked">
  <label for="checkbox">{{ checked }}</label>

  <!-- 单选按钮 -->
  <div id="example-4">
    <input type="radio" id="one" value="One" v-model="picked">
    <label for="one">One</label>
    <br>
    <input type="radio" id="two" value="Two" v-model="picked">
    <label for="two">Two</label>
    <br>
    <span>Picked: {{ picked }}</span>
  </div>

  <!-- 选择列表 -->
  <div id="example-5">
    <select v-model="selected">
      <option disabled value="">请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <span>Selected: {{ selected }}</span>
  </div>
  ```

#### 修饰符
  * .lazy    从输入转变为在 change 事件中同步
  * .number  自动将用户的输入值转为 Number 类型
  * .trim    自动过滤用户输入的首尾空格

# 组件间通信
## 父子组件通信(props down && events up)
#### props  （父-->子）

```javascript
Vue.component('child', {
  // 声明 props
  props: ['message'],
  // 就像 data 一样，prop 可以用在模板内
  // 同样也可以在 vm 实例中像“this.message”这样使用
  template: '<span>{{ message }}</span>'
})
```

```html
<child message="hello!"></child>
```

## 子父组件通信
#### on/emit  (子-->父)
*父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件*
**不能用 $on 侦听子组件抛出的事件，而必须在模板里直接用 v-on 绑定**
```html
<button-counter v-on:increment="incrementTotal"></button-counter>
```

```javascript
Vue.component('button-counter', {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})
```

#### 子组件索引
* JavaScript 中直接访问子组件。为此可以使用 ref 为子组件指定一个索引 ID*
```html
<div id="parent">
  <user-profile ref="profile"></user-profile>
</div>
```

```javascript
var parent = new Vue({ el: '#parent' })
// 访问子组件
var child = parent.$refs.profile
```

## 非父子组件通信
#### 使用一个空的vue实例作为中央事件总线

## 过渡效果
*插入、更新或者移除 DOM 时*
#### 单元素组件的过度
  * v-if
  * v-show
  * 动态组件
  * 组件根节点
  ```html
  <div id="demo">
    <button v-on:click="show = !show">
      Toggle
    </button>
    <transition name="fade">
      <p v-if="show">hello</p>
    </transition>
  </div>
  ```

  ```javascript
  new Vue({
    el: '#demo',
    data: {
      show: true
    }
  })
  ```

  ```css
    .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
  ```

  删除或插入包含在transition组件中的元素时，处理过程：
  1. 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
  2. 如果过渡组件提供了 JavaScript 钩子函数，这些钩子函数将在恰当的时机被调用。
  3. 如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作（插入/删除）在下一帧中立即执行。(注意：此指浏览器逐帧动画机制，和Vue的 nextTick 概念不同)

#### 过渡的css类名
* v-enter                 过渡开始状态
* v-enter-active          过渡状态
* v-enter-to              过渡的结束状态（插入后）
* v-leave                 离开过渡开始状态
* v-leave-active          过渡状态
* v-leave-to              离开过渡结束状态

*v- 是这些类名的前缀。使用 <transition name="my-transition"> 可以重置前缀，比如 v-enter 替换为 my-transition-enter。*
```html
<div id="example-3">
  <button @click="show = !show">
    Toggle render
  </button>
  <transition
    name="custom-classes-transition"
    enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight"
  >
    <p v-if="show">hello</p>
  </transition>
</div>
```


# webpack经验总结
#### package
  * dependencies：项目发布时的依赖
  * devDependencies：项目开发时的依赖
  * scripts：编译项目的一些命令
  * npm install node-sass --save-dev (保存到开发环境)

# vue经验总结
#### click
  * 普通元素： @click
  * 组件元素： @click.native

#### slot
  * 非必要元素
  * 可自定义

#### router-link
  * tag   指定渲染标签类型
  * active-class  激活时样式

#### v-if && v-for 共存
**先做v-for的loop,随后对每一个loop再应用v-if判断

# javascript 经验总结
#### fetch
  * [深入浅出Fetch API](http://web.jobbole.com/84924/)
  * [在 JS 中使用 fetch 更加高效地进行网络请求](http://blog.parryqiu.com/2016/03/02/using_fetch_in_nodejs/)

#### asyn 函数
  * [asyn 函数的含义和用法](http://www.ruanyifeng.com/blog/2015/05/async.html)

# css 经验总结
#### 动画
  * [css滤镜（css blur）](http://www.cnblogs.com/nzbin/p/6380679.html)


# 高效开发
## 工具设置
#### webpack
    * [引入sass 全局变量，minxin，function等](https://zhuanlan.zhihu.com/p/28159877)

