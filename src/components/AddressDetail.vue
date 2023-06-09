<template>
    <v-card> 
      <v-card-title>
        {{ address.zip  + ' '  + address.city }}
      </v-card-title>
      <v-card-subtitle>
        {{ address.street + " " + address.number }}
      </v-card-subtitle>
      <v-card-text>

      </v-card-text>
    </v-card>
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
