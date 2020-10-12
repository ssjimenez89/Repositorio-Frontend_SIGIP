<template>
  <main-content
    :title="$i18n.t('applications.onei_ipc.modules.planificacion.page_title')"

  >
    <OneiGenerarPlanificacion :prop-annos="generarAnnos" class="padding-top"></OneiGenerarPlanificacion>
  </main-content>
</template>

<script>
  import VContainer from "@vuetify/components/VGrid/VContainer";
  import VContent from "@vuetify/components/VGrid/VContent";
  import OneiGenerarPlanificacion from "../../components/planificacion/planificacion";
  import {QUERY_GENERAR_ANNOS} from "../../components/planificacion/graphql/graphql-planificacion.js";
  import MainContent from "@shared/components/main-content/main-content";

  export default {
    name: "onei-planificacion-page",
    components: {
      MainContent,
      OneiGenerarPlanificacion,
      VContainer,
      MainContent,
      VContent,
    },
    data() {
      return {
        generarAnnos: []
      };
    },
    created() {
      // console.log("Aqui")
    },
    computed: {},
    methods: {},
    apollo: {
      generarAnnos: {
        query: QUERY_GENERAR_ANNOS,
        variables: {
          //este valor 5 debe estar en un lugar donde se pueda cambiar
          annos: 5,
        },
        update: data => data.generarAnnos,
      }
    },
    head: {
      title() {
        return {
          inner: this.$i18n.t(
            "applications.onei_ipc.modules.planificacion.page_title"
          )
        };
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .padding-top {
    padding: 72px 0px 0px 50px !important;
  }
</style>
