<template>
    <div>
        <p @click="loadAddress(user.id)">{{ user }}</p>
    </div>
    <div v-if="addresses.length > 0">
        <div v-for="address in addresses" :key="address.id">
           <AddressDetails :address="address"></AddressDetails>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import AddressDetails from './AddressDetails.vue';

export default {
    props: {
        user: {}
    },
    data() {
        return {
            addresses: []
        }
    },
    methods: {
        async loadAddress(userId) {
            var addresses = await axios.get("http://localhost:3000/addresses?userId=" + userId);
            addresses.data.forEach(address => console.log(address.street + " " + address.number));
            this.addresses = addresses.data;
        }
    },
    components: { AddressDetails }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  color: #b9425c;
}
</style>
