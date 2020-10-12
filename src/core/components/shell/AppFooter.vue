<template>
  <v-footer
    dark
  >
    <v-card
      class="indigo lighten-1 white--text text-xs-center flex"
      flat
      tile
    >
      <v-card-actions class="justify-center">
        &copy;2019 — <strong>Universidad de las Ciencias Informáticas</strong>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
  import Vue from "vue";
  import {VCard, VCardActions} from "@vuetify/components/VCard";
  import VFooter from "@vuetify/components/VFooter";

  export default Vue.extend({
    name: "admin-app-footer",
    components: {
      VFooter,
      VCard,
      VCardActions,
    },
    data() {
      return {}
    },
    props: {},
    methods: {},
  });
</script>

<style lang="stylus" scoped>
</style>
