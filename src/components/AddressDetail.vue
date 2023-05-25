<template>
    {{ address.street + " " +address.number }}
</template>

<script>
export default {
  props: {
    address: {}
  }
}
</script>

<style scoped>

</style>
