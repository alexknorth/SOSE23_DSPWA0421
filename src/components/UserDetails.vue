<template>
  <v-container>
    <v-hover v-slot="{ isHovering, props }">
      <v-card  v-bind="props"
        :elevation="isHovering ? 24 : 6"
        class="mx-auto pa-6">
        <v-card-title class="headline">{{ user.firstname }} {{ user.lastname }}</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <p :class="{ 'phone-pstn':!isMobile(user.phone), 'phone-mobile':isMobile(user.phone) }">phone: <a :href="'tel:' + user.phone">{{ user.phone }}</a></p>
              <v-icon icon="mdi-domain"></v-icon>
              <p>Newsletter aktiviert: {{ user.subscribedToNewsletter === true ? "Ja" : "Nein" }}</p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
        <v-btn
          variant="text"
          color="teal-accent-4"
          @click="loadAddresses(user.id); reveal = true"
        >
          Adressen
        </v-btn>
        </v-card-actions>

        <v-expand-transition>
          <v-card
            v-if="reveal"
            class="v-card--reveal"
            style="height: 100%;"
          >
            <v-card-text class="pb-0">
              <div>
                <div v-for="address in addresses" :key="address.id">
                  <AddressDetails :address="address"/>
                </div>
              </div>
            </v-card-text>
            <v-card-actions class="pt-0">
              <v-btn
                variant="text"
                color="teal-accent-4"
                @click="reveal = false"
              >
                STAMMDATEN
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-expand-transition>

      </v-card>
    </v-hover>
  </v-container>
</template>

<script>
import AddressDetails from './AddressDetails.vue'

import axios from 'axios'

export default {
  components: {
    AddressDetails
  },
  props: {
    user: {}
  },
  data() {
    return {
      searchText: "",
      addresses: [],
      reveal: false,
    }
  },
  methods: {
    async loadAddresses(userId) {
      this.addresses = (await axios.get('http://localhost:3000/addresses?userId=' + userId)).data;
    },
    isMobile(number){
      return number.startsWith('1');
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>
