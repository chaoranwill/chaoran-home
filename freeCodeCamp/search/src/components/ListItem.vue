<template>
  <div class="m-list-item">
    <h1 class="title">
      {{result.title}}
    </h1>
    <div class="extract">
      {{result.extract}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'm-list-item',
  props: ['result']
}
</script>

