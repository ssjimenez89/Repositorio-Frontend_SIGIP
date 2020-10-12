<template>
  <main-content :title="$t('applications.onei_ipc.modules.listarCaptaciones.page_title')">
      <listado-precios-faltantes></listado-precios-faltantes>
  </main-content>
</template>


<script>
  import MainContent from "@shared/components/main-content/main-content";
  import ListadoPreciosFaltantes from "../../components/listar-faltantes/listado-precios-faltantes";

  export default {
    name: "listarFaltantes",
    components: {
      ListadoPreciosFaltantes,
      MainContent
    },
    data() {
      return {
        text: 1
      }
    },
    methods: {
      update($event) {
        //this.text+=1;
        console.log($event);
      }
    }
  }
</script>

<style scoped>

</style>
