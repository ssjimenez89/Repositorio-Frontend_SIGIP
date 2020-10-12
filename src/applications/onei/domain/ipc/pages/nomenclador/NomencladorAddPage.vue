<template>
  <v-content class="padding-top">
    <v-container>
      <v-layout align-center justify-center row>
        <v-flex lg10 md10 sm8 xs12>
          <nomenclador-add></nomenclador-add>
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
  import NomencladorAdd from "../../components/nomenclador/NomencladorAdd.vue";

  export default {
    name: "onei-nomenclador-add-page",
    components: {
      VContainer,
      VContent,
      VLayout,
      VFlex,
      NomencladorAdd,
    },
    data() {
      return {};
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t(
            "applications.onei_ipc.modules.nomenclador.pages.add_nomenclador.page_title"
          )
        };
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .padding-top
    padding: 68px 0px 0px 0px !important;
</style>
