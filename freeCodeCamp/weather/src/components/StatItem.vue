<template>
  <div class="u-stat-item">
    <img :src='imgUrl' alt="" :style="{transform:deg_w}">
    <div>{{state}}</div>
  </div>
</template>
<script>
export default {
  name: 'u-stat-item',
  data () {
    return {
      imgUrl: require('../assets/img/'+this.type+'.png') 
    }
  },
  props:['type','state', 'deg'],
  computed: {
    deg_w () {
      return 'rotate('+(parseInt(this.deg) - 90)+'deg)'
    }
  }
}
</script>

