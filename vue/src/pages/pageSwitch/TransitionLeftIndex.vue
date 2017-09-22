<template>
  <div class="transition-left-index">
    <header><h3>主页</h3></header>
    <ul>
        <li><router-link to="/page1">page1</router-link></li>
        <li><router-link to="/TransitionLeft/page2">page2</router-link></li>
      </ul>
  </div>
</template>
<script>
  export default {
    name: 'index'
  }
</script>
<style lang="scss">
@import '../../assets/css/common';
  .transition-left-index {
    header {
     //position: absolute;
      width: 100%;
      overflow: hidden;
      line-height: rem(100);
      background-color: #f0f0f0;
      h3 {
        padding: 0;
        margin: 0;
        width: 100%;

        text-align: center;
      }
    }
  }
</style>