<template>
  <div class="u-stat-item">
    <img :src='imgUrl' alt="">
    <div>{{data}}</div>
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
  props:['type','data']
}
</script>

