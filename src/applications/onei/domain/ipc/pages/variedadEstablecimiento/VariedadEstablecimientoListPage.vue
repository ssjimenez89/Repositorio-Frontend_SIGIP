<template>
  <v-content class="padding-top">
    <v-container fluid>
      <v-layout align-center justify-center>

        <variedad-establecimiento-list></variedad-establecimiento-list>
      </v-layout>
    </v-container>
  </v-content>
</template>
<script lang="ts">
  import VBtn from "@vuetify/components/VBtn";
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import VIcon from "@vuetify/components/VIcon";
  import VTooltip from "@vuetify/components/VTooltip";
  import VariedadEstablecimientoList from "../../components/variedadEstablecimiento/VariedadEstablecimientoList.vue";

  export default {
    name: "onei-establecimiento-list-page",
    components: {
      VariedadEstablecimientoList,
      VContainer,
      VContent,
      VLayout,
      VFlex,
      VTooltip,
      VBtn,
      VIcon
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t(
            "applications.onei_ipc.modules.variedadEstablecimiento.page_title"
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
