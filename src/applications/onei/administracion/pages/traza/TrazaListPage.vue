<template>
  <main-content
    title="Lista de trazas"
  >
    <TrazaList class="padding-top"></TrazaList>
  </main-content>

<!--  <v-content class="padding-top">-->
<!--    <v-container fluid>-->
<!--      <v-layout align-center justify-center>-->
<!--        <TrazaList class="padding-top"></TrazaList>-->
<!--      </v-layout>-->
<!--    </v-container>-->
<!--  </v-content>-->
</template>
<script lang="ts">
import MainContent from "@shared/components/main-content/main-content";
import VBtn from "@vuetify/components/VBtn";
import VContainer from "@vuetify/components/VGrid/VContainer";
import VContent from "@vuetify/components/VGrid/VContent";
import VFlex from "@vuetify/components/VGrid/VFlex";
import VLayout from "@vuetify/components/VGrid/VLayout";
import VIcon from "@vuetify/components/VIcon";
import VTooltip from "@vuetify/components/VTooltip";
import TrazaList from "../../components/traza/TrazaList";

export default {
  name: "onei-traza-list-page",
  components: {
    TrazaList,
    VContainer,
    VContent,
    VLayout,
    VFlex,
    VTooltip,
    VBtn,
    VIcon,
    MainContent,
  },
  head: {
    title() {
      return {
        inner: this.$i18n.t(
          "applications.onei_administracion.modules.usuario.page_title"
        )
      };
    }
  }
};
</script>
<style lang="stylus" scoped>
  .padding-top {
    padding: 20px 0px 0px 0px !important;
  }
</style>
