<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        <ItemComponent :item="item.message"/>
      </li>
    </ul>
  </div>
</template>

<script>

import ItemComponent from './ItemComponent.vue'

export default {
  components: {
    ItemComponent
  },
  props: {
    msg: String
  },
  data() {
    return {
      parentMessage: 'Parent',
      items: [
        { id: 1, message: 'Foo' }, 
        { id: 2, message: 'Bar' }
      ]
    }
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
