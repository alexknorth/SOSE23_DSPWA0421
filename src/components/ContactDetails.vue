<template>
  <v-card
    variant="outlined"
    width="280"
    class="flexcard" 
  >
    <v-card-item>
      <v-card-title>
        <v-icon icon="mdi-account"></v-icon>
        {{ contact.salutation }} {{ contact.firstname }} {{ contact.lastname }}
      </v-card-title>
      <v-card-subtitle>
        <v-chip
          class="ms-0"
          color="green"
          v-for="typ in contact.types"
          :key="typ"
          label
          size="medium"
        >
          {{ typ }}
        </v-chip>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <div class="d-flex">
        <v-icon size="small" icon="mdi-phone"></v-icon>
        <div>{{ contact.phone }}</div>
      </div>
      <div class="d-flex">
        <v-icon size="small" icon="mdi-mail"></v-icon>
        <div>{{ contact.email }}</div>
      </div>
    </v-card-text>
    <v-card-actions>
        <v-btn
        v-if="!isCalling"
        class="mx-4"
        icon="mdi-phone"
        :color="isCalling ? 'gray' : 'green'"
        variant="outlined"
        size="large"
        :active="!isCalling"
        @click="isCalling = true; addActivity('CALL_START')"
      >
      </v-btn>
      <v-btn
        v-if="isCalling"
        class="mx-4"
        icon="mdi-phone-hangup"
        :color="isCalling ? 'red' : 'gray'"
        variant="outlined"
        size="large"
        :active="isCalling"
        @click="isCalling = false; addActivity('CALL_FINISHED')"
      >
      </v-btn>
      <v-btn
        class="mx-4"
        icon="mdi-mail"
        color="blue"
        variant="outlined"
        size="large"
      >
      </v-btn>
      <v-btn
        class="mx-4"
        icon="mdi-calendar"
        color="blue"
        variant="outlined"
        size="large"
      >
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
  
 <script>
import axios from "axios";

export default {
  props: {
    contact: {},
    userId: null,
    companyId: null
  },
  data: () => ({
    isCalling: false,
  }),
  methods: {
    async addActivity(type) {
        var activity = {
            userId: this.userId,
            companyId: this.companyId,
            timestamp: new Date().toISOString(),
            note: type === "CALL_START" ? "Kontakt '" + this.contact.salutation + " " + this.contact.firstname + " " + this.contact.lastname + "' wurde angerufen.": "Anruf zu Kontakt '" + this.contact.salutation + " " + this.contact.firstname + " " + this.contact.lastname + "' wurde beendet.", 
            tags: [type === "CALL_START" ? "Anrufstart" : "Anrufende"],
            interpretation: "neutral",
        };
        await axios.post("http://localhost:3000/activities", activity);
        this.loadActivities();
    },
  }
};
</script>
  
<style scoped>
.flexcard {
  display: flex;
  flex-direction: column;
}
.flexcard .v-toolbar {
  flex: 0;
}
</style>
  