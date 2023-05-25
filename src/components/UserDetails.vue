<template>
    <div>
        <p @click="loadAddress(user.id)">{{ user }}</p>
    </div>
    <div v-if="addresses.length > 0">
        <!--<div v-for="address in addresses" :key="address.id">
           <AddressDetails :address="address"></AddressDetails>
        </div>-->

        <v-card class="mx-auto" max-width="300">
            <v-list>
                <v-list-item style="height: 60px;" prepend-avatar="https://cdn.vuetifyjs.com/images/john.png" :title="user.firstname + ' ' + user.lastname" :subtitle="user.email">
                    <template v-slot:append>
                        <v-btn color="primary" size="medium" variant="text" icon="mdi-menu-down" @click="menuDown = !menuDown"></v-btn>
                    </template>
                </v-list-item>
            </v-list>
        </v-card>
    </div>
</template>

<script>

import axios from 'axios'
//import AddressDetails from './AddressDetails.vue';

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
    //components: { AddressDetails }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  color: #b9425c;
}
</style>
