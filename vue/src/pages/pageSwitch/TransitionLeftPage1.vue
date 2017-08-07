<template>
  <div class="transition-left-page1">
    <header>
      <div class="back" @click="handleBack"><</div>
      <h3>page1</h3>
    </header>
  </div>
</template>
<script>
export default {
  methods: {
    handleBack() {
      console.log('back')
      this.$router.goBack()
    }
  }
}
</script>
<style lang="scss">
@import '../../assets/css/common';
  .transition-left-page1 {
    header {
    //  position: absolute;
      width: 100%;
      overflow: hidden;
      line-height: rem(100);
      background-color: #f0f0f0;
      .back {
        position: absolute;
        width: rem(150);
        text-align: center;
      }
      h3 {
        padding: 0;
        margin: 0;
        float: right;
        width: 100%;

        text-align: center;
      }
    }
    
  }
</style>