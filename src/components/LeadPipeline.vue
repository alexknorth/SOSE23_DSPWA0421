<template>
  <div class="pipeline-container">
    <div v-for="step in steps" :key="step.id" class="pipeline-step-container">
      <div
        class="vbox"
        style="width: 100%; gap: 8px"
        @drop="drop($event, step.id)"
        @dragover="allowDrop($event)"
      >
        <v-img height="30" :src="step.image" cover class="align-end text-black">
          <span class="pipeline-step-header">{{ step.name }} </span>
          <v-tooltip activator="parent" location="start">
            {{ step.description }}
          </v-tooltip>
        </v-img>

        <div class="vbox pipeline-step-items-container" :id="step.id">
          <v-hover>
            <div
              v-for="company in getDataForStep(step.id)"
              :key="company.id"
              draggable="true"
              @dragstart="drag($event, company.id)"
            >
              <v-expansion-panels>
                <v-expansion-panel
                  class="pipeline-step-item-container"
                  @click="onExpansionPanelClick"
                >
                  <v-expansion-panel-title>
                    <template v-slot:default="{ expanded }">
                      <v-row no-gutters>
                        <v-col cols="4" class="d-flex justify-start">
                          <v-avatar
                            v-if="company.logoURL"
                            size="36px"
                            @click.capture="$event.stopPropagation()"
                          >
                            <v-img
                              alt="Company Logo"
                              :src="company.logoURL"
                            ></v-img>
                          </v-avatar>
                          <v-avatar
                            @click.capture="$event.stopPropagation()"
                            v-else
                            :style="{
                              color: generateColorFromString(
                                company.name,
                                false
                              ),
                              backgroundColor: generateColorFromString(
                                company.name,
                                true
                              ),
                            }"
                          >
                            <span class="text-h6">
                              {{
                                (
                                  company.name[0] + company.name[1]
                                ).toUpperCase()
                              }}
                            </span>
                          </v-avatar>
                        </v-col>
                        <v-col cols="8" class="text-grey">
                          <v-fade-transition leave-absolute>
                            <span v-if="expanded" key="0">
                              {{ company.name }}
                            </span>
                            <span
                              v-else
                              v-show="companiesExpandedCount === 0"
                              key="1"
                            >
                              {{ company.name }}
                            </span>
                          </v-fade-transition>
                        </v-col>
                      </v-row>
                    </template>
                  </v-expansion-panel-title>
                  <v-expansion-panel-text>
                    <v-sheet class="d-flex flex-wrap-reverse">
                      <div style="padding: 5px" v-for="contact in getContactsByCompanyId(company.id)" :key="contact.id">
                        <ContactDetails :contact="contact" :userId="user.id" :companyId="company.id" />
                      </div>
                      <div>
                        <ContactCreate style="padding: 5px" :userId="user.id" :companyId="company.id" />
                      </div>
                    </v-sheet>
                    <div class="d-flex">
                      <v-text-field
                        label="Schreibe einen Kommentar..."
                        type="input"
                        clearable
                        validate-on="input"
                        solo
                        v-model="note"
                        :rules="[
                          (value) =>
                            !!value || 'Kommentar darf nicht leer sein',
                          (value) =>
                            (value && value.length >= 10) ||
                            'Mindestens 10 Zeichen',
                          (value) =>
                            (value && value.length <= 500) ||
                            'Maximal 500 Zeichen',
                        ]"
                        append-inner-icon="mdi-send"
                        @click:append-inner="
                          saveNewCommentforCompany(company.id)
                        "
                        @keyup.enter="saveNewCommentforCompany(company.id)"
                      >
                      </v-text-field>
                    </div>
                    <v-template variant="outlined">
                      <div>Verlauf:</div>
                      <v-timeline
                        density="compact"
                        side="end"
                        :style="{ 'min-width': '600px' }"
                      >
                        <v-timeline-item
                          v-for="activity in getActivitiesForCompany(
                            company.id
                          )"
                          :key="activity.id"
                          :dot-color="
                            activity.interpretation === 'positive'
                              ? 'green'
                              : activity.interpretation === 'negative'
                              ? 'red'
                              : 'gray'
                          "
                          size="x-small"
                        >
                          <div
                            class="d-flex justify-space-between flex-grow-1"
                            style="font-size: 13px"
                          >
                            <div class="flex-shrink-0">
                              @{{
                                new Date(
                                  activity.timestamp
                                ).toLocaleDateString()
                              }}
                              {{
                                new Date(
                                  activity.timestamp
                                ).toLocaleTimeString()
                              }}
                            </div>
                            <v-chip
                              class="ms-0"
                              color="yellow"
                              v-for="tag in activity.tags"
                              :key="tag"
                              label
                              size="small"
                            >
                              {{ tag }}
                            </v-chip>
                            <div>{{ activity.note }}</div>
                          </div>
                        </v-timeline-item>
                      </v-timeline>
                    </v-template>
                  </v-expansion-panel-text>
                </v-expansion-panel>
              </v-expansion-panels>
            </div>
          </v-hover>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios";
import ContactDetails from "./ContactDetails.vue";
import ContactCreate from "./ContactCreate.vue";

