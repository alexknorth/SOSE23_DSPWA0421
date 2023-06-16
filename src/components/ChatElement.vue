<template>
  <div>
    <div v-if="!connect">
      <div>
        <div>
          <form @submit.prevent="connectWebSocket">
            <v-label>Enter your name to start chatting</v-label>
            <input type="text" v-model="username" placeholder="Name" />
            <v-divider></v-divider>
            <button type="submit">Connect</button>
          </form>
        </div>
      </div>
    </div>
    <div v-else>
      <div>
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            message.username === username ? 'left-bubble' : 'right-bubble',
          ]"
        >
          <b>{{ message.username }}</b
          >: <em>{{ message.text }}</em>
        </div>
      </div>
      <div>
        <form @submit.prevent="handleMessageSubmit(username, text)">
          <input type="text" v-model="text" placeholder="Write message..." />
          <button type="submit"><i class="bi bi-send"></i></button>
        </form>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      username: null,
      messages: [],
      text: "",
      socket: null,
      connect: false,
      connection: null,
    };
  },
  methods: {
    connectWebSocket() {
      console.log("Starting connection to WebSocket Server");
      this.connection = new WebSocket("ws://localhost:3001");

      this.connection.onmessage = function (event) {
        //console.log(event);
        this.messages.push(event.data);
      };

      this.connection.onopen = function () {
        this.connect = true;
        //console.log(event)
        console.log("Successfully connected to the echo websocket server...");
      };
    },
    handleMessageSubmit(username, text) {
      console.log(this.connection);
      this.connection.send(JSON.stringify({ username: username, text: text }));
    },
  },
  mounted: function () {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>