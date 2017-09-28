<template>
  <div class="m-left-temp">
    <div class="temper">
      {{temp}}°
    </div>
    <div class="mouth">{{curMonth}}</div>
    <div class="weather">{{weather}}</div>
    <div class="dots">
      <i class="dot"></i>
      <i class="dot"></i>
      <i class="dot"></i>
      <i class="dot"></i>
      <i class="dot"></i>
    </div>
  </div>
</template>
<script>
export default {
  name: 'm-left-temp',
  props: ['curMonth', 'temp', 'weather'],
  data () {
    return {
      
    }
  }
}
</script>

