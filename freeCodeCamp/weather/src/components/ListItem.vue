<template>
  <ul class="m-list-item">
    <li class="time">{{data.time}}</li>
    <li class="weather">{{data.cond}}</li>
    <li class="temp">{{data.tmp}}</li>
  </ul>
</template>
<script>
export default {
  name: 'm-list-item',
  props: ['data']
}
</script>
