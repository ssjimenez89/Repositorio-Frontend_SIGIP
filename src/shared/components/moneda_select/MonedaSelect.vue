<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <v-select
    :items="monedas"
    @click:clear="$nextTick(() => defaultMoneda)"
    clearable
    dense
    item-text="acronym"
    label="Moneda"
    persistent-hint
    ref="monedaRef"
    return-object
    single-line
    @change="testC()"
  >
  </v-select>
</template>

<script>
  import {VSelect} from "@vuetify/components/VSelect";
  import {IMoneda} from "@/applications/onei/domain/ipc/components/clasificador/interfaces/ITreeView";
  export default {
    name: "MonedaSelect",
    components: {
      VSelect,
    },
    methods:{
      testC(){
        console.log("As")
      }
    },
    props:['value'],
    data() {
      let defaultMoneda = {id: -1, acronym: "", descripcion: ""};
      return {
        defaultMoneda,
        monedas: [
          {
            id: 1,
            acronym: "CUC",
            descripcion: "Moneda Convertible"
          },
          {
            id: 2,
            acronym: "CUP",
            descripcion: "Moneda Cubana"
          },
          {
            id: 3,
            acronym: "Ambas",
            descripcion: "Ambas"
          },
        ],
      };
    },
  }
</script>

<style scoped>

</style>
