<template>
  <div class="slide-index">
    {{userName}}
  </div>
</template>

<script>
export default {
  name: 'slide-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:['userName']
}
</script>
