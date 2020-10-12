<template>
  <v-container fill-height fluid>
    <v-layout align-center justify-center>
      <div class="text-md-center">
        <h1 class="display-4">{{ $t("administrator.pages.not_found.title")}}</h1>
        <h2 class="mb-5 headline">{{ $t("administrator.pages.not_found.subtitle")}}</h2>
        <v-btn color="primary" to="/onei">Go Home</v-btn>
      </div>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from "vue"
  import VBtn from "@vuetify/components/VBtn";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VLayout from "@vuetify/components/VGrid/VLayout";

  export default Vue.extend({
    name: "admin-not-found-page",
    components: {
      VBtn,
      VContainer,
      VLayout,
    },
  });
</script>
