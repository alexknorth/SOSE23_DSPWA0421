<template>
  <div>
    <p @click="loadAddress(user.id)">{{ user }}</p>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  props: {
    user: {}
  },
  methods: {
    async loadAddress(userId) {
      var addresses = await axios.get('http://localhost:3000/addresses?userId=' + userId);
      addresses.data.forEach( address => console.log(address.street + ' ' + address.number))
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  color: #b9425c;
}
</style>