export default {
  components: {
    ContactDetails,
    ContactCreate
  },
  props: {
    user: null,
  },
  data() {
    return {
      steps: [],
      companies: [],
      activities: [],
      contacts: [],
      note: "",

      companiesExpandedCount: 0,
    };
  },
  methods: {
    getDataForStep(stepId) {
      return this.companies.filter((company) => company.stepId == stepId);
    },
    getActivitiesForCompany(companyId) {
      return this.activities.filter(
        (activity) =>
          activity.userId === this.user.id && activity.companyId === companyId
      );
    },
    getContactsByCompanyId(companyId) {
      console.log("getContactsByCompanyId called: " + this.contacts.find((contact) => contact.companyId === companyId).contacts.length);
      return this.contacts.find((contact) => contact.companyId === companyId).contacts;
    },
    async saveNewCommentforCompany(companyId) {
      if (
        this.note === null ||
        this.note === undefined ||
        this.note.length < 10 ||
        this.note.length > 500
      )
        return;

      await this.addActivity({
        userId: this.user.id,
        companyId: companyId,
        timestamp: new Date().toISOString(),
        note: this.note,
        tags: ["Kommentar"],
        interpretation: "neutral",
      });
      this.note = "";
    },
    allowDrop(event) {
      event.preventDefault();
    },
    drag(event, companyId) {
      if (event.dataTransfer !== "undefined" && event.dataTransfer !== null)
        event.dataTransfer.setData("companyId", companyId);
    },
    drop(event, stepId) {
      event.preventDefault();
      const companyId = event.dataTransfer.getData("companyId");
      var company = this.companies.find((company) => company.id == companyId);
      const oldStep = company.stepId;
      if (company !== undefined && oldStep !== stepId) {
        this.updateCompanyStep(company, stepId);
        this.addActivity({
          userId: this.user.id,
          companyId: company.id,
          timestamp: new Date().toISOString(),
          note:
            "Status geändert von '" +
            this.steps.find((step) => step.id === oldStep).name +
            "' zu '" +
            this.steps.find((step) => step.id === stepId).name +
            "'.",
          tags: ["Statusänderung"],
          interpretation: "neutral",
        });
      }
    },
    async loadSteps() {
      this.steps = (await axios.get("http://localhost:3000/steps")).data;
    },
    async loadActivities() {
      var limit = 1000;
      var page = 0;
      this.activities = (await axios.get(
          "http://localhost:3000/activities?_sort=timestamp&_order=desc&_limit=" +
            limit + "&_page=" + page + "&userId=" + this.user.id)).data;
    },
    async addActivity(activity) {
      await axios.post("http://localhost:3000/activities", activity);
      this.loadActivities();
    },
    async updateCompanyStep(company, newStepId) {
      company.stepId = newStepId;
      await axios.put("http://localhost:3000/companies/" + company.id, company);
      this.loadActivities();
    },
    async loadContacts() {
      this.contacts = [];
      for (var i = 0; i < this.companies.length; i++) {
        this.contacts.push({
          companyId: this.companies[i].id,
          contacts: (
            await axios.get(
              "http://localhost:3000/contacts?companyId=" + this.companies[i].id
            )
          ).data,
        });
      }
    },
    generateColorFromString(companyName, isBackground) {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        var index = isBackground ? 6 - i : i;
        color +=
          letters[
            Math.floor(
              (companyName.length > index
                ? companyName.charCodeAt(index)
                : companyName.length) % 16
            )
          ];
      }
      return color;
    },
    onExpansionPanelClick(event) {
      console.log(event.srcElement.classList);
      if (
        event.currentTarget.classList.contains("v-expansion-panel--active") &&
        event.srcElement.classList.contains("v-expansion-panel-title__overlay")
      ) {
        this.companiesExpandedCount++;
      } else {
        if (event.srcElement.classList.contains("v-expansion-panel-title__overlay")) {
          this.companiesExpandedCount--;
        }
      }
      console.log(this.companiesExpandedCount);
    },
  },
  mounted() {
    this.loadSteps();
  },
  watch: {
    user: function (newVal, oldVal) {
      if (
        newVal !== null &&
        newVal.id !== null &&
        (oldVal === null || oldVal.id !== newVal.id)
      ) {
        axios
          .get("http://localhost:3000/companies?userId=" + this.user.id)
          .then((response) => {
            this.companies = response.data;
            this.loadActivities();
            this.loadContacts();
          });
      }
    },
  },
};
</script>
  
<style scoped>
.pipeline-container {
  display: flex;
}
.pipeline-step-container:not(:last-child) {
  margin-right: 10px;
}
.pipeline-step-container {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-right: 10px;
  position: relative;
}
.pipeline-step-container:not(:last-child):after {
  content: "";
  position: absolute;
  right: -44px;
  height: 0;
  border-left: 45px solid var(--primary-color);
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
}
.pipeline-step-header {
  text-align: center;
  line-height: 30px;
  min-height: 30px;
}

.pipeline-step-container:not(:first-child) {
  padding-left: 1px;
}

.pipeline-step-container:not(:first-child):before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 8px;
  border-left: 45px solid var(--surface-ground);
  border-top: 18px solid transparent;
  border-bottom: 18px solid transparent;
  background: var(--primary-color);
}

.pipeline-step-items-container {
  gap: 8px;
  border: 5px;
  border-style: var(--primary-color);
  border-width: 10px;
  background: var(--surface-100);
  overflow: hidden;
}

.pipeline-step-item-container {
  overflow-y: auto;
}

</style>