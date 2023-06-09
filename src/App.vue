<template>
  <TestComponent />
  <LeadPipeline v-show="selectedItem === 0" :user="loggedInUser"/>
 <!-- <v-card>
    <v-layout>
      <v-app-bar title="LeadMachine">
        <ProfileMenu :user="loggedInUser"/>
        <SwitchThemeMenu/>
      </v-app-bar>

      <v-navigation-drawer permanent absolute>
        <v-divider></v-divider>

        <v-list
          :lines="false"
          density="compact"
          nav
        >
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :value="item"
            active-color="primary"
            @click="selectedItem = i"
          >
            <template v-slot:prepend>
              <v-icon :icon="item.icon"></v-icon>
            </template>

            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main style="min-height: 600px; overflow-y: auto;">
        <LeadPipeline v-show="selectedItem === 0" :user="loggedInUser"/>
        <UserManager v-show="selectedItem === 1" :users="users"/>
      </v-main>
    </v-layout>
    <v-layout>
      <v-footer class="d-flex flex-column">
        <div>
          <v-spacer></v-spacer>

          <v-btn class="mx-4" icon='mdi-facebook' variant="plain" size="small" ></v-btn>
          <v-btn class="mx-4" icon='mdi-twitter' variant="plain" size="small" ></v-btn>
          <v-btn class="mx-4" icon='mdi-linkedin' variant="plain" size="small" ></v-btn>
          <v-btn class="mx-4" icon='mdi-instagram' variant="plain" size="small" ></v-btn>
        </div>

        <div>
          {{ new Date().getFullYear() }} — <strong>LeadMachine</strong>
        </div>
      </v-footer>
    </v-layout>
  </v-card> -->
</template>

<script>
import axios from 'axios'
import LeadPipeline from './components/LeadPipeline.vue';
import TestComponent from './components/TestComponent.vue';
/*import UserManager from './components/UserManager.vue';
import SwitchThemeMenu from './components/SwitchThemeMenu.vue';
import ProfileMenu from './components/ProfileMenu.vue';
*/

export default {
  name: 'App',
  components: {
    TestComponent,
    LeadPipeline/*,
    SwitchThemeMenu,
    UserManager,
    ProfileMenu*/
  },
  data() {
    return {
      loggedInUserID: 1,
      loggedInUser: {},
      users: [],

      //NavBarStart
      selectedItem: 0,
      items: [
        { text: 'Leads', icon: 'mdi-handshake' },
        { text: 'Benutzerverwaltung', icon: 'mdi-account-multiple' },
     /*   { text: 'Starred', icon: 'mdi-star' },
        { text: 'Recent', icon: 'mdi-history' },
        { text: 'Offline', icon: 'mdi-check-circle' },
        { text: 'Uploads', icon: 'mdi-upload' },
        { text: 'Backups', icon: 'mdi-cloud-upload' },*/
      ],
      //NavBarEnd

    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/users/' + this.loggedInUserID)
      .then(response => (this.loggedInUser = response.data))
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
