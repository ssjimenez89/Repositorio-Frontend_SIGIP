<template>
  <main-content
    title="Lista de nomencladores"

  >
    <generic-filter
    :only="['nombre','tipoNomenclador']"
    ></generic-filter>
    <nomenclador-list></nomenclador-list>
    <v-tooltip left>
      <v-btn
        bottom
        color="green"
        dark
        fab
        fixed
        right
        slot="activator"
        to="/onei/sigip/ipc/nomenclador/nuevo"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <span>{{$t('applications.onei_ipc.modules.nomenclador.add_nomenclador_button')}}</span>
    </v-tooltip>
  </main-content>
</template>
<script lang="ts">
  import VBtn from "@vuetify/components/VBtn";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import VTooltip from "@vuetify/components/VTooltip";
  import NomencladorList from "../../components/nomenclador/NomencladorList.vue";
  import MainContent from "@shared/components/main-content/main-content";
  import GenericFilter from "@shared/components/generic-filter/generic-filter.vue";

  export default {
    name: "onei-nomenclador-list-page",
    components: {
      GenericFilter,
      NomencladorList,
      VContainer,
      VContent,
      VLayout,
      VFlex,
      VTooltip,
      VBtn,
      MainContent,
      VIcon
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t(
            "applications.onei_ipc.modules.nomenclador.page_title"
          )
        };
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .padding-top {
    padding: 72px 0px 0px 150px !important;
  }
</style>
