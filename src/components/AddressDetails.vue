<template>
  <div>{{ address.street }} {{ address.number }}</div>
  <!-- TODO: Display all data beautified -->
</template>

<script>

export default {
  props: {
    address: {}
  },
}
</script>

<style scoped>
</style>
