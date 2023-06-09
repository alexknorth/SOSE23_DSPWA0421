<template>
    <v-select
        style="maxWidth:120px"
        label="Select Theme"
        v-model="selectedTheme"
        :items="myThemes"
        @update:modelValue="setTheme()"
    ></v-select>
</template>
  
<script setup>
  import { ref } from "vue";
  import { useTheme } from "vuetify";
  
  const theme = useTheme();
  const myThemes = ["dark", "light"];//, "myCustomLightTheme"];
  const selectedTheme = ref(myThemes[0]);
  
  const setTheme = () => {
    theme.global.name.value = selectedTheme.value;
    console.log(selectedTheme.value);
  };
</script>