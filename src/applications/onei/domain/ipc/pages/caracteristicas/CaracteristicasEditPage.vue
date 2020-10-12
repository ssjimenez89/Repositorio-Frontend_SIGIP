<template>
  <v-content class="padding-top">
    <v-container>
      <v-layout align-center justify-center row>
        <v-flex lg10 md10 sm8 xs12>
          <caracteristicas-edit-crud></caracteristicas-edit-crud>
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
  import CaracteristicasEditCrud from "../../components/caracteristica/crudCaracteristicas/CaracteristicasEditCrud.vue";

  export default {
    name: "onei-caracteristicas-add-page",
    components: {
      VContainer,
      VContent,
      VLayout,
      VFlex,
      CaracteristicasEditCrud,
    },
    data() {
      return {};
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t(
            "applications.onei_ipc.modules.caracteristicas.page.edit.page_title"
          )
        };
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .padding-top
    padding: 20px 0px 0px 0px !important;
</style>
