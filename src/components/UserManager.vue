<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <!-- Inputelement Eingabe Suchbegriff, die Eingabe soll dazu führen,
       dass nur die Items die diesen Begriff beinhalten 
       (Suchbegriff: "katze", Anzeige: Katzen, Schleichkatzen ) angezeigt werden.
      -->
       <label for="freeTextSearch">Suchbegriff: </label>
        <input v-model="searchText" name="freeTextSearch">       
      <div v-for="user in filteredUsers()" :key="user">
        <UserDetails :user="user"/>
      </div>
  </div>
</template>

<script>

import axios from 'axios'

import UserDetails from './UserDetails.vue'

export default {
  components: {
    UserDetails
},
  props: {
    msg: String
  },
  data() {
    return {
      searchText: "",
      items: []
    }
  },
  methods: {
    // Dies ist eine Funktion, die wir in der methods Option definieren
    // Wir können sie in unserem Template oder in unserem Code aufrufen
    // In diesem Beispiel rufen wir sie auf, wenn die Liste mit v-for durchlaufen wird
    filteredUsers() {
      return this.items.filter(
        item => 
          item.lastname.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1 ||
          item.firstname.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1
      );
    }
  },
  mounted () {
    axios
      .get('http://localhost:3000/users')
      .then(response => (this.items = response.data))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
