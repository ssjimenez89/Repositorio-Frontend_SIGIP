<template>
  <div>
    <main-content title="Registar establecimiento">
      <establecimiento-stepper></establecimiento-stepper>
    </main-content>
  </div>

</template>
<script lang="ts">
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import VFlex from "@vuetify/components/VGrid/VFlex";
  import VLayout from "@vuetify/components/VGrid/VLayout";
  import EstablecimientoAdd from "../../components/establecimiento/EstablecimientoAdd.vue";
  import EstablecimientoStepper from "../../components/establecimiento/EstablecimientoStepper.vue";
  import MainContent from "@shared/components/main-content/main-content.vue";
  import VBtn from "@vuetify/components/VBtn";

  export default {
    name: "onei-establecimiento-add-page",
    components: {
      MainContent,
      VBtn,
      EstablecimientoStepper,
      VContainer,
      VContent,
      VLayout,
      VFlex,
      EstablecimientoAdd,
    },
    data() {
      return {};
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t(
            "applications.onei_ipc.modules.establecimiento.pages.add_establecimiento.page_title"
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
