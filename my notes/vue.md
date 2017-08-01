[TOC]
# 属性与方法
不要在实例属性或者回调函数中（例如,`vm.$watch('a', newVal => this.myMethod())`使用箭头函数。因为箭头函数会绑定父级上下文，所以 `this` 不会按照预期指向 Vue 实例，然后 `this.myMethod` 将是未定义。

# 语法

* v-  指令是带有v-的特殊属性
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
  ```
* 表达式——提供了JavaScript表达式支持
* 参数——指令后以冒号声明
```html
  <a v-bind:href="url">超然haha</a>
```
* 过滤器
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
* 缩写
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

# 计算属性
* computed 属性默认只有 getter ，不过在需要时你也可以提供一个 setter 
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

# vue 样式绑定
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

# vue事件处理器
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
  * 按键修饰符
