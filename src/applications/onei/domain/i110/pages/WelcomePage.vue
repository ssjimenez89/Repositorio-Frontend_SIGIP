<template>
  <v-content class="container-padding">
    <v-container fill-height fluid>
      <v-layout align-center justify-center>
        <v-flex align-center justify-center md12 sm12 xs12>
          <v-img :src="logo" class="mb-2" contain height="18em"></v-img>
          <h1 class="mb-1 grey--text text--darken-3 mb-2 headline font-weight-bold text-xs-center">Índice de valor
            unitario para la industria manufacturera</h1>
          <h1 class="mb-1 grey--text text--darken-3 mb-2 title font-weight-bold text-xs-center"> Bienvenido Juan</h1>
          <h2 class="subheading grey--text text--darken-3 text-xs-center font-weight-bold">IPC-ONEI</h2>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script lang="ts">
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VImg from "@vuetify/components/VImg";

  export default {
    name: "i110-welcome-page",
    components: {
      VContainer,
      VContent,
      VLayout,
      VFlex,
      VImg
    },
    data() {
      return {
        logo: this.$store.getters["@onei.i110/getLogo"]
      }
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t("applications.onei_i110.page_title")
        };
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .container-padding {
    padding: 64px 0px 0px 0px !important;
  }
</style>
