<template>
  <v-content>
    <v-container fluid>
      <v-layout align-center justify-center>
        <onei-login></onei-login>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script lang="ts">
  import VBtn from "@vuetify/components/VBtn/VBtn";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import OneiLogin from "./components/Login.vue";

  export default {
    name: "onei-welcome-login",
    components: {
      OneiLogin,
      VContent,
      VContainer,
      VLayout,
      VFlex,
      VBtn,
    }
  };
</script>
<style lang="stylus" scoped>
  .v-image__image--cover
    background red !important
</style>
