<template>
  <div class="transition-left">
    <header class="header"></header>
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        transitionName: 'slideLeft'
      }
    },
    beforeRouteUpdate (to, from, next) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slideRight'
      }else {
        this.transitionName = 'slideLeft'
      }
      this.$router.isBack = false
      next()
    }
  }
</script>
<style lang="scss">
@import '../../assets/css/common';
  .transition-left {
    .header {
      position: absolute;
      width: 100%;
      overflow: hidden;
      height: rem(100);
      line-height: rem(100);
      background-color: #f0f0f0;
    }
    .child-view {
      position: absolute;
      width: 100%;
      transition: all .8s cubic-bezier(.55,0,.1,1);
    }
    .slideLeft-enter, .slideRight-leave-active {
      opacity: 0;
      -webkit-transform: translate(50px, 0);
      transform: translate(50px, 0);
    }
    .slideLeft-leave-active, .slideRight-enter {
      opacity: 0;
      -webkit-transform: translate(-50px, 0);
      transform: translate(-50px, 0);
    }
    li{
      line-height: rem(50);
    }

  }
</style>