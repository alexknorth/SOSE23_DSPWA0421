<template>
   <v-card
    v-show="addingActivated !== true"
    variant="tonal"
    width="280"
    class="flexcard" 
    color="gray"
    @click="addingActivated = true"
  >
  <div style="text-align: center">ADD...</div>
  </v-card>
  <v-card
    v-show="addingActivated === true"
    variant="tonal"
    width="300"
    class="flexcard" 
    color="gray"
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
          size="small"
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
        class="mx-4"
        icon="mdi-phone"
        color="gray"
        variant="outlined"
        size="large"
      >
      </v-btn>
      <v-btn
        class="mx-4"
        icon="mdi-mail"
        color="gray"
        variant="outlined"
        size="large"
      >
      </v-btn>
      <v-btn
        class="mx-4"
        icon="mdi-calendar"
        color="gray"
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
    userId: null,
    companyId: null
  },
  data: () => ({
    addingActivated: false,
    contact: {
      salutation: "Herr",
      lastname: "Mustermann",
      firstname: "Max",
      phone: "0123456789",
      email: "a@b.cd",
      types: ["Entscheider"],
      roles: ["Geschäftsführer"]
    },
  }),
  methods: {
    async addContactCreatedActivity() {
        var activity = {
            userId: this.userId,
            companyId: this.companyId,
            timestamp: new Date().toISOString(),
            note: "Kontakt '" + this.contact.salutation + " " + this.contact.firstname + " " + this.contact.lastname + "' erstellt", 
            tags: ["Kontakterstellung"],
            interpretation: "neutral",
        };
        await axios.post("http://localhost:3000/activities", activity);
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
  