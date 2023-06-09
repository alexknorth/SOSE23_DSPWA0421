<template>
    <v-card
    >
          <v-list>
            <v-list-item style="height: 60px;"

              prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
              :title="user.firstname + ' ' + user.lastname"
              :subtitle="user.email"
            >
              <template v-slot:append>
                <v-btn
                  color="primary"
                  size="medium"
                  variant="text"
                  icon="mdi-menu-down"
                  @click="menuDown = !menuDown"
                ></v-btn>
              </template>
            </v-list-item>
          </v-list>
  
          <v-divider></v-divider>
  
          <v-list
          v-if="menuDown"
            :lines="false"
            density="compact"
            nav
          >
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              :value="item"
              active-color="primary"
            >
              <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
              </template>
  
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
          </v-list>
    </v-card>
  </template>

<script>
export default {
  props: {
    user: {}
  },
  data: () => ({
    selectedItem: 0,
    items: [
      { text: 'My Profile', icon: 'mdi-account' },
    ],
    menuDown: false
  }),
}
</script>