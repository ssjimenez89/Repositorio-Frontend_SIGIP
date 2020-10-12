<template>
  <main-content
    title="Reportes">
    <Reportes class="padding-top"></Reportes>
  </main-content>
</template>

<script>
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import Reportes from "../../components/reportes/Reportes";
  import MainContent from "../../../../../../shared/components/main-content/main-content";

  export default {
    name: "onei-reportes-page",
    components: {
      MainContent,
      Reportes,
      VContainer,
      VContent,
    },
    data() {
      return {
      };
    },
    created() {
    },
    computed: {},
    methods: {},
    apollo: {},
  };
</script>

<style lang="stylus" scoped>
  .padding-top {
    padding: 72px 0px 0px 50px !important;
  }
</style>
