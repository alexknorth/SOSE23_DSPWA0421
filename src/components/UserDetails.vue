<template>
    <v-expansion-panels>
      <v-expansion-panel>
      <v-expansion-panel-title>
        {{ user.firstname + ' ' + user.lastname }}
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div v-for="address in addresses" :key="address.id">
          <AddressDetails :address="address"></AddressDetails> 
        </div> 
      </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </template>
  
  <script>
  import axios from "axios";
  
  import AddressDetails from './AddressDetails.vue'
  
  export default {
    components: { AddressDetails },
    props: {
      user: {},
    },
    data() {
      return {
        addresses: [],
      };
    },
    methods: {
      async loadAddress(userId) {
        var addresses = await axios.get(
          "http://localhost:3000/addresses?userId=" + userId
        );
        addresses.data.forEach((address) =>
          console.log(address.street + " " + address.number)
        );
        this.addresses = addresses.data;
      },
    },
    mounted: function () {
    this.$nextTick(function () {
      this.loadAddress(this.user.id);
    })
  }
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  p {
    color: #b9425c;
  }
  </style>