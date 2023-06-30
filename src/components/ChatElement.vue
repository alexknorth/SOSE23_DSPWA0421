<template >
  <v-list>
  <v-list-item v-for="(item, index) in connectionsList" :key = "index">
   {{ item }}
  </v-list-item>  
  </v-list>

  <div style="padding: 30px; background-image: linear-gradient(to right, rgb(203, 203, 211), rgb(156, 190, 156));">
  <v-card variant="outlined" >
    <div v-if="!connected" >
      <form @submit.prevent="connectWebSocket">
        <v-label style="color:#000; font-weight: bold; padding: 20px;">Enter your name and connect</v-label>
        <input type="text" style="padding-left: 30px; border: 2px solid;" v-model="username" placeholder="Name" />
                <!--<v-divider></v-divider> -->
        <v-btn type="submit" style="background-color:orange; margin-left: 20px; ">Connect</v-btn>
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
      connected: false,
      connection: null,
      connectionsList: [],
    };
  },
  methods: {
    connectWebSocket() {
      console.log("Starting connection to WebSocket Server...");
      this.connection = new WebSocket("ws://localhost:3001");

      this.connection.onmessage = (event) => {
        const parseData= JSON.parse(event.data);
        this.messages.push(parseData);

        const isKnownUser=this.connectionsList.filter(user => user===parseData.username).length
        if (!isKnownUser){
          this.connectionsList.push(parseData.username)
      console.log("User " + this.connectionsList)
              } 
      };

      this.connection.onopen = () => {
        this.connected = true;
        console.log("Successfully connected to the echo websocket server...");
        this.text= "hello";
        this.handleMessageSubmit(this.username);
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