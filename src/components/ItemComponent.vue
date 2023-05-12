<template>
  <div>
    <p>{{ item }}</p>
  </div>
</template>

<script>
export default {
  props: {
    item: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  color: #b9425c;
}
</style>
