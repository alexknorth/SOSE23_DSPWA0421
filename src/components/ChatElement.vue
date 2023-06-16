<template>
  <v-card variant="outlined">
    <div v-if="!connected">
      <form @submit.prevent="connectWebSocket">
        <v-label>Enter your name to start chatting</v-label>
        <input type="text" v-model="username" placeholder="Name" />
        <v-divider></v-divider>
        <button type="submit">Connect</button>
      </form>
    </div>
    <div v-else>
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
      <div>
        <form @submit.prevent="handleMessageSubmit(username, text)">
          <input type="text" v-model="text" placeholder="Write message..." />
          <button type="submit"><i class="bi bi-send"></i></button>
        </form>
      </div>
    </div>
  </v-card>
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
      connected: false,
      connection: null,
    };
  },
  methods: {
    connectWebSocket() {
      console.log("Starting connection to WebSocket Server...");
      this.connection = new WebSocket("ws://localhost:3001");

      this.connection.onmessage = (event) => {
        this.messages.push(JSON.parse(event.data));
      };

      this.connection.onopen = () => {
        this.connected = true;
        console.log("Successfully connected to the echo websocket server...");
      };
    },
    handleMessageSubmit(username) {
      const newMessage = { username: username, text: this.text };
      this.connection.send(JSON.stringify(newMessage));
      this.messages.push(newMessage);
      this.text = '';
    },
  },
  mounted: function () {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.left-bubble {
    position: relative;
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
  color: #333;
}

.left-bubble::before {
    content: '';
  top: 50%;
  left: -20px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: #f0f0f0;
  border-top-right-radius: 50%;
}

.right-bubble {
  position: relative;
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
  color: #333;
  text-align: right;
}

.right-bubble::before {
  content: '';
  top: 50%;
  right: -20px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: #f0f0f0;
  border-top-left-radius: 50%;
}
</style>