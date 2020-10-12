<template>
  <main-content
    :add-opts="{to:'/onei/sigip/ipc/establecimiento/nuevo'}"
    title="Listar establecimiento."
  >

    <generic-filter
      :only="['dpaId','mercado','tipologia','codigo','estado','establecimientoId']"
    ></generic-filter>

    <establecimiento-list></establecimiento-list>
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
  import EstablecimientoList from "../../components/establecimiento/EstablecimientoList.vue";
  import GenericFilter from "@shared/components/generic-filter/generic-filter.vue";
  import MainContent from "@shared/components/main-content/main-content.vue";
  import FilterPro from "@shared/components/filter/filter.vue";

  export default {
    name: "onei-establecimiento-list-page",
    components: {
      FilterPro,
      MainContent,
      GenericFilter,
      EstablecimientoList,
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
            "applications.onei_ipc.modules.establecimiento.page_title"
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
