<template>
  <div class="transition-top-index">
    {{value}}
    <input type="radio" value="one" name="" v-model="value" @click="handleClick">
  </div>
</template>

<script>
export default {
  name: 'transition-top-index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      value: ''
    }
  },
  props:['userName'],
  methods: {
    handleClick: function () {
      console.log(this.value)
    }
  }
}
</script>
