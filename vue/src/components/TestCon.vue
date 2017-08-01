<template>
  <div class="test-con">
    {{userName}}
  </div>
</template>

<script>
export default {
  name: 'test-con',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  props:['userName']
}
</script>
