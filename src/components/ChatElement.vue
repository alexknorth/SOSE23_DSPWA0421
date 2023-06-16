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
        style="padding: 50px;"
      >
        <div :class="[
          message.username === username ? 'left-bubble' : 'right-bubble',
        ]">
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
margin:0 auto;
padding: 1rem;
-webkit-border-radius: 20px;
-moz-border-radius: 20px;
border-radius: 20px;
background: #3babe2;
text-align: left;
}

.left-bubble::before {
content: ' ';
position: absolute;
width: 0;
height: 0;
left: 28px;
top: -17px;
border-left: 14px solid transparent;
border-right: 14px solid transparent;
border-bottom: 17px solid #3babe2;
}

.right-bubble {
position: relative;
margin:0 auto;
padding: 1rem;
-webkit-border-radius: 20px;
-moz-border-radius: 20px;
border-radius: 20px;
background: #e23b8c;
text-align: right;
}

.right-bubble::before {
content: ' ';
position: absolute;
width: 0;
height: 0;
left: 28px;
top: -17px;
border-left: 14px solid transparent;
border-right: 14px solid transparent;
border-bottom: 17px solid #e23b8c;
}
</style>