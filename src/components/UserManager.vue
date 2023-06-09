<template>
  <div>
    <h1>Benutzerverwaltung</h1>
      <v-text-field v-model="searchText">Suchbegriff:</v-text-field>      
      <div v-for="user in filteredUsers()" :key="user.id"> 
        <UserDetails :user="user"/>
      </div>
  </div>
</template>

<script>
import UserDetails from './UserDetails.vue'

export default {
  components: {
    UserDetails,
  },
  props: {
    users: []
  },
  data() {
    return {
      searchText: ""
    }
  },
  methods: {
    filteredUsers() {
      var searchPhrase = this.searchText.trim().toLowerCase();
      return this.users.filter(
        user => 
          user.lastname.toLowerCase().indexOf(searchPhrase) != -1 ||
          user.firstname.toLowerCase().indexOf(searchPhrase) != -1 ||
          user.phone.toLowerCase().indexOf(searchPhrase) != -1
      );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
