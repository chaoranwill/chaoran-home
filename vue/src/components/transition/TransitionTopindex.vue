<template>
  <div class="transition-top-index">
    {{userName}}
    
  </div>
</template>

<script>
export default {
  name: 'transition-top-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:['userName']
}
</script>
